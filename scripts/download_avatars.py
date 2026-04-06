#!/usr/bin/env python3
"""
Download missing Harry Potter character avatars from various sources
and convert them to webp format.
"""

import os
import sys
import time
import requests
from io import BytesIO
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'characters')
TARGET_SIZE = (256, 256)

# Character ID -> search query for wiki API
MISSING_CHARACTERS = {
    'cedric-diggory': 'Cedric_Diggory',
    'lucius-malfoy': 'Lucius_Malfoy',
    'dolores-umbridge': 'Dolores_Umbridge',
    'horace-slughorn': 'Horace_Slughorn',
    'percy-weasley': 'Percy_Weasley',
    'cho-chang': 'Cho_Chang',
    'peter-pettigrew': 'Peter_Pettigrew',
    'gellert-grindelwald': 'Gellert_Grindelwald',
    'bill-weasley': 'Bill_Weasley',
    'fleur-delacour': 'Fleur_Delacour',
    'kingsley-shacklebolt': 'Kingsley_Shacklebolt',
    'fenrir-greyback': 'Fenrir_Greyback',
    'charlie-weasley': 'Charlie_Weasley',
    'oliver-wood': 'Oliver_Wood',
    'dean-thomas': 'Dean_Thomas',
    'seamus-finnigan': 'Seamus_Finnigan',
    'lavender-brown': 'Lavender_Brown',
    'gilderoy-lockhart': 'Gilderoy_Lockhart',
    'pomona-sprout': 'Pomona_Sprout',
    'sybill-trelawney': 'Sybill_Trelawney',
    'filius-flitwick': 'Filius_Flitwick',
    'kreacher': 'Kreacher',
    'regulus-black': 'Regulus_Black',
}

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
}

def get_wiki_image_url(page_title):
    """Get the main image URL from Harry Potter Fandom wiki."""
    api_url = 'https://harrypotter.fandom.com/api.php'
    
    # First try: get page images via API
    params = {
        'action': 'query',
        'titles': page_title,
        'prop': 'pageimages',
        'format': 'json',
        'pithumbsize': 500,
    }
    
    try:
        resp = requests.get(api_url, params=params, headers=HEADERS, timeout=15)
        data = resp.json()
        pages = data.get('query', {}).get('pages', {})
        for page_id, page_data in pages.items():
            if 'thumbnail' in page_data:
                return page_data['thumbnail']['source']
    except Exception as e:
        print(f"  API error: {e}")
    
    # Second try: get images from page
    params2 = {
        'action': 'query',
        'titles': page_title,
        'prop': 'images',
        'format': 'json',
        'imlimit': 10,
    }
    
    try:
        resp = requests.get(api_url, params=params2, headers=HEADERS, timeout=15)
        data = resp.json()
        pages = data.get('query', {}).get('pages', {})
        for page_id, page_data in pages.items():
            images = page_data.get('images', [])
            for img in images:
                title = img.get('title', '')
                # Look for the character's main image
                name_part = page_title.replace('_', '').lower()
                if any(keyword in title.lower() for keyword in [name_part, 'profile', 'promo', 'infobox']):
                    # Get the actual URL
                    img_params = {
                        'action': 'query',
                        'titles': title,
                        'prop': 'imageinfo',
                        'iiprop': 'url',
                        'format': 'json',
                        'iiurlwidth': 500,
                    }
                    img_resp = requests.get(api_url, params=img_params, headers=HEADERS, timeout=15)
                    img_data = img_resp.json()
                    img_pages = img_data.get('query', {}).get('pages', {})
                    for _, img_page in img_pages.items():
                        ii = img_page.get('imageinfo', [{}])[0]
                        return ii.get('thumburl') or ii.get('url')
    except Exception as e:
        print(f"  Images API error: {e}")
    
    return None


def download_and_convert(url, output_path):
    """Download image from URL and convert to webp format."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30, stream=True)
        resp.raise_for_status()
        
        img = Image.open(BytesIO(resp.content))
        
        # Convert to RGB if necessary (handle RGBA, P, etc.)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (20, 20, 30))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if 'A' in img.mode else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Crop to square (center crop)
        w, h = img.size
        min_dim = min(w, h)
        left = (w - min_dim) // 2
        top = (h - min_dim) // 2
        img = img.crop((left, top, left + min_dim, top + min_dim))
        
        # Resize
        img = img.resize(TARGET_SIZE, Image.LANCZOS if hasattr(Image, 'LANCZOS') else Image.ANTIALIAS)
        
        # Save as webp
        img.save(output_path, 'WEBP', quality=85)
        file_size = os.path.getsize(output_path) / 1024
        print(f"  Saved: {output_path} ({file_size:.1f} KB)")
        return True
        
    except Exception as e:
        print(f"  Download/convert error: {e}")
        return False


def generate_placeholder(char_id, output_path):
    """Generate a styled placeholder image for characters without available photos."""
    # Create a dark themed placeholder with character initial
    img = Image.new('RGB', TARGET_SIZE, (30, 30, 45))
    
    # Try to add text if possible
    try:
        from PIL import ImageDraw, ImageFont
        draw = ImageDraw.Draw(img)
        
        # Draw a subtle circle
        circle_color = (60, 60, 80)
        cx, cy = TARGET_SIZE[0] // 2, TARGET_SIZE[1] // 2
        r = 90
        for i in range(r):
            alpha = 1.0 - (i / r) * 0.5
            color = tuple(int(c * alpha) for c in circle_color)
            draw.ellipse([cx - r + i, cy - r + i, cx + r - i, cy + r - i], outline=color)
        
        # Draw character initial
        initial = char_id.split('-')[0][0].upper()
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        except:
            font = ImageFont.load_default()
        
        # Get text bounding box
        try:
            bbox = draw.textbbox((0, 0), initial, font=font)
            tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        except:
            tw, th = draw.textsize(initial, font=font)
        
        draw.text((cx - tw // 2, cy - th // 2 - 10), initial, fill=(180, 160, 120), font=font)
        
    except ImportError:
        pass
    
    img.save(output_path, 'WEBP', quality=85)
    file_size = os.path.getsize(output_path) / 1024
    print(f"  Generated placeholder: {output_path} ({file_size:.1f} KB)")
    return True


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    success = 0
    failed = []
    
    for char_id, wiki_title in MISSING_CHARACTERS.items():
        output_path = os.path.join(OUTPUT_DIR, f'{char_id}.webp')
        
        if os.path.exists(output_path):
            print(f"[SKIP] {char_id} - already exists")
            success += 1
            continue
        
        print(f"[{char_id}] Fetching from wiki: {wiki_title}")
        
        url = get_wiki_image_url(wiki_title)
        
        if url:
            print(f"  Found URL: {url[:100]}...")
            if download_and_convert(url, output_path):
                success += 1
                time.sleep(1)  # Be polite
                continue
        
        print(f"  No wiki image found, generating placeholder...")
        if generate_placeholder(char_id, output_path):
            success += 1
        else:
            failed.append(char_id)
        
        time.sleep(0.5)
    
    print(f"\n=== Results ===")
    print(f"Success: {success}/{len(MISSING_CHARACTERS)}")
    if failed:
        print(f"Failed: {', '.join(failed)}")


if __name__ == '__main__':
    main()
