#!/usr/bin/env python3
"""Round 2: Aggressive multi-term search for remaining placeholders"""
import os, json, time, io, ssl
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import urllib.request, urllib.parse

BASE = Path("/Users/lizhen/Workspace/harrypotter/public/images")
THRESHOLD = 3000; SIZE = (256, 256)
ctx = ssl.create_default_context()
API = "https://harrypotter.fandom.com/api.php"
HDRS = {"User-Agent": "HPTool/1.0 educational"}

THEMES = {
    "characters": {"bg_top":"#8B6914","bg_bot":"#5c4a0f","border":"#D4A017","text":"#FFF8DC"},
    "creatures":   {"bg_top":"#1b5e20","bg_bot":"#0d3310","border":"#4CAF50","text":"#E8F5E9"},
    "magic-items": {"bg_top":"#8b0000","bg_bot":"#4a0000","border":"#ff4444","text":"#FFCDD2"},
    "places":      {"bg_top":"#1565c0","bg_bot":"#0d3a6e","border":"#64B5F6","text":"#E3F2FD"},
}

def is_placeholder(p): return not p.exists() or p.stat().st_size < THRESHOLD
def hex_rgb(c): c=c.lstrip('#'); return tuple(int(c[i:i+2],16) for i in(0,2,4))
def draw_gradient(img,c1,c2):
    w,h=img.size; d=ImageDraw.Draw(img)
    for y in range(h):
        r=int(c1[0]+(c2[0]-c1[0])*y/h); g=int(c1[1]+(c2[1]-c1[1])*y/h); b=int(c1[2]+(c2[2]-c1[2])*y/h)
        d.line([(0,y),(w,y)],fill=(r,g,b))

def make_emoji(name,emoji,cat):
    theme=THEMES.get(cat,THEMES['characters']); w,h=SIZE; img=Image.new('RGB',SIZE)
    draw_gradient(img,hex_rgb(theme['bg_top']),hex_rgb(theme['bg_bot'])); d=ImageDraw.Draw(img)
    br=hex_rgb(theme['border']); d.rectangle([0,0,w-1,h-1],outline=br,width=3)
    font=None
    for fp in ['/System/Library/Fonts/Apple Color Emoji.ttc','/System/Library/Fonts/Helvetica.ttc']:
        if os.path.exists(fp):
            try: font=ImageFont.truetype(fp,80); break
            except: continue
    if not font: font=ImageFont.load_default()
    bbox=d.textbbox((0,0),emoji,font=font); tw,th=bbox[2]-bbox[0],bbox[3]-bbox[1]
    x,y=(w-tw)//2,(h//2-th//2)-15
    for sx,sy in [(3,3),(2,2),(1,1)]: d.text((x+sx,y+sy),emoji,font=font,fill=(0,0,0))
    d.text((x,y),emoji,font=font,fill=theme['text'])
    lh,ly=28,h-28; img.paste(Image.new('RGBA',(w,lh),(0,0,0,180)).convert('RGB'),(0,ly))
    try: nf=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',11)
    except: nf=font
    dn=name[:9]+'..'if len(name)>10 else name; nb=d.textbbox((0,0),dn,font=nf)
    d.text(((w-(nb[2]-nb[0]))//2,ly+(lh-(nb[3]-nb[1]))//2-2),dn,font=nf,fill='#FFFFFF')
    return img

def get_img(term):
    url=f"{API}?action=query&titles={urllib.parse.quote(term)}&prop=pageimages&format=json&pithumbsize=400"
    req=urllib.request.Request(url,headers=HDRS)
    try:
        resp=urllib.request.urlopen(req,timeout=8,context=ctx); j=json.loads(resp.read())
        for p in j.get('query',{}).get('pages',{}).values():
            t=p.get('thumbnail')
            if t and 'source' in t: return t['source']
    except: pass
    return None

def download(url,path):
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
    try:
        resp=urllib.request.urlopen(req,timeout=12,context=ctx); data=resp.read()
        if len(data)>500:
            Image.open(io.BytesIO(data)).resize(SIZE,Image.LANCZOS).convert('RGB').save(path,'WebP',quality=85)
            return True
    except: pass
    return False

SEARCHES = {
    "tom-riddles-diary": ("Tom Riddle Diary", "\U0001f4d4", ["Horcrux diary Tom Riddle", "Riddle diary Horcrux"]),
    "gaunts-ring": ("Gaunt Ring Horcrux", "\U0001f48d", ["Marvolo Gaunt Ring", "Gaunt family ring Resurrection Stone"]),
    "hufflepuffs-cup": ("Hufflepuff Cup", "\U0001f3c6", ["Helga Hufflepuff Cup", "Hufflepuff Cup Horcrux"]),
    "ravenclaws-diadem": ("Ravenclaw Diadem", "\U0001f451", ["Rowena Ravenclaw Diadem", "Lost Diadem Ravenclaw"]),
    "slytherins-locket": ("Slytherin Locket", "\U0001f40d", ["Salazar Slytherin Locket", "Locket Horcrux cave"]),
    "harry-living-horcrux": ("Harry Living Horcrux", "\u26a1", ["Horcrux Harry Potter living"]),
    "nagini": ("Nagini Snake", "\U0001f40d", ["Nagini snake Voldemort pet", "Nagini Horcrux Maledictus"]),
    "marauders-map": ("Marauder Map", "\U0001f5fa", ["Marauder's Map Hogwarts", "Marauders Map Messrs Moony Padfoot"]),
    "time-turner": ("Time Turner Device", "\u23f0", ["Time-Turner Hermione Granger", "Time Turner device Time-Turner"]),
    "sword-of-gryffindor": ("Gryffindor Sword Godric", "\U0001f5e1", ["Goblin-made Sword Gryffindor", "Sword of Godric Gryffindor basilisk"]),
    "firebolt": ("Firebolt Racing Broom", "\U0001fa84", ["Firebolt broomstick Quidditch racing", "Firebolt fastest broom world"]),
    "prophecy-orb": ("Prophecy Orb Ministry", "\U0001f52e", ["Prophecy Orb Ministry Mysteries Department", "Prophecy about Harry Voldemort orb"]),
    "weasleys-products": ("WW Products Joke Shop", "\U0001f4dc", ["Weasleys' Wizard Wheezes products joke shop"]),
    "da-coins": ("DA Coins Communication", "\U0001fa99", ["Dumbledore Army coins communication fake Galleon"]),
    "triwizard-cup": ("Triwizard Cup Trophy", "\U0001f3c6", ["Triwizard Cup trophy Portkey maze champion"]),
    "howler": ("Howler Letter Envelope", "\U0001f4e8", ["Howler screaming letter envelope Molly Weasley red"]),
    "floo-powder": ("Floo Powder Travel", "\U0001f525", ["Floo Powder Floo Network travel fireplace powder glittering"]),
    "weasley-clock": ("Weasley Family Clock", "\U0001f550", ["Weasley clock Burrow nine hands family location tracking"]),
    "monster-book": ("Monster Book Monsters", "\U0001f4d7", ["The Monster Book of Monsters textbook bite Hagrid"]),
    "remembrall": ("Remembrall Memory Ball", "\U0001f534", ["Remembrall Neville Longbottom memory ball glass smoke red forgotten"]),
    "goblin-silver": ("Goblin Silver Metal", "\U0001fa99", ["Goblin silver metal forging weapon absorb strength sword"]),
    "hermiones-bag": ("Hermione Undetectable Bag", "\U0001f6c2", ["Hermione beaded bag Undetectable Extension Charm small handbag infinite space"]),
    "nimbus-2000": ("Nimbus 2000 Broom", "\U0001fa84", ["Nimbus 2000 broomstick Harry Potter first racing broom fast"]),
    "flying-car": ("Flying Ford Anglia Car", "\U0001f697", ["Flying Ford Anglia 105E Arthur Weasley enchanted car flying automobile Ford Anglia"]),
    "ministry-entrance": ("Ministry Phone Booth Entry", "\U0001f52e", ["Ministry Magic visitor entrance telephone booth red booth London dial MAGIC"]),
    "dark-detectors": ("Dark Detectors Set", "\U0001f30c", ["Dark detectors set Sneakoscope Foe-Glass Probity Probe Moody"]),
    "dark-mark": ("Dark Mark Symbol", "\U0001f43f", ["Dark Mark symbol skull snake Death Eater summon sign Morsmordre cast sky"]),
    "two-way-mirror": ("Two Way Mirror Sirius", "\U0001f9de", ["Two-Way Mirror Sirius Black Harry Potter communication mirror pair talking"]),
    "extendable-ears": ("Extendable Ears Spy Tool", "\U0001f442", ["Extendable Ears Weasleys spy tool listening device stretch ear canal Fred George"]),
    "skiving-snackboxes": ("Skiving Snackbox Candy", "\U0001f4a7", ["Skiving Snackbox candy illness cure dual-head Weasleys Wizard Wheezes product"]),
    "deluminator": ("Deluminator Light Device", "\U0001f526", ["Deluminator Dumbledore light absorber device Put-Outer light turn-off Ron inheritance"]),
    "sirius-motorcycle": ("Sirius Flying Motorcycle", "\U0001f6cd", ["Sirius Black flying motorcycle Hagrid rescue baby Harry giant black motorbike Flight Phoenix"]),
    "hogwarts-express": ("Hogwarts Express Train", "\U0001f682", ["Hogwarts Express steam locomotive train King Cross Platform 9 3/4 scarlet red September 1st"]),
    "the-veil": ("Veil Death Chamber", "\U0001f32b", ["Veil Death Chamber Ministry Mysteries archway curtain death boundary whispering voices"]),
    "clothes-freedom": ("Freedom Clothes Dobby", "\U0001f6e6", ["Dobby clothes freedom sock clothing house-elf liberation S.P.E.W. knitted hats"]),
    "colin-camera": ("Colin Creevey Camera", "\U0001f4f7", ["Colin Creevey camera magical photography moving pictures student Harry Potter fan photographer"]),
    "philosophers-stone": ("Philosopher Stone Alchemy", "\U0001faae", ["Philosopher's Stone Nicolas Flamel alchemy gold immortality elixir Sorcerer's Stone"]),
    "memory-vials": ("Memory Vial Glass Bottle", "\U0001f48e", ["Memory vial glass bottle store memories silver thread Pensieve Snape Slughorn collection"]),
    "vanishing-cabinet": ("Vanishing Cabinet Pair", "\U0001f9ed", ["Vanishing Cabinet pair Room Requirement Hogwarts Draco Malfoy repair Borgin Burkes connection portal"]),
    "portkey": ("Portkey Object Teleport", "\U0001f315", ["Portkey object transportation teleport touch activate Triwizard Cup old boot tyre"]),
    "fake-locket": ("Fake Locket RAB Note", "\U0001f5dd", ["Fake Locket RAB note Regulus Black replacement cave Inferi Kreacher Mundungus Umbridge locket"]),
    "goblet-of-fire": ("Goblet Fire Artifact", "\U0001f251", ["Goblet of Fire artifact blue-white flame cross-spark champions selection binding magical contract"]),
    "blood-quill": ("Blood Quill Umbridge", "\U0001f58b", ["Blood quill detention Umbridge punishment write own blood hand scar I must not tell lies black feather pen dark"]),
    "daily-prophet": ("Daily Prophet Newspaper", "\U0001f4f0", ["Daily Prophet newspaper wizarding Britain moving photos Rita Skeeter propaganda Cornelius Fudge controlled"]),
    "quick-quotes-quill": ("Quick Quotes Quill Auto", "\U0001f58b", ["Quick-Quotes Quill Rita Skeeter auto-writing acid-green embellish sensational quotes journalist tool"]),
    "animagus": ("Animagus Transformation", "\U0001f41b", ["Animagus transformation registered unregistered McGonagall cat James stag Sirius dog Peter rat Animagus registry"]),
    "half-blood-princes-book": ("Half Blood Prince Textbook", "\U0001f4d3", ["Advanced Potion-Making Half-Blood Prince copy annotated Severus Snape Prince textbook Sectumsempra Levicorpus spell notes"]),
    "harrys-wand": ("Harry Potter Holly Wand", "\U0001f9e9", ["Harry Potter wand 11 inch holly phoenix feather core Ollivander brother wand core same phoenix Fawkes"]),
    "voldemorts-wand": ("Voldemort Yew Wand", "\U0001f9e9", ["Voldemort wand 13 1/2 inch yew phoenix feather core brother wand Priori Incantatum Ollivander"]),
    "the-quibbler": ("Quibbler Magazine Luna", "\U0001f4dd", ["The Quibbler magazine Luna Lovegood father Xenophilius conspiracy theories nargles Crumple-Horned Snorkacks"]),
    "opal-necklace": ("Opal Necklace Cursed", "\U0001f48d", ["Opal necklace cursed nineteen Muggle deaths Borgin Burkes Dark shop Katie Bell Draco Malfoy assassination attempt"]),
    "poisoned-mead": ("Poisoned Mead Ron Slughorn", "\U0001f37a", ["Poisoned mead Ron Weasley Slughorn Christmas gift bezoar antidote Felix Felicis Half-Blood Prince textbook knowledge"]),
    "sneakoscope": ("Sneakoscope Detector Toy", "\U0001f514", ["Sneakoscope toy dark detector glass陀螺 spinning light unreliable Ron birthday Egypt present Crookshanks Scabbers Pettigrew detection"]),
    "foe-glass": ("Foe Glass Enemy Detector", "\U0001f30c", ["Foe-Glass enemy detector mirror show enemies approach Barty Crouch Jr impersonating Moody office reveal Dumbledore McGonagall Snape clear images"]),
    "golden-egg": ("Golden Egg Dragon Task", "\U0001f95a", ["Golden egg dragon egg Triwizard First Task open underwater scream merpeople clue Second Task sound puzzle"]),
    "room-of-requirement": ("Room Requirement Hogwarts", "\U0001f3e0", ["Room of Requirement come-and-go room seventh floor tapestry House-Elves accommodation DA training room hide things Fiendfyre diadem destruction"]),
    "protective-enchantments": ("Protective Enchantments Spells", "\U0001f9ea", ["Protective enchantments charms defensive magic Fidelius Charm Muggle-Repelling Charm Disillusionment charm anti-Apparition protective barrier"]),
    "fluffy": ("Fluffy Three Head Dog", "\U0001f429", ["Fluffy three-headed dog Hagrid Cerberus Greek music sleep weakness guard trap door Devil Snare Sorcerer's Stone protection"]),
    "aberforth-dumbledore": ("Aberforth Dumbledore Barkeep", "\U0001f37a", ["Aberforth Dumbledore barkeep Hog Head owner Albus brother goat patronus Aberforth"]),
    "antonin-dolohov": ("Antonin Dolohov DE", "\u2600", ["Antonin Dolohov Death Eater Death Eaters Snatcher wizard killer curse expert duelist"]),
    "august-rookwood": ("Augustus Rookwood DE", "\u2600", ["Augustus Rookwood Death Eater Ministry Department Mysteries spy Voldemort servant Azkaban escapee"]),
    "barty-crouch-jr": ("Barty Crouch Jr Polyjuice", "\u2600", ["Bartemius Crouch Junior Death Eater Polyjuice Mad-Eye Moody impostor Dementor kiss trial escapee Wizengamot son"]),
    "colin-creevey": ("Colin Creevey Photographer", "\U0001f4f7", ["Colin Creevey muggle-born Gryffindor photographer Harry Potter fan petrified Basilisk camera death Battle Hogwarts"]),
    "ernie-macmillan": ("Ernie Macmillan Student", "\U0001f393", ["Ernie Macmillan Hufflepuff student Dumbledore Army member friend Justin Hannah DA supporter pure-blood pride"]),
    "griphook": ("Griphook Goblin Banker", "\U0001f3e2", ["Griphook goblin Gringotts bank employee key keeper help Harry break-in Lestrange vault sword reclamation death"]),
    "hedwig": ("Hedwig Snowy Owl Pet", "\U0001f426", ["Hedwig snowy owl Harry Potter pet owl Eeylops Owl Emporium delivery mail white feathers death Hedwig sacrifice seven Potters"]),
    "helena-ravenclaw": ("Grey Lady Helena Ghost", "\U0001f464", ["Helena Ravenclaw Grey Lady ghost daughter Rowena Ravenclaw diadem horcrux Ravenclow house ghost Bloody Baron lover murder"]),
    "helga-hufflepuff": ("Helga Hufflepuff Founder", "\U0001f3c6", ["Helga Hufflepuff founder four Hogwarts founders portrait loyal hardworking fair acceptance value food-related charm"]),
    "igor-karkaroff": ("Igor Karkaroff Headmaster", "\u2744", ["Igor Karkaroff Durmstrang Institute headmaster former Death Eater defector Viktor Krum headmaster flee Voldemort return fear death"]),
    "justin-finch-fletchley": ("Justin Finch-Fletchley", "\U0001f4da", ["Justin Finch-Fletchley muggle-born Hufflepuff student Basilisk petrification victim D.A. member father dentist"]),
    "madam-pomfrey": ("Madam Pomfrey Healer", "\U0001f48a", ["Poppy Pomfrey Madam Hogwarts hospital wing matron healer nurse injuries illnesses potions Skiving Snackbox antidotes care"]),
    "moaning-myrtle": ("Moaning Myrtle Ghost Girl", "\U0001f47b", ["Moaning Myrtle ghost girl Myrtle Warren Muggle-born Ravenclaw student bathroom haunt crying petrified Basilisk death toilet plumbing"]),
    "mundungus-fletcher": ("Mundungus Fletcher Criminal", "\U0001f3a9", ["Mundungus Fletcher criminal Order member thief sell Black family possessions Sirius inherited items kleptomaniac Disapparation escape"]),
    "nearly-headless-nick": ("Nearly Headless Nick Ghost", "\U0001f47b", ["Nicholas de Mimsy-Porpington Nearly Headless Nick Gryffindor ghost beheaded botched execution 43 chops deathday party"]),
    "neville-grandmother": ("Augusta Longbottom Grandmother", "\U0001f475", ["Augusta Longbottom grandmother Neville stern proud pure-blood Frank Alice mother torture Bellatrix Lestrange Neville protector remembrall"]),
    "newt-scamander": ("Newt Scamander Magizoologist", "\U0001f4d3", ["Newton Artemis Fido Scamander magizoologist Fantastic Beasts author Hufflepuff expelled Leta Lestrange Theseus brother Eddie Redmayne"]),
    "gaunt-shack": ("Gaunt Shack Ruined Hovel", "\U0001f3e0", ["Gaunt shack ruined hovel squalid Marvolo Morfin Merope ring Horcrux cave Voldemort visit Dumbledore curse injury"]),
    "godrics-hollow": ("Godric Hollow Village", "\U0001f33f", ["Godrics Hollow village Potter family home church graveyard memorial James Lily deaths Halloween 1981 Dumbledore family Bathilda Bagshot"]),
    "nurmengard": ("Nurmengard Prison Fortress", "\U0001f3f4", ["Nurmengard prison fortress Grindelwald built greater good inscription tower prison cell Grindelwald himself imprisoned defeat Dumbledore"]),
    "spinners-end": ("Spinners End Snape Home", "\U0001f3da", ["Spinner End Snape childhood home mill town Tobias Snape abusive father Eileen Prince witch Prince family poverty industrial"]),
    "st-mungos": ("St Mungos Hospital Wizarding", "\U0001f3e5", ["St Mungos Hospital Magical Maladies Injuries London Purge Dawt Ltd storefront window mannequin disease wards Janus Thickey Ward"]),
    "st-oswalds": ("St Oswalds Home Retirees", "\U0001f3ec", ["St Oswalds Home Old Witches Wizards retirement facility Gilderoy Lockhart permanent resident Healer Miriam Strout visitor fans autograph"]),
    "weasleys-shop": ("WW Shop Storefront Orange", "\U0001f3a4", ["Weasleys Wizard Wheezes storefront orange facade three-story Diagon Alley joke products display Fred George twins entrance hat-tipting mannequins"]),
}

dl_count = 0
emoji_count = 0

for cat_dir in ["magic-items", "characters", "places"]:
    dp = BASE / cat_dir
    files = sorted(dp.glob("*.webp")) if dp.exists() else []
    phs = [f for f in files if is_placeholder(f)]
    if not phs: continue
    
    print(f"\n{'='*50}\n[{cat_dir}] {len(phs)} remaining\n{'='*50}")
    
    for f in phs:
        stem = f.stem
        info = SEARCHES.get(stem)
        if not info:
            print(f"  SKIP {stem}")
            emoji_count += 1
            continue
        
        name, emoji, terms = info
        print(f"  {name[:35]} | {emoji}", end="", flush=True)
        
        ok = False
        for term in terms[:8]:
            url = get_img(term)
            if url and download(url, f):
                print(f" -> OK [{term[:30]}]")
                dl_count += 1
                ok = True
                break
            time.sleep(0.4)
        
        if not ok:
            make_emoji(name, emoji, cat_dir).save(f, "WebP", quality=90)
            print(f" -> EMOJI")
            emoji_count += 1
        time.sleep(0.2)

print(f"\n{'='*50}")
print(f"DONE! Downloaded: {dl_count} | Emoji fallback: {emoji_count}")
print(f"{'='*50}")
