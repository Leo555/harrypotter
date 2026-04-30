#!/usr/bin/env python3
"""
生成缺失图片 v4 - 明亮纯色背景版
核心原则: 200x200 图片缩放到 52x52 时必须清晰可见
- 使用明亮的纯色/渐变背景
- 首字超大(72pt)，居中显示
- 高对比度配色
"""
from PIL import Image, ImageDraw, ImageFont
import os, math

# 明亮的主题色 - 在 52px 缩放下仍然醒目
THEMES = {
    'characters': {
        'bg_top': '#8B6914', 'bg_bot': '#5c4a0f',   # 金棕渐变
        'text': '#FFF8E1', 'shadow': '#3d2e06',
        'border': '#FFD700', 'size': (200, 200),
    },
    'creatures': {
        'bg_top': '#1b5e20', 'bg_bot': '#0d3310',     # 森林绿渐变
        'text': '#C8E6C9', 'shadow': '#0a1f0c',
        'border': '#69F0AE', 'size': (200, 200),
    },
    'magic-items': {
        'bg_top': '#8b0000', 'bg_bot': '#4a0000',      # 深红渐变
        'text': '#FFCDD2', 'shadow': '#2a0000',
        'border': '#FF5252', 'size': (200, 200),
    },
    'places': {
        'bg_top': '#1565c0', 'bg_bot': '#0d3a6e',       # 深蓝渐变
        'text': '#BBDEFB', 'shadow': '#072147',
        'border': '#448AFF', 'size': (300, 200),
    },
}

try:
    FONT = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 80)
    FONT_NAME = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 13)
except Exception:
    FONT = ImageFont.load_default()
    FONT_NAME = ImageFont.load_default()


def draw_gradient(img, top_color, bottom_color):
    """绘制垂直渐变背景"""
    w, h = img.size
    r1, g1, b1 = int(top_color[1:3], 16), int(top_color[3:5], 16), int(top_color[5:7], 16)
    r2, g2, b2 = int(bottom_color[1:3], 16), int(bottom_color[3:5], 16), int(bottom_color[5:7], 16)
    for y in range(h):
        ratio = y / max(h - 1, 1)
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        img.putpixel((0, y), (r, g, b))
        # 用 line 复制整行
        from PIL import ImageDraw as ID
        ID.Draw(img).line([(0, y), (w-1, y)], fill=(r, g, b))


def make_img(name_cn, cat, fname):
    t = THEMES[cat]
    w, h = t['size']
    img = Image.new('RGB', (w, h), t['bg_top'])
    
    # 渐变背景
    draw_gradient(img, t['bg_top'], t['bg_bot'])
    d = ImageDraw.Draw(img)

    m = 5
    
    # 粗亮边框
    d.rectangle([m, m, w-m-1, h-m-1], outline=t['border'], width=3)

    # 内框装饰线
    im = m + 10
    d.rectangle([im, im, w-im-1, h-im-1], outline=f"{t['border']}55", width=1)

    # 四角装饰 L 型
    cl = 14
    corners = [(im+1, im+1), (w-im-2, im+1), (im+1, h-im-2), (w-im-2, h-im-2)]
    for cx, cy in corners:
        dx = cl if cx < w//2 else -cl
        dy = cl if cy < h//2 else -cl
        d.line([(cx, cy), (cx+dx, cy)], fill=t['border'], width=2)
        d.line([(cx, cy), (cx, cy+dy)], fill=t['border'], width=2)

    # 主首字 - 超大居中
    ch = name_cn[0] if name_cn else '?'
    bbox = d.textbbox((0, 0), ch, font=FONT)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    cx = (w-tw)//2 - bbox[0]
    cy = (h-th)//2 - bbox[1] - 18

    # 多层阴影增强立体感
    for offset in [(3,3,'#00000099'), (2,2,'#00000077'), (-1,-1,t['border'])]:
        d.text((cx+offset[0], cy+offset[1]), ch, fill=offset[2], font=FONT)
    d.text((cx, cy), ch, fill=t['text'], font=FONT)

    # 底部名称条
    bar_h = 26
    by = h - bar_h - m - 1
    # 半透明遮罩
    overlay = Image.new('RGBA', (w-m*2, bar_h), (0, 0, 0, 140))
    img.paste(overlay, (m, by), overlay)

    sn = name_cn[:10] + ('...' if len(name_cn)>10 else '')
    sb = d.textbbox((0,0), sn, font=FONT_NAME)
    sw = sb[2]-sb[0]
    d.text(((w-sw)//2-sb[0], by+6), sn, fill=t['text'], font=FONT_NAME)

    out_dir = f'public/images/{cat}'
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f'{fname}.webp')
    img.convert('RGB').save(out_path, 'WEBP', quality=93)
    return out_path


ITEMS = {
    'magic-items': [
        ('汤姆·里德尔日记','tom-riddles-diary'),('冈特戒指','gaunts-ring'),
        ('赫奇帕奇金杯','hufflepuffs-cup'),('拉文克劳冠冕','ravenclaws-diadem'),
        ('斯莱特林挂坠盒','slytherins-locket'),('哈利活魂器','harry-living-horcrux'),
        ('纳吉尼','nagini'),('老魔杖','elder-wand'),('隐形衣','invisibility-cloak'),
        ('复活石','resurrection-stone'),('活点地图','marauders-map'),('时间转换器','time-turner'),
        ('厄里斯魔镜','mirror-of-erised'),('格兰芬多宝剑','sword-of-gryffindor'),
        ('火弩箭','firebolt'),('波特瞭望站','potterwatch'),('预言球','prophecy-orb'),
        ('韦斯莱把戏坊产品','weasleys-products'),('邓布利多的回忆','dumbledore'),
        ('三强争霸赛奖杯','triwizard-cup'),('咆哮信','howler'),('冥想盆','pensieve'),
        ('飞路粉','floo-powder'),('韦斯莱家庭钟','weasley-clock'),('怪物书','monster-book'),
        ('记忆球','remembrall'),('妖精银器','goblin-silver'),('赫敏的无底袋','hermiones-bag'),
        ('光轮2000','nimbus-2000'),('韦斯莱飞天汽车','flying-car'),('魔法部入口','ministry-entrance'),
        ('黑魔法探测器','dark-detectors'),('黑魔标记','dark-mark'),('双面镜','two-way-mirror'),
        ('伸缩耳','extendable-ears'),('逃课糖','skiving-snackboxes'),('熄灯器','deluminator'),
        ('小天狼星的摩托','sirius-motorcycle'),('分院帽','sorting-hat'),
        ('霍格沃茨特快列车','hogwarts-express'),('死亡帷幕','the-veil'),
        ('自由衣物','clothes-freedom'),('科林的相机','colin-camera'),('魔法石','philosophers-stone'),
        ('记忆瓶','memory-vials'),('消失柜','vanishing-cabinet'),('门钥匙','portkey'),
        ('假挂坠盒','fake-locket'),('火焰杯','goblet-of-fire'),('血咒羽毛笔','blood-quill'),
        ('预言家日报','daily-prophet'),('速速引语笔','quick-quotes-quill'),
        ('阿尼马格斯变身','animagus'),('混血王子的书','half-blood-princes-book'),
        ('哈利的魔杖','harrys-wand'),('伏地魔的魔杖','voldemorts-wand'),
        ('唱唱反调','the-quibbler'),('蛋白石项链','opal-necklace'),('毒蜂蜜酒','poisoned-mead'),
        ('窥镜','sneakoscope'),('冤敌窥镜','foe-glass'),('金蛋','golden-egg'),
        ('有求必应屋','room-of-requirement'),('保护咒','protective-enchantments'),
        ('虫尾巴','wormtail'),('福克斯','fawkes'),('霍格沃茨盔甲雕像','hogwarts-statues'),
        ('路威','fluffy'),('加隆硬币','da-coins'),
    ],
    'characters': [
        ('阿不福思·邓布利多','aberforth-dumbledore'),('安东宁·多洛霍夫','antonin-dolohov'),
        ('阿格斯·费尔奇','argus-filch'),('奥古斯特·罗克伍德','august-rookwood'),
        ('小巴蒂·克劳奇','barty-crouch-jr'),('布莱泽·扎比尼','blaise-zabini'),
        ('科林·克里维','colin-creevey'),('康奈利·福吉','cornelius-fudge'),
        ('克拉布和高尔','crabbe-goyle'),('厄尼·麦克米兰','ernie-macmillan'),
        ('拉环','griphook'),('汉娜·艾博特','hannah-abbott'),('海德薇','hedwig'),
        ('海莲娜·拉文克劳','helena-ravenclaw'),('赫尔加·赫奇帕奇','helga-hufflepuff'),
        ('伊戈尔·卡卡洛夫','igor-karkaroff'),('贾斯廷·芬列里','justin-finch-fletchley'),
        ('庞弗雷夫人','madam-pomfrey'),('迈克尔·科纳','michael-corner'),
        ('哭泣的桃金娘','moaning-myrtle'),('蒙顿格斯·弗莱切','mundungus-fletcher'),
        ('纳西莎·马尔福','narcissa-malfoy'),('差点没头的尼克','nearly-headless-nick'),
        ('奥古斯塔·隆巴顿','neville-grandmother'),('纽特·斯卡曼德','newt-scamander'),
        ('加里克·奥利凡德','ollivander'),('奥林佩·马克西姆','olympemaxime'),
        ('帕德玛·佩蒂尔','padma-patil'),('潘西·帕金森','pansy-parkinson'),
        ('奎里纳斯·奇洛','quirinus-quirrel'),('丽塔·斯基特','rita-skeeter'),
        ('罗伊纳·拉文克劳','rowena-ravenclaw'),('特里·布特','terry-boot'),
        ('维克多·克鲁姆','viktor-krum'),('沃尔顿·麦克尼尔','walden-macnair'),
        ('温基','winky'),('谢诺菲留斯·洛夫古德','xenophilius-lovegood'),
        ('扎卡赖亚斯·史密斯','zacharias-smith'),
    ],
    'creatures': [
        ('康沃尔郡小精灵','cornish-pixie'),('路威三头犬','fluffy-three-headed-dog'),
        ('人鱼','merpeople'),('匈牙利树蜂龙','hungarian-horntail'),
        ('毒角兽','erumpent'),('泡泡鱼','bubblegill'),('皮皮鬼','poltergeist-peeves'),
    ],
    'places': [
        ('戈德里克山谷','godrics-hollow'),('圣芒戈医院','st-mungos'),
        ('圣奥斯瓦尔德','st-oswalds'),('蜘蛛尾巷','spinners-end'),
        ('韦斯莱魔法把戏坊','weasleys-shop'),('努米朗加德','nurmengard'),
        ('冈特老宅','gaunt-shack'),
    ],
}


if __name__ == '__main__':
    total = sum(len(v) for v in ITEMS.values())
    print(f"v4: 生成 {total} 张高可见度图片...")

    count = 0
    for cat, entries in ITEMS.items():
        for name_cn, fname in entries:
            make_img(name_cn, cat, fname)
            count += 1
            if count % 25 == 0:
                print(f"  {count}/{total}")

    print(f"\n✅ 完成！{count} 张")
