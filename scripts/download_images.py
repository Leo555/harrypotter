#!/usr/bin/env python3
"""
从 Harry Potter Wiki (Fandom) 下载魔法生物和魔法物品图片
并转换为 webp 格式保存到 src/assets/ 目录
"""

import os
import re
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

# 项目根目录
ROOT = Path(__file__).parent.parent
CREATURES_DIR = ROOT / "src" / "assets" / "creatures"
ITEMS_DIR = ROOT / "src" / "assets" / "magic-items"

CREATURES_DIR.mkdir(parents=True, exist_ok=True)
ITEMS_DIR.mkdir(parents=True, exist_ok=True)

# Fandom API 获取页面主图片
WIKI_API = "https://harrypotter.fandom.com/api.php"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) HarryPotterWiki-ImageFetcher/1.0"
}

# 魔法生物：中文名 -> wiki页面名 -> 文件名
CREATURES = {
    "dragon": "Dragon",
    "hippogriff": "Hippogriff",
    "phoenix": "Phoenix",
    "unicorn": "Unicorn",
    "acromantula": "Acromantula",
    "dementor": "Dementor",
    "house-elf": "House-elf",
    "basilisk": "Basilisk",
    "thestral": "Thestral",
    "cornish-pixie": "Cornish_Pixie",
    "werewolf": "Werewolf",
    "three-headed-dog": "Fluffy",
    "fire-crab": "Fire_Crab",
    "mandrake": "Mandrake",
    "merpeople": "Merpeople",
    "centaur": "Centaur",
    "niffler": "Niffler",
    "thunderbird": "Thunderbird",
    "hungarian-horntail": "Hungarian_Horntail",
    "demiguise": "Demiguise",
    "occamy": "Occamy",
    "nundu": "Nundu",
    "grindylow": "Grindylow",
    "kelpie": "Kelpie",
    "diricawl": "Diricawl",
    "kneazle": "Kneazle",
    "gnome": "Gnome",
    "ghoul": "Ghoul",
    "giant-squid": "Giant_Squid",
    "billywig": "Billywig",
    "mooncalf": "Mooncalf",
    "murtlap": "Murtlap",
    "puffskein": "Puffskein",
    "boggart": "Boggart",
    "goblin": "Goblin",
    "peeves": "Peeves",
    "bowtruckle": "Bowtruckle",
}

# 魔法物品：文件名 -> wiki页面名
ITEMS = {
    "tom-riddles-diary": "T._M._Riddle%27s_Diary",
    "gaunts-ring": "Marvolo_Gaunt%27s_Ring",
    "hufflepuffs-cup": "Helga_Hufflepuff%27s_Cup",
    "ravenclaws-diadem": "Rowena_Ravenclaw%27s_Diadem",
    "slytherins-locket": "Salazar_Slytherin%27s_Locket",
    "nagini": "Nagini",
    "elder-wand": "Elder_Wand",
    "invisibility-cloak": "Cloak_of_Invisibility",
    "resurrection-stone": "Resurrection_Stone",
    "marauders-map": "Marauder%27s_Map",
    "time-turner": "Time-Turner",
    "mirror-of-erised": "Mirror_of_Erised",
    "sword-of-gryffindor": "Sword_of_Gryffindor",
    "firebolt": "Firebolt",
    "prophecy-orb": "Sybill_Trelawney%27s_first_prophecy",
    "da-coins": "Dumbledore%27s_Army_coin",
    "triwizard-cup": "Triwizard_Cup",
    "howler": "Howler",
    "pensieve": "Pensieve",
    "floo-powder": "Floo_Powder",
    "monster-book": "The_Monster_Book_of_Monsters",
    "remembrall": "Remembrall",
    "hermiones-bag": "Hermione_Granger%27s_beaded_handbag",
    "nimbus-2000": "Nimbus_2000",
    "flying-car": "Flying_Ford_Anglia",
    "dark-mark": "Dark_Mark",
    "two-way-mirror": "Two-way_mirror",
    "deluminator": "Deluminator",
    "sorting-hat": "Sorting_Hat",
    "hogwarts-express": "Hogwarts_Express",
    "the-veil": "Veil",
    "philosophers-stone": "Philosopher%27s_Stone",
    "vanishing-cabinet": "Vanishing_Cabinet",
    "portkey": "Portkey",
    "goblet-of-fire": "Goblet_of_Fire",
    "blood-quill": "Black_Quill",
    "daily-prophet": "Daily_Prophet",
    "half-blood-princes-book": "Advanced_Potion-Making",
    "harrys-wand": "Harry_Potter%27s_wand",
    "voldemorts-wand": "Tom_Riddle%27s_wand",
    "the-quibbler": "The_Quibbler",
    "opal-necklace": "Opal_necklace",
    "sneakoscope": "Sneakoscope",
    "foe-glass": "Foe-Glass",
    "golden-egg": "Golden_egg",
    "room-of-requirement": "Room_of_Requirement",
    "fawkes": "Fawkes",
}


def get_wiki_image_url(page_title):
    """通过 Fandom API 获取 wiki 页面的主图片 URL"""
    params = {
        "action": "query",
        "titles": page_title,
        "prop": "pageimages",
        "format": "json",
        "pithumbsize": 800,  # 请求 400px 宽的缩略图
    }
    url = f"{WIKI_API}?{urllib.parse.urlencode(params)}"

    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get("query", {}).get("pages", {})
            for page_id, page_data in pages.items():
                if "thumbnail" in page_data:
                    return page_data["thumbnail"]["source"]
    except Exception as e:
        print(f"  ⚠️  API 请求失败: {e}")
    return None


def download_image(url, output_path):
    """下载图片到指定路径"""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            content = resp.read()
            with open(output_path, "wb") as f:
                f.write(content)
            return True
    except Exception as e:
        print(f"  ⚠️  下载失败: {e}")
    return False


def convert_to_webp(input_path, output_path, quality=90):
    """使用 PIL 转换图片为 webp（如果有的话），否则使用 sips"""
    try:
        from PIL import Image
        img = Image.open(input_path)
        img = img.convert("RGB")
        # 限制最大尺寸
        max_size = (600, 600)
        img.thumbnail(max_size, Image.LANCZOS)
        img.save(output_path, "WEBP", quality=quality)
        os.remove(input_path)
        return True
    except ImportError:
        # 没有 PIL，使用 macOS 自带的 sips
        os.system(f'sips -s format png "{input_path}" --out "{input_path}.png" -Z 400 >/dev/null 2>&1')
        # sips 不支持 webp，保留 png 格式，改扩展名
        if os.path.exists(f"{input_path}.png"):
            os.rename(f"{input_path}.png", output_path.replace('.webp', '.png'))
            os.remove(input_path)
            print(f"  ⚠️  PIL 不可用，保存为 PNG: {output_path.replace('.webp', '.png')}")
            return True
    except Exception as e:
        print(f"  ⚠️  转换失败: {e}")
    return False


def process_batch(items_map, output_dir, label):
    """批量处理一组图片"""
    total = len(items_map)
    success = 0
    skip = 0

    print(f"\n{'='*50}")
    print(f"📥 开始下载 {label}（共 {total} 项）")
    print(f"{'='*50}\n")

    for i, (file_id, wiki_page) in enumerate(items_map.items(), 1):
        webp_path = output_dir / f"{file_id}.webp"
        png_path = output_dir / f"{file_id}.png"

        # 跳过已存在的
        if webp_path.exists() or png_path.exists():
            print(f"  [{i}/{total}] ⏭️  {file_id} — 已存在，跳过")
            skip += 1
            continue

        print(f"  [{i}/{total}] 🔍 {file_id} ← {wiki_page}")

        # 获取图片 URL
        img_url = get_wiki_image_url(wiki_page)
        if not img_url:
            print(f"  [{i}/{total}] ❌ {file_id} — 未找到图片")
            continue

        # 下载临时文件
        tmp_path = output_dir / f"{file_id}.tmp"
        if download_image(img_url, str(tmp_path)):
            # 尝试转为 webp
            try:
                from PIL import Image
                img = Image.open(str(tmp_path))
                img = img.convert("RGB")
                img.thumbnail((600, 600), Image.LANCZOS)
                img.save(str(webp_path), "WEBP", quality=90)
                os.remove(str(tmp_path))
                size_kb = webp_path.stat().st_size / 1024
                print(f"  [{i}/{total}] ✅ {file_id}.webp ({size_kb:.0f} KB)")
                success += 1
            except ImportError:
                # 没有 PIL，保留原格式改名为 webp
                os.rename(str(tmp_path), str(webp_path))
                size_kb = webp_path.stat().st_size / 1024
                print(f"  [{i}/{total}] ✅ {file_id}.webp ({size_kb:.0f} KB) [原格式]")
                success += 1
            except Exception as e:
                print(f"  [{i}/{total}] ❌ {file_id} — 转换失败: {e}")
                if tmp_path.exists():
                    os.remove(str(tmp_path))

        # 礼貌地等待，不要太快
        time.sleep(0.5)

    print(f"\n📊 {label} 完成: {success} 成功, {skip} 跳过, {total - success - skip} 失败")
    return success


def main():
    print("🦉 Harry Potter Wiki 图片下载器\n")

    # 检查 PIL 是否可用
    try:
        from PIL import Image
        print("✅ Pillow 可用，将转换为 webp 格式")
    except ImportError:
        print("⚠️  Pillow 不可用，将保留原格式")
        print("   安装: pip install Pillow\n")

    c = process_batch(CREATURES, CREATURES_DIR, "魔法生物")
    i = process_batch(ITEMS, ITEMS_DIR, "魔法物品")

    print(f"\n{'='*50}")
    print(f"🎉 全部完成！魔法生物 {c} 张，魔法物品 {i} 张")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
