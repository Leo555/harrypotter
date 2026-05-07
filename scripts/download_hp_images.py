#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HP Image Downloader v5 - Fandom Wiki API + Emoji fallback"""
import os, json, time, io, ssl
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import urllib.request, urllib.parse

BASE = Path("/Users/lizhen/Workspace/harrypotter/public/images")
THRESHOLD = 3000
SIZE = (256, 256)
ctx = ssl.create_default_context()

THEMES = {
    "characters": {"bg_top": "#8B6914", "bg_bot": "#5c4a0f", "border": "#D4A017", "text": "#FFF8DC"},
    "creatures":   {"bg_top": "#1b5e20", "bg_bot": "#0d3310", "border": "#4CAF50", "text": "#E8F5E9"},
    "magic-items": {"bg_top": "#8b0000", "bg_bot": "#4a0000", "border": "#ff4444", "text": "#FFCDD2"},
    "places":      {"bg_top": "#1565c0", "bg_bot": "#0d3a6e", "border": "#64B5F6", "text": "#E3F2FD"},
}

def is_placeholder(p):
    return not p.exists() or p.stat().st_size < THRESHOLD

def hex_rgb(c):
    c = c.lstrip("#")
    return tuple(int(c[i:i+2], 16) for i in (0, 2, 4))

def draw_gradient(img, c1, c2):
    w, h = img.size
    d = ImageDraw.Draw(img)
    for y in range(h):
        r = int(c1[0] + (c2[0] - c1[0]) * y / h)
        g = int(c1[1] + (c2[1] - c1[1]) * y / h)
        b = int(c1[2] + (c2[2] - c1[2]) * y / h)
        d.line([(0, y), (w, y)], fill=(r, g, b))

def draw_corners(d, w, h, rgb, t=2):
    L = min(w, h) // 8
    pts = [
        [(t, t), (L, t)], [(t, t), (t, L)],
        [(w - L, t), (w - t, t)], [(w - t, t), (w - t, L)],
        [(t, h - t), (L, h - t)], [(t, h - L), (t, h - t)],
        [(w - L, h - t), (w - t, h - t)], [(w - t, h - L), (w - t, h - t)],
    ]
    for a, b in pts:
        d.line(a + b, fill=rgb, width=t)

def make_emoji_img(name, emoji_char, category="characters"):
    theme = THEMES.get(category, THEMES["characters"])
    w, h = SIZE
    img = Image.new("RGB", SIZE)
    draw_gradient(img, hex_rgb(theme["bg_top"]), hex_rgb(theme["bg_bot"]))
    d = ImageDraw.Draw(img)
    br = hex_rgb(theme["border"])
    d.rectangle([0, 0, w - 1, h - 1], outline=br, width=3)
    draw_corners(d, w, h, br)

    font = None
    for fp in ["/System/Library/Fonts/Apple Color Emoji.ttc",
               "/System/Library/Fonts/SFNS.ttf",
               "/System/Library/Fonts/Helvetica.ttc"]:
        if os.path.exists(fp):
            try:
                font = ImageFont.truetype(fp, 80)
                break
            except:
                continue
    if not font:
        font = ImageFont.load_default()

    bbox = d.textbbox((0, 0), emoji_char, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x, y = (w - tw) // 2, (h // 2 - th // 2) - 15
    for sx, sy in [(3, 3), (2, 2), (1, 1)]:
        d.text((x + sx, y + sy), emoji_char, font=font, fill=(0, 0, 0))
    d.text((x, y), emoji_char, font=font, fill=theme["text"])

    lh, ly = 28, h - 28
    overlay = Image.new("RGBA", (w, lh), (0, 0, 0, 180))
    img.paste(overlay.convert("RGB"), (0, ly))
    try:
        nf = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 11)
    except:
        nf = font
    dn = name[:9] + ".." if len(name) > 10 else name
    nb = d.textbbox((0, 0), dn, font=nf)
    d.text(((w - (nb[2] - nb[0])) // 2, ly + (lh - (nb[3] - nb[1])) // 2 - 2),
           dn, font=nf, fill="#FFFFFF")
    return img


# Fandom Wiki API
API_BASE = "https://harrypotter.fandom.com/api.php"
HDRS = {"User-Agent": "HPImageTool/1.0 educational"}


def fandom_get_image(title):
    url = f"{API_BASE}?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=400"
    req = urllib.request.Request(url, headers=HDRS)
    try:
        resp = urllib.request.urlopen(req, timeout=8, context=ctx)
        j = json.loads(resp.read())
        for pid, p in j.get("query", {}).get("pages", {}).items():
            thumb = p.get("thumbnail")
            if thumb and "source" in thumb:
                return thumb["source"]
    except Exception:
        pass
    return None


def download_save(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        resp = urllib.request.urlopen(req, timeout=12, context=ctx)
        data = resp.read()
        if len(data) > 500:
            pil = Image.open(io.BytesIO(data)).resize(SIZE, Image.LANCZOS).convert("RGB")
            buf = io.BytesIO()
            pil.save(buf, "WebP", quality=85)
            path.write_bytes(buf.getvalue())
            return True, len(data)
    except Exception:
        pass
    return False, 0


# Mapping: filename -> (zh_name, emoji, [fandom_search_terms])
# IMPORTANT: all strings use double quotes to avoid single-quote issues
DATA = {}

# --- magic-items ---
DATA["tom-riddles-diary"] = ("Tom Riddle Diary", "\U0001f4d4", ["Tom Riddle Diary"])
DATA["gaunts-ring"] = ("Gaunt Ring", "\U0001f48d", ["Marvolo Gaunt Ring Horcrux"])
DATA["hufflepuffs-cup"] = ("Hufflepuff Cup", "\U0001f3c6", ["Hufflepuff Cup"])
DATA["ravenclaws-diadem"] = ("Ravenclaw Diadem", "\U0001f451", ["Ravenclaw Diadem Lost"])
DATA["slytherins-locket"] = ("Slytherin Locket", "\U0001f40d", ["Slytherin Locket"])
DATA["harry-living-horcrux"] = ("Harry Living Horcrux", "\u26a1", ["Harry Potter"])
DATA["nagini"] = ("Nagini", "\U0001f40d", ["Nagini snake HP"])
DATA["elder-wand"] = ("Elder Wand", "\U0001f9e9", ["Elder Wand Deathly Hallows"])
DATA["invisibility-cloak"] = ("Invisibility Cloak", "\U0001f457", ["Cloak of Invisibility"])
DATA["resurrection-stone"] = ("Resurrection Stone", "\U0001f48e", ["Resurrection Stone"])
DATA["marauders-map"] = ("Marauder Map", "\U0001f5fa", ["Marauder Map"])
DATA["time-turner"] = ("Time Turner", "\u23f0", ["Time-Turner HP"])
DATA["mirror-of-erised"] = ("Mirror Erised", "\U0001f9de", ["Mirror of Erised"])
DATA["sword-of-gryffindor"] = ("Gryffindor Sword", "\U0001f5e1", ["Sword Gryffindor"])
DATA["firebolt"] = ("Firebolt Broom", "\U0001fa84", ["Firebolt broomstick"])
DATA["potterwatch"] = ("Potterwatch Radio", "\U0001f4fb", [])
DATA["prophecy-orb"] = ("Prophecy Orb", "\U0001f52e", ["Prophecy Orb Ministry"])
DATA["weasleys-products"] = ("WW Products", "\U0001f4dc", ["Weasleys Wizard Wheezes"])
DATA["da-coins"] = ("DA Coins", "\U0001fa99", ["Dumbledore Army coin"])
DATA["triwizard-cup"] = ("Triwizard Cup", "\U0001f3c6", ["Triwizard Cup"])
DATA["howler"] = ("Howler Letter", "\U0001f4e8", ["Howler letter HP"])
DATA["pensieve"] = ("Pensieve", "\U0001fadf", ["Pensieve Dumbledore"])
DATA["floo-powder"] = ("Floo Powder", "\U0001f525", ["Floo Powder HP"])
DATA["weasley-clock"] = ("Weasley Clock", "\U0001f550", ["Weasley Clock Burrow"])
DATA["monster-book"] = ("Monster Book", "\U0001f4d7", ["Monster Book Monsters"])
DATA["remembrall"] = ("Remembrall", "\U0001f534", ["Remembrall Neville"])
DATA["goblin-silver"] = ("Goblin Silver", "\U0001fa99", [])
DATA["hermiones-bag"] = ("Hermione Bag", "\U0001f6c2", [])
DATA["nimbus-2000"] = ("Nimbus 2000", "\U0001fa84", ["Nimbus 2000 broom"])
DATA["flying-car"] = ("Flying Car", "\U0001f697", ["Flying Ford Anglia HP"])
DATA["ministry-entrance"] = ("Ministry Entrance", "\U0001f52e", [])
DATA["dark-detectors"] = ("Dark Detectors", "\U0001f30c", [])
DATA["dark-mark"] = ("Dark Mark", "\U0001f43f", ["Dark Mark Death Eaters"])
DATA["two-way-mirror"] = ("Two Way Mirror", "\U0001f9de", ["Two-Way Mirror Sirius"])
DATA["extendable-ears"] = ("Extendable Ears", "\U0001f442", ["Extendable Ears Weasley"])
DATA["skiving-snackboxes"] = ("Skiving Snackbox", "\U0001f4a7", ["Skiving Snackbox"])
DATA["deluminator"] = ("Deluminator", "\U0001f526", ["Deluminator Dumbledore"])
DATA["sirius-motorcycle"] = ("Sirius Motorcycle", "\U0001f6cd", ["Sirius Black motorcycle flying"])
DATA["sorting-hat"] = ("Sorting Hat", "\U0001f3a9", ["Sorting Hat Hogwarts"])
DATA["hogwarts-express"] = ("Hogwarts Express", "\U0001f682", ["Hogwarts Express train"])
DATA["the-veil"] = ("The Veil", "\U0001f32b", ["Veil Death Chamber"])
DATA["clothes-freedom"] = ("Freedom Clothes", "\U0001f6e6", [])
DATA["colin-camera"] = ("Colin Camera", "\U0001f4f7", ["Colin Creevey camera"])
DATA["philosophers-stone"] = ("Philosopher Stone", "\U0001faae", ["Philosopher Stone HP"])
DATA["memory-vials"] = ("Memory Vials", "\U0001f48e", [])
DATA["vanishing-cabinet"] = ("Vanishing Cabinet", "\U0001f9ed", ["Vanishing Cabinet Draco"])
DATA["portkey"] = ("Portkey", "\U0001f315", ["Portkey Triwizard"])
DATA["fake-locket"] = ("Fake Locket", "\U0001f5dd", ["Locket fake Regulus Black"])
DATA["goblet-of-fire"] = ("Goblet of Fire", "\U0001f525", ["Goblet Fire Triwizard"])
DATA["blood-quill"] = ("Blood Quill", "\U0001f58b", ["Blood Quill Umbridge"])
DATA["daily-prophet"] = ("Daily Prophet", "\U0001f4f0", ["Daily Prophet newspaper"])
DATA["quick-quotes-quill"] = ("Quick Quotes Quill", "\U0001f58b", ["Quick Quotes Quill Rita"])
DATA["animagus"] = ("Animagus Form", "\U0001f41b", ["Animagus transformation"])
DATA["half-blood-princes-book"] = ("HBP Textbook", "\U0001f4d3", ["Advanced Potion Making HBP"])
DATA["harrys-wand"] = ("Harry Wand", "\U0001f9e9", ["Harry Potter wand holly phoenix"])
DATA["voldemorts-wand"] = ("Voldemort Wand", "\U0001f9e9", ["Voldemort wand yew phoenix"])
DATA["the-quibbler"] = ("The Quibbler", "\U0001f4dd", ["Quibbler magazine Luna"])
DATA["opal-necklace"] = ("Opal Necklace", "\U0001f48d", ["Opal necklace cursed Borgin"])
DATA["poisoned-mead"] = ("Poisoned Mead", "\U0001f37a", [])
DATA["sneakoscope"] = ("Sneakoscope", "\U0001f514", ["Sneakoscope dark detector"])
DATA["foe-glass"] = ("Foe Glass", "\U0001f30c", ["Foe Glass Moody"])
DATA["golden-egg"] = ("Golden Egg", "\U0001f95a", ["Golden egg dragon Triwizard"])
DATA["room-of-requirement"] = ("Room Requirement", "\U0001f3e0", ["Room Requirement Hogwarts"])
DATA["protective-enchantments"] = ("Protective Charms", "\U0001f9ea", [])
DATA["fawkes"] = ("Fawkes Phoenix", "\U0001f985", ["Fawkes phoenix Dumbledore"])
DATA["hogwarts-statues"] = ("Hogwarts Statues", "\U0001f3ef", [])
DATA["fluffy"] = ("Fluffy Dog", "\U0001f429", ["Fluffy three headed dog"])

# --- characters ---
DATA["harry-potter"] = ("Harry Potter", "\u26a1", ["Harry Potter"])
DATA["ron-weasley"] = ("Ron Weasley", "\U0001f9e1", ["Ron Weasley"])
DATA["hermione-granger"] = ("Hermione Granger", "\U0001f9e1", ["Hermione Granger"])
DATA["albus-dumbledore"] = ("Albus Dumbledore", "\U0001f9d1", ["Albus Dumbledore"])
DATA["severus-snape"] = ("Severus Snape", "\u2665\uFE0F", ["Severus Snape"])
DATA["rubeus-hagrid"] = ("Rubeus Hagrid", "\u2764\ufe0f", ["Rubeus Hagrid"])
DATA["sirius-black"] = ("Sirius Black", "\U0001f436", ["Sirius Black"])
DATA["remus-lupin"] = ("Remus Lupin", "\U0001f43a", ["Remus Lupin"])
DATA["minerva-mcgonagall"] = ("Minerva McGonagall", "\u2764\ufe0f", ["Minerva McGonagall"])
DATA["draco-malfoy"] = ("Draco Malfoy", "\U0001f40d", ["Draco Malfoy"])
DATA["lord-voldemort"] = ("Voldemort", "\U0001f464", ["Lord Voldemort"])
DATA["bellatrix-lestrange"] = ("Bellatrix Lestrange", "\u2665", ["Bellatrix Lestrange"])
DATA["neville-longbottom"] = ("Neville Longbottom", "\U0001f33f", ["Neville Longbottom"])
DATA["luna-lovegood"] = ("Luna Lovegood", "\U0001f434", ["Luna Lovegood"])
DATA["ginny-weasley"] = ("Ginny Weasley", "\U0001f534", ["Ginny Weasley"])
DATA["fred-george-weasley"] = ("Fred and George Weasley", "\U0001f383", ["Fred George Weasley twins"])
DATA["arthur-molly-weasley"] = ("Arthur Molly Weasley", "\U0001f9e1", ["Arthur Molly Weasley parents"])
DATA["molly-weasley"] = ("Molly Weasley", "\U0001f9e1", ["Molly Weasley"])
DATA["arthur-weasley"] = ("Arthur Weasley", "\U0001f9e1", ["Arthur Weasley"])
DATA["dobby"] = ("Dobby Elf", "\U0001f467", ["Dobby house elf"])
DATA["kreacher"] = ("Kreacher Elf", "\U0001f3e0", ["Kreacher house elf"])
DATA["lucius-malfoy"] = ("Lucius Malfoy", "\U0001f40d", ["Lucius Malfoy"])
DATA["narcissa-malfoy"] = ("Narcissa Malfoy", "\u2600", ["Narcissa Malfoy"])
DATA["peter-pettigrew"] = ("Peter Pettigrew", "\U0001f400", ["Peter Pettigrew"])
DATA["fenrir-greyback"] = ("Fenrir Greyback", "\U0001f43a", ["Fenrir Greyback werewolf"])
DATA["dolores-umbridge"] = ("Dolores Umbridge", "\U0001f438", ["Dolores Umbridge"])
DATA["gellert-grindelwald"] = ("Grindelwald", "\u26a1", ["Gellert Grindelwald"])
DATA["gilderoy-lockhart"] = ("Gilderoy Lockhart", "\u2665", ["Gilderoy Lockhart"])
DATA["barty-crouch-jr"] = ("Barty Crouch Jr", "\u2600", ["Barty Crouch Junior"])
DATA["cornelius-fudge"] = ("Cornelius Fudge", "\U0001f475", ["Cornelius Fudge"])
DATA["kingsley-shacklebolt"] = ("Kingsley Shacklebolt", "\U0001f6e1", ["Kingsley Shacklebolt"])
DATA["nymphadora-tonks"] = ("Nymphadora Tonks", "\u2665", ["Nymphadora Tonks"])
DATA["bill-weasley"] = ("Bill Weasley", "\U0001f9e1", ["Bill Weasley"])
DATA["charlie-weasley"] = ("Charlie Weasley", "\U0001f9e1", ["Charlie Weasley"])
DATA["percy-weasley"] = ("Percy Weasley", "\U0001f9e1", ["Percy Weasley"])
DATA["cho-chang"] = ("Cho Chang", "\u2665", ["Cho Chang"])
DATA["cedric-diggory"] = ("Cedric Diggory", "\u2665", ["Cedric Diggory"])
DATA["fleur-delacour"] = ("Fleur Delacour", "\U0001f338", ["Fleur Delacour"])
DATA["viktor-krum"] = ("Viktor Krum", "\u26a1", ["Viktor Krum"])
DATA["moaning-myrtle"] = ("Moaning Myrtle", "\U0001f47b", ["Moaning Myrtle"])
DATA["nearly-headless-nick"] = ("Nearly Headless Nick", "\U0001f47b", ["Nearly Headless Nick"])
DATA["bloody-baron"] = ("Bloody Baron", "\u2600", ["Bloody Baron ghost"])
DATA["fat-lady"] = ("Fat Lady Portrait", "\U0001f3bc", ["Fat Lady portrait"])
DATA["peeves"] = ("Peeves Poltergeist", "\U0001f608", ["Peeves poltergeist"])
DATA["argus-filch"] = ("Argus Filch", "\U0001f9fa", ["Argus Filch"])
DATA["ollivander"] = ("Ollivander", "\U0001f9e9", ["Garrick Ollivander"])
DATA["madam-pomfrey"] = ("Madam Pomfrey", "\U0001f48a", ["Poppy Pomfrey"])
DATA["filius-flitwick"] = ("Filius Flitwick", "\u2728", ["Filius Flitwick"])
DATA["horace-slughorn"] = ("Horace Slughorn", "\U0001f377", ["Horace Slughorn"])
DATA["rita-skeeter"] = ("Rita Skeeter", "\U0001f4dd", ["Rita Skeeter"])
DATA["griphook"] = ("Griphook Goblin", "\U0001f3e2", ["Griphook goblin"])
DATA["aberforth-dumbledore"] = ("Aberforth Dumbledore", "\U0001f37a", ["Aberforth Dumbledore brother"])
DATA["newt-scamander"] = ("Newt Scamander", "\U0001f4d3", ["Newt Scamander"])
DATA["helena-ravenclaw"] = ("Helena Ravenclaw", "\U0001f464", ["Helena Ravenclaw Grey Lady"])
DATA["helga-hufflepuff"] = ("Helga Hufflepuff", "\U0001f3c6", ["Helga Hufflepuff founder"])
DATA["james-lily-potter"] = ("James Lily Potter", "\u2764\ufe0f", ["James Potter I", "Lily J Potter"])
DATA["petunia-dursley"] = ("Petunia Dursley", "\U0001f475", ["Petunia Dursley"])
DATA["vernon-dursley"] = ("Vernon Dursley", "\U0001f464", ["Vernon Dursley"])
DATA["dudley-dursley"] = ("Dudley Dursley", "\U0001f466", ["Dudley Dursley"])
DATA["colin-creevey"] = ("Colin Creevey", "\U0001f4f7", ["Colin Creevey camera student"])
DATA["dean-thomas"] = ("Dean Thomas", "\U0001f3a8", ["Dean Thomas"])
DATA["seamus-finnigan"] = ("Seamus Finnigan", "\U0001f525", ["Seamus Finnigan"])
DATA["lavender-brown"] = ("Lavender Brown", "\u2764", ["Lavender Brown"])
DATA["neville-grandmother"] = ("Augusta Longbottom", "\U0001f475", ["Augusta Longbottom grandmother"])
DATA["parvati-patil"] = ("Parvati Patil", "\U0001f338", ["Parvati Patil"])
DATA["padma-patil"] = ("Padma Patil", "\U0001f338", ["Padma Patil"])
DATA["blaise-zabini"] = ("Blaise Zabini", "\u2665", ["Blaise Zabini"])
DATA["ernie-macmillan"] = ("Ernie Macmillan", "\U0001f393", ["Ernie Macmillan"])
DATA["justin-finch-fletchley"] = ("Justin Finch-Fletchley", "\U0001f4da", ["Justin Finch Fletchley"])
DATA["hannah-abbott"] = ("Hannah Abbott", "\U0001f338", ["Hannah Abbott"])
DATA["crabbe-goyle"] = ("Crabbe Goyle", "\U0001f465", ["Vincent Crabbe", "Gregory Goyle"])
DATA["pansy-parkinson"] = ("Pansy Parkinson", "\U0001f40d", ["Pansy Parkinson"])
DATA["millicent-bulstrode"] = ("Millicent Bulstrode", "\U0001f4aa", ["Millicent Bulstrode"])
DATA["mundungus-fletcher"] = ("Mundungus Fletcher", "\U0001f3a9", ["Mundungus Fletcher"])
DATA["antonin-dolohov"] = ("Antonin Dolohov", "\u2600", ["Antonin Dolohov Death Eater"])
DATA["august-rookwood"] = ("August Rookwood", "\u2600", ["Augustus Rookwood Death Eater"])
DATA["igor-karkaroff"] = ("Igor Karkaroff", "\u2744", ["Igor Karkaroff Durmstrang"])
DATA["hedwig"] = ("Hedwig Owl", "\U0001f426", ["Hedwig owl Harry Potter snow white"])

# --- creatures ---
DATA["dragon"] = ("Dragon", "\U0001f409", ["Dragon magical creature"])
DATA["hippogriff"] = ("Hippogriff", "\U0001f985", ["Buckbeak hippogriff"])
DATA["phoenix"] = ("Phoenix Bird", "\U0001f425", ["Phoenix Fawkes rebirth fire"])
DATA["unicorn"] = ("Unicorn", "\U0001f984", ["Unicorn magical white silver"])
DATA["acromantula"] = ("Acromantula Spider", "\U0001f577", ["Aragog Acromantula giant spider"])
DATA["dementor"] = ("Dementor", "\U0001f47b", ["Dementor soul sucking prison guard"])
DATA["house-elf"] = ("House Elf", "\U0001f9dd", ["Dobby house elf magical being"])
DATA["basilisk"] = ("Basilisk Serpent", "\U0001f40d", ["Basilisk giant serpent Chamber Secrets"])
DATA["thestral"] = ("Thestral", "\U0001f3c0", ["Thestral skeletal winged horse death invisible"])
DATA["cornish-pixie"] = ("Cornish Pixie", "\U0001fada", ["Cornish pixie blue mischief fairy"])
DATA["werewolf"] = ("Werewolf", "\U0001f43a", ["Werewolf Remus Lupin full moon transformation"])
DATA["fluffy-three-headed-dog"] = ("Fluffy Three Head Dog", "\U0001f415", ["Fluffy three headed dog Cerberus Hagrid"])
DATA["fire-crab"] = ("Fire Crab", "\U0001f422", ["Fire crab turtle shell gems flame"])
DATA["mandrake"] = ("Mandrake Root", "\U0001f438", ["Mandrake plant root baby cry scream"])
DATA["merpeople"] = ("Merpeople", "\U0001f9dc", ["Merpeople mermaid merman Black Lake underwater"])
DATA["centaur"] = ("Centaur", "\U0001f398", ["Centaur Firenze horse human astrologer forest"])
DATA["niffler"] = ("Niffler Mole", "\U0001f9ab", ["Niffler mole platypus treasure shiny FB"])
DATA["thunderbird"] = ("Thunderbird", "\U0001f985", ["Thunderbird Native American bird storm lightning FB"])
DATA["hungarian-horntail"] = ("Hungarian Horntail", "\U0001f409", ["Hungarian Horntail dragon dangerous Triwizard"])
DATA["demiguise"] = ("Demiguise Ape", "\U0001f422", ["Demiguise ape invisible future sight FB"])
DATA["occamy"] = ("Occamy Serpent", "\U0001f40d", ["Occamy winged serpent chameleon size FB"])
DATA["nundu"] = ("Nundu Leopard", "\U0001f406", ["Nundu leopard plague breath Africa dangerous"])
DATA["grindylow"] = ("Grindylow Demon", "\U0001f441", ["Grindylow water demon green fingers lake"])
DATA["kelpie"] = ("Kelpie Water Horse", "\U0001f434", ["Kelpie shapeshifter water horse Loch Ness"])
DATA["erumpent"] = ("Erumpent Rhino", "\U0001f9cc", ["Erumpent rhino horn explosive Africa FB"])
DATA["kneazle"] = ("Kneazle Cat", "\U0001f431", ["Kneazle cat intelligent detect Crookshanks"])
DATA["gnome"] = ("Garden Gnome", "\U0001f432", ["Garden gnome pest small potato head"])
DATA["ghoul"] = ("Ghoul", "\U0001f47b", ["Ghoul attic noisy harmless Weasley house"])
DATA["giant-squid"] = ("Giant Squid", "\U0001f441", ["Giant squid Lake Hogwarts pink eye friendly"])
DATA["billywig"] = ("Billywig Insect", "\U0001f41b", ["Billywig Australian insect blue wings float sting"])
DATA["mooncalf"] = ("Mooncalf Creature", "\U0001f319", ["Mooncalf large eyes shy moonlit dance dung FB"])
DATA["murtlap"] = ("Murtlap Rat", "\U0001f400", ["Murtlap rat back tentacles seaweed coastal healing"])
DATA["bubblegill"] = ("Bubble Gill Fish", "\U0001f41a", [])
DATA["boggart"] = ("Boggart Shifter", "\U0001f464", ["Boggart shape shifter fear wardrobe closet"])
DATA["goblin"] = ("Goblin Being", "\U0001f3e2", ["Goblin Gringotts bank short intelligent metalwork"])
DATA["poltergeist-peeves"] = ("Peeves Poltergeist", "\U0001f608", ["Peeves poltergeist chaos spirit Hogwarts"])
DATA["bowtruckle"] = ("Bowtruckle Twig", "\U0001f333", ["Bowtruckle Pickett twig tree guardian lockpick"])

# --- places ---
DATA["hogwarts"] = ("Hogwarts Castle", "\U0001f3f0", ["Hogwarts Castle school exterior"])
DATA["diagon-alley"] = ("Diagon Alley", "\U0001f3d8", ["Diagon Alley shopping street film set"])
DATA["gringotts"] = ("Gringotts Bank", "\U0001f3e2", ["Gringotts Wizarding Bank white marble facade"])
DATA["knockturn-alley"] = ("Knockturn Alley", "\U0001f3da", ["Knockturn Alley dark shops Borgin Burkes"])
DATA["platform-9-3-4"] = ("Platform 9 3/4", "\U0001f682", ["Platform nine three quarters King Cross sign brick wall"])
DATA["the-burrow"] = ("The Burrow House", "\U0001f3e0", ["The Burrow Weasley family home crooked magical house"])
DATA["ministry-of-magic"] = ("Ministry Magic", "\U0001f3ec", ["Ministry Magic atrium fountain golden statues London underground"])
DATA["azkaban"] = ("Azkaban Prison", "\u26d3", ["Azkaban fortress island prison Dementors North Sea"])
DATA["grimmauld-place"] = ("12 Grimmauld Place", "\U0001f3e1", ["Number twelve Grimmauld Place Black townhouse Order HQ"])
DATA["forbidden-forest"] = ("Forbidden Forest", "\U0001f333", ["Forbidden Forest Hogwarts dark trees creatures centaurs unicorns"])
DATA["hogsmeade"] = ("Hogsmeade Village", "\U0001f3d8", ["Hogsmeade village only all wizarding Britain Three Broomsticks"])
DATA["godrics-hollow"] = ("Godric Hollow", "\U0001f33f", ["Godric Hollow village Potter family church graveyard memorial"])
DATA["st-mungos"] = ("St Mungo Hospital", "\U0001f3e5", ["St Mungo Hospital Magical Maladies Injuries London department store front"])
DATA["beauxbatons"] = ("Beauxbatons Academy", "\U0001f3ec", ["Beauxbatons Academy carriage flying horses palace Pyrenees"])
DATA["durmstrang"] = ("Durmstrang Institute", "\u26f5", ["Durmstrang Institute ship sailing Northern Europe dark arts"])
DATA["shell-cottage"] = ("Shell Cottage", "\U0001f3d6", ["Shell Cottage Bill Fleur seaside Cornwall beach Dobby grave"])
DATA["shrieking-shack"] = ("Shrieking Shack", "\U0001f3da", ["Shrieking Shack Hogsmeade haunted Whomping Willow tunnel"])
DATA["malfoy-manor"] = ("Malfoy Manor", "\U0001f578", ["Malfoy Manor Wiltshire manor house Death Eater headquarters dungeon"])
DATA["the-cave"] = ("Sea Cave Horcrux", "\U0001f301", ["Sea cave Horcrux Inferi coast Dumbledore Voldemort"])
DATA["little-hangleton"] = ("Little Hangleton Graveyard", "\U0001f3f4", ["Little Hangleton graveyard Riddle family Voldemort rebirth ritual"])
DATA["riddle-house"] = ("Riddle House Abandoned", "\U0001f3da", ["Riddle House Little Hangleton abandoned manor Voldemort father murdered"])
DATA["quidditch-world-cup"] = ("QWC Stadium", "\U0001f3df", ["1994 Quidditch World Cup stadium Ireland Bulgaria massive crowd tents"])
DATA["st-oswalds"] = ("St Oswalds Home", "\U0001f3ec", ["St Oswalds Home Old Witches Wizards Gilderoy Lockhart retirement"])
DATA["spinners-end"] = ("Spinners End Street", "\U0001f3da", ["Spinner End Snape childhood home industrial town mill Muggle father abuse"])
DATA["ministry-courtrooms"] = ("Wizengamot Court", "\U0001f3db", ["Wizengamot courtrooms Ministry Magic trial Dumbledore chains chair"])
DATA["albanian-forests"] = ("Albanian Forests", "\U0001f332", ["Albanian forests Voldemort hiding bodyless possession animals Quirrell"])
DATA["leaky-cauldron"] = ("Leaky Cauldron Pub", "\U0001f378", ["Leaky Cauldron pub inn Diagon Alley entrance Tom landlord warm fire"])
DATA["privet-drive"] = ("4 Privet Drive", "\U0001f3e0", ["4 Privet Drive Little Whinging Surrey suburban Dursley house Harry bedroom cupboard"])
DATA["weasleys-shop"] = ("WW Shop Diagon Alley", "\U0001f3a4", ["Weasleys Wizard Wheezes shop Diagon Alley orange facade joke products Fred George"])
DATA["ollivanders"] = ("Ollivanders Shop", "\U0001f9e9", ["Ollivanders Wand Shop Diagon Alley narrow dusty boxes wands choose wizard"])
DATA["nurmengard"] = ("Nurmengard Prison", "\U0001f3f4", ["Nurmengard prison Grindelwald built greater good inscription tower"])
DATA["gaunt-shack"] = ("Gaunt Shack Ruin", "\U0001f3e0", ["Gaunt shack hovel squalid Marvolo Morfin Merope ring Horcrux curse Dumbledore"])
DATA["honeydukes"] = ("Honeydukes Sweetshop", "\U0001f384", ["Honeydukes sweetshop Hogsmeade Chocolate Frogs Bertie Botts Every Flavor Beans"])
DATA["room-of-requirement"] = ("Room Requirement", "\U0001f3f0", ["Room Requirement Hogwarts seventh floor come go room DA training lost diadem Fiendfyre"])
DATA["chamber-of-secrets"] = ("Chamber of Secrets", "\U0001f40d", ["Chamber of Secrets Salazar Slytherin basilisk sink pipes Myrtle bathroom Parseltongue"])


def process_one(filepath, category):
    stem = filepath.stem
    info = DATA.get(stem)
    if not info:
        print(f"    SKIP: {stem}")
        return False
    name_zh, emoji_char, terms = info
    print(f"    {name_zh} | {emoji_char}")

    for term in terms[:6]:
        img_url = fandom_get_image(term)
        if img_url:
            ok, sz = download_and_save(img_url, filepath)
            if ok:
                print(f"      OK ({sz // 1024}KB) [{term}]")
                return True
        time.sleep(0.5)

    print(f"      FAIL -> emoji fallback")
    make_emoji_img(name_zh, emoji_char, category).save(filepath, "WebP", quality=90)
    return False


def download_and_save(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        resp = urllib.request.urlopen(req, timeout=12, context=ctx)
        data = resp.read()
        if len(data) > 500:
            pil = Image.open(io.BytesIO(data)).resize(SIZE, Image.LANCZOS).convert("RGB")
            buf = io.BytesIO()
            pil.save(buf, "WebP", quality=85)
            path.write_bytes(buf.getvalue())
            return True, len(data)
    except Exception:
        pass
    return False, 0


def main():
    print("=" * 60)
    print("HP Image Downloader v5 - Fandom API + Emoji fallback")
    print("=" * 60)

    stats = {"dl": 0, "emoji": 0, "real": 0}
    cats = {
        "characters": BASE / "characters",
        "creatures": BASE / "creatures",
        "magic-items": BASE / "magic-items",
        "places": BASE / "places",
    }

    for cat, dp in sorted(cats.items()):
        files = sorted(dp.glob("*.webp")) if dp.exists() else []
        phs = [f for f in files if is_placeholder(f)]
        real_n = len(files) - len(phs)
        print(f"\n--- {cat}: {len(files)} total | {len(phs)} need replace | {real_n} real ---")

        for idx, f in enumerate(phs):
            print(f"  [{idx + 1}/{len(phs)}] {f.name}")
            ok = process_one(f, cat)
            stats["dl" if ok else "emoji"] += 1
            time.sleep(0.3)
        stats["real"] += real_n

    total = sum(stats.values())
    print(f"\n{'=' * 60}")
    print(f"DONE! Total: {total} images")
    print(f"  Downloaded: {stats['dl']}  Emoji: {stats['emoji']}  Real: {stats['real']}")


if __name__ == "__main__":
    main()
