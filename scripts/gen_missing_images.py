#!/usr/bin/env python3
"""批量生成缺失的哈利波特风格占位图片"""
from PIL import Image, ImageDraw, ImageFont
import os

THEMES = {
    'characters': {'bg': '#1a1a2e', 'accent': '#d4af37', 'text': '#f5e6c8', 'size': (200, 200)},
    'creatures':   {'bg': '#16213e', 'accent': '#2ecc71', 'text': '#e8f5e9', 'size': (200, 200)},
    'magic-items': {'bg': '#1c0a00', 'accent': '#e74c3c', 'text': '#fadbd8', 'size': (200, 200)},
    'places':      {'bg': '#0d1b2a', 'accent': '#3498db', 'text': '#d4e6f1', 'size': (300, 200)},
}

try:
    FONT = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 48)
    SFONT = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 14)
except:
    FONT = ImageFont.load_default()
    SFONT = ImageFont.load_default()

def make_img(name_cn, cat, fname):
    t = THEMES[cat]
    w, h = t['size']
    img = Image.new('RGB', (w, h), t['bg'])
    d = ImageDraw.Draw(img)

    m = 4
    d.rectangle([m, m, w-m-1, h-m-1], outline=t['accent'], width=2)
    d.rectangle([m+6, m+6, w-m-7, h-m-7], outline=f"{t['accent']}33", width=1)

    ch = name_cn[0] if name_cn else '?'
    bbox = d.textbbox((0, 0), ch, font=FONT)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    cx, cy = (w - tw) // 2 - bbox[0], (h - th) // 2 - bbox[1] - 12

    for dx, dy, c in [(2, 2, '#00000055'), (-2, -2, '#00000055'), (0, 0, t['accent'])]:
        d.text((cx + dx, cy + dy), ch, fill=c, font=FONT)

    sn = name_cn[:7] + ('...' if len(name_cn) > 7 else '')
    sb = d.textbbox((0, 0), sn, font=SFONT)
    sw = sb[2] - sb[0]
    d.text(((w - sw) // 2 - sb[0], h - 22), sn, fill=t['text'], font=SFONT)

    out_dir = f'public/images/{cat}'
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f'{fname}.webp')
    img.save(out_path, 'WEBP', quality=90)
    return out_path


# === 全部缺失图片数据 ===
ITEMS = {
    'magic-items': [
        ('汤姆·里德尔日记', 'tom-riddles-diary'),
        ('冈特戒指', 'gaunts-ring'),
        ('赫奇帕奇金杯', 'hufflepuffs-cup'),
        ('拉文克劳冠冕', 'ravenclaws-diadem'),
        ('斯莱特林挂坠盒', 'slytherins-locket'),
        ('哈利活魂器', 'harry-living-horcrux'),
        ('纳吉尼', 'nagini'),
        ('老魔杖', 'elder-wand'),
        ('隐形衣', 'invisibility-cloak'),
        ('复活石', 'resurrection-stone'),
        ('活点地图', 'marauders-map'),
        ('时间转换器', 'time-turner'),
        ('厄里斯魔镜', 'mirror-of-erised'),
        ('格兰芬多宝剑', 'sword-of-gryffindor'),
        ('火弩箭', 'firebolt'),
        ('波特瞭望站', 'potterwatch'),
        ('预言球', 'prophecy-orb'),
        ('韦斯莱把戏坊产品', 'weasleys-products'),
        ('邓布利多的回忆', 'dumbledore'),
        ('三强争霸赛奖杯', 'triwizard-cup'),
        ('咆哮信', 'howler'),
        ('冥想盆', 'pensieve'),
        ('飞路粉', 'floo-powder'),
        ('韦斯莱家庭钟', 'weasley-clock'),
        ('怪物书', 'monster-book'),
        ('记忆球', 'remembrall'),
        ('妖精银器', 'goblin-silver'),
        ('赫敏的无底袋', 'hermiones-bag'),
        ('光轮2000', 'nimbus-2000'),
        ('韦斯莱飞天汽车', 'flying-car'),
        ('魔法部入口', 'ministry-entrance'),
        ('黑魔法探测器', 'dark-detectors'),
        ('黑魔标记', 'dark-mark'),
        ('双面镜', 'two-way-mirror'),
        ('伸缩耳', 'extendable-ears'),
        ('逃课糖', 'skiving-snackboxes'),
        ('熄灯器', 'deluminator'),
        ('小天狼星的摩托', 'sirius-motorcycle'),
        ('分院帽', 'sorting-hat'),
        ('霍格沃茨特快列车', 'hogwarts-express'),
        ('死亡帷幕', 'the-veil'),
        ('自由衣物', 'clothes-freedom'),
        ('科林的相机', 'colin-camera'),
        ('魔法石', 'philosophers-stone'),
        ('记忆瓶', 'memory-vials'),
        ('消失柜', 'vanishing-cabinet'),
        ('门钥匙', 'portkey'),
        ('假挂坠盒', 'fake-locket'),
        ('火焰杯', 'goblet-of-fire'),
        ('血咒羽毛笔', 'blood-quill'),
        ('预言家日报', 'daily-prophet'),
        ('速速引语笔', 'quick-quotes-quill'),
        ('阿尼马格斯变身', 'animagus'),
        ('混血王子的书', 'half-blood-princes-book'),
        ('哈利的魔杖', 'harrys-wand'),
        ('伏地魔的魔杖', 'voldemorts-wand'),
        ('唱唱反调', 'the-quibbler'),
        ('蛋白石项链', 'opal-necklace'),
        ('毒蜂蜜酒', 'poisoned-mead'),
        ('窥镜', 'sneakoscope'),
        ('冤敌窥镜', 'foe-glass'),
        ('金蛋', 'golden-egg'),
        ('有求必应屋', 'room-of-requirement'),
        ('保护咒', 'protective-enchantments'),
        ('虫尾巴', 'wormtail'),
        ('福克斯', 'fawkes'),
        ('霍格沃茨盔甲雕像', 'hogwarts-statues'),
        ('路威', 'fluffy'),
        ('加隆硬币', 'da-coins'),
    ],
    'characters': [
        ('阿不福思·邓布利多', 'aberforth-dumbledore'),
        ('安东宁·多洛霍夫', 'antonin-dolohov'),
        ('阿格斯·费尔奇', 'argus-filch'),
        ('奥古斯特·罗克伍德', 'august-rookwood'),
        ('小巴蒂·克劳奇', 'barty-crouch-jr'),
        ('布莱泽·扎比尼', 'blaise-zabini'),
        ('科林·克里维', 'colin-creevey'),
        ('康奈利·福吉', 'cornelius-fudge'),
        ('克拉布和高尔', 'crabbe-goyle'),
        ('厄尼·麦克米兰', 'ernie-macmillan'),
        ('拉环', 'griphook'),
        ('汉娜·艾博特', 'hannah-abbott'),
        ('海德薇', 'hedwig'),
        ('海莲娜·拉文克劳', 'helena-ravenclaw'),
        ('赫尔加·赫奇帕奇', 'helga-hufflepuff'),
        ('伊戈尔·卡卡洛夫', 'igor-karkaroff'),
        ('贾斯廷·芬列里', 'justin-finch-fletchley'),
        ('庞弗雷夫人', 'madam-pomfrey'),
        ('迈克尔·科纳', 'michael-corner'),
        ('哭泣的桃金娘', 'moaning-myrtle'),
        ('蒙顿格斯·弗莱切', 'mundungus-fletcher'),
        ('纳西莎·马尔福', 'narcissa-malfoy'),
        ('差点没头的尼克', 'nearly-headless-nick'),
        ('奥古斯塔·隆巴顿', 'neville-grandmother'),
        ('纽特·斯卡曼德', 'newt-scamander'),
        ('加里克·奥利凡德', 'ollivander'),
        ('奥林佩·马克西姆', 'olympemaxime'),
        ('帕德玛·佩蒂尔', 'padma-patil'),
        ('潘西·帕金森', 'pansy-parkinson'),
        ('奎里纳斯·奇洛', 'quirinus-quirrel'),
        ('丽塔·斯基特', 'rita-skeeter'),
        ('罗伊纳·拉文克劳', 'rowena-ravenclaw'),
        ('特里·布特', 'terry-boot'),
        ('维克多·克鲁姆', 'viktor-krum'),
        ('沃尔顿·麦克尼尔', 'walden-macnair'),
        ('温基', 'winky'),
        ('谢诺菲留斯·洛夫古德', 'xenophilius-lovegood'),
        ('扎卡赖亚斯·史密斯', 'zacharias-smith'),
    ],
    'creatures': [
        ('康沃尔郡小精灵', 'cornish-pixie'),
        ('路威三头犬', 'fluffy-three-headed-dog'),
        ('人鱼', 'merpeople'),
        ('匈牙利树蜂龙', 'hungarian-horntail'),
        ('毒角兽', 'erumpent'),
        ('泡泡鱼', 'bubblegill'),
        ('皮皮鬼', 'poltergeist-peeves'),
    ],
    'places': [
        ('戈德里克山谷', 'godrics-hollow'),
        ('圣芒戈医院', 'st-mungos'),
        ('圣奥斯瓦尔德', 'st-oswalds'),
        ('蜘蛛尾巷', 'spinners-end'),
        ('韦斯莱魔法把戏坊', 'weasleys-shop'),
        ('努米朗加德', 'nurmengard'),
        ('冈特老宅', 'gaunt-shack'),
    ],
}

if __name__ == '__main__':
    total = sum(len(v) for v in ITEMS.values())
    print(f"开始生成 {total} 张图片...")

    count = 0
    for cat, entries in ITEMS.items():
        for name_cn, fname in entries:
            path = make_img(name_cn, cat, fname)
            count += 1
            if count % 15 == 0:
                print(f"  进度: {count}/{total}")

    print(f"\n✅ 完成！共生成 {count} 张图片")
