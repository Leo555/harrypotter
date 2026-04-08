// 书籍文本加载器 — 动态导入原著文本并按章节分割，支持中英文双语
// 英文文件映射
const bookFilesEn = {
  1: () => import('../../books/Book1-Harry_Potter_and_the_Sorcerers_Stone.txt?raw'),
  2: () => import('../../books/Book2-Harry_Potter_and_the_Chamber_of_Secrets.txt?raw'),
  3: () => import('../../books/Book3-Harry_Potter_and_the_Prisoner_of_Azkaban.txt?raw'),
  4: () => import('../../books/Book4-Harry_Potter_and_the_Goblet_of_Fire.txt?raw'),
  5: () => import('../../books/Book5-Harry_Potter_and_the_Order_of_the_Phoenix.txt?raw'),
  6: () => import('../../books/Book6-Harry_Potter_and_the_Half_Blood_Prince.txt?raw'),
  7: () => import('../../books/Book7-Harry_Potter_and_the_Deathly_Hallows.txt?raw'),
}

// 中文文件映射
const bookFilesCn = {
  1: () => import('../../books/Book1-哈利·波特与魔法石.txt?raw'),
  2: () => import('../../books/Book2-哈利·波特与密室.txt?raw'),
  3: () => import('../../books/Book3-哈利·波特与阿兹卡班的囚徒.txt?raw'),
  4: () => import('../../books/Book4-哈利·波特与火焰杯.txt?raw'),
  5: () => import('../../books/Book5-哈利·波特与凤凰社.txt?raw'),
  6: () => import('../../books/Book6-哈利·波特与混血王子.txt?raw'),
  7: () => import('../../books/Book7-哈利·波特与死亡圣器.txt?raw'),
}

// 中文章节名映射（来自 books.js 数据）
const chapterNames = {
  1: [
    '大难不死的男孩', '悄悄消失的玻璃', '猫头鹰传书', '钥匙管理员',
    '对角巷', '从九又四分之三站台开始的旅程', '分院帽', '魔药课老师',
    '午夜决斗', '万圣节', '魁地奇比赛', '厄里斯魔镜',
    '尼可·勒梅', '挪威脊背龙诺伯', '禁林', '穿越活板门', '双面人'
  ],
  2: [
    '最糟糕的生日', '多比的警告', '陋居', '在丽痕书店',
    '打人柳', '吉德罗·洛哈特', '泥巴种和低声细语', '忌辰晚会',
    '墙上的字', '失控的游走球', '决斗俱乐部', '复方汤剂',
    '最秘密的日记', '大蜘蛛阿拉戈克', '密室', '斯莱特林的继承人',
    '凤凰与宝剑', '多比的报偿'
  ],
  3: [
    '猫头鹰邮递', '玛姬姑妈的大错', '骑士公共汽车', '破釜酒吧',
    '摄魂怪', '鹰爪与茶叶', '柜子里的博格特', '胖夫人逃跑',
    '凶兆', '活点地图', '火弩箭', '守护神', '格兰芬多对拉文克劳',
    '斯内普的怨恨', '魁地奇决赛', '特里劳妮教授的预言',
    '猫、老鼠和狗', '月亮脸、虫尾巴、大脚板和尖头叉子',
    '伏地魔的仆人', '摄魂怪之吻', '赫敏的秘密', '又见猫头鹰邮递'
  ],
  4: [
    '里德尔府', '伤疤', '邀请', '回到陋居',
    '韦斯莱魔法把戏坊', '门钥匙', '行李箱和扣子', '魁地奇世界杯',
    '黑魔标记', '魔法部的混乱', '登上霍格沃茨特快列车', '三强争霸赛',
    '疯眼汉穆迪', '不可饶恕咒', '布斯巴顿和德姆斯特朗',
    '火焰杯', '四位勇士', '检验魔杖', '匈牙利树蜂',
    '第一个项目', '家养小精灵解放阵线', '意外的挑战', '丽塔·斯基特的独家报道',
    '彩蛋', '第二个项目', '大脚板归来', '克劳奇先生的疯狂',
    '梦境', '冥想盆', '第三个项目', '食死徒', '骨肉仆', '黑魔王崛起',
    '闪回咒', '十字路口', '真相', '分道扬镳', '开始'
  ],
  5: [
    '达力·德思礼遭遇摄魂怪', '猫头鹰群', '先遣警卫', '格里莫广场12号',
    '凤凰社', '最高贵的布莱克家族', '魔法部', '听证会',
    '韦斯莱夫人的烦恼', '卢娜·洛夫古德', '分院帽的新歌', '乌姆里奇教授',
    '用羽毛笔罚写', '珀西和大脚板', '霍格沃茨高级调查官',
    '在猪头酒吧', '第二十四号教育令', '邓布利多军',
    '狮子和蛇', '海格的故事', '蛇眼', '圣芒戈魔法伤病医院',
    '封闭病房', '大脑封闭术', '被占的小甲虫', '见到了出乎意料的人',
    '蜈蚣', '斯内普最痛苦的记忆', '就业指导', '格洛普',
    'O.W.L.考试', '在帷幔之外', '反击', '魔法部',
    '帷幔的彼端', '唯一一个他惧怕的人', '失去的预言', '迷失而又找回的'
  ],
  6: [
    '另一位部长', '蜘蛛尾巷', '遗嘱与遗愿', '霍拉斯·斯拉格霍恩',
    '过量的黏痰', '德拉科的绕道', '鼻涕虫俱乐部', '斯内普的胜利',
    '混血王子', '盖恩特家的小屋', '赫敏的帮手', '银器和蛋白石',
    '绝密的里德尔', '菲利克斯·福灵剂', '牢不可破的誓言', '冰冻的圣诞节',
    '迟缓的记忆', '生日的惊喜', '小精灵尾巴', '伏地魔的请求',
    '不可知的房间', '葬礼之后', '魂器', '神锋无影',
    '窥探者', '岩洞', '闪电击中的塔楼', '凤凰挽歌',
    '混血王子逃跑了', '白色坟墓'
  ],
  7: [
    '黑魔王归来', '在逃', '德思礼一家离开', '七个波特',
    '堕落的勇士', '身穿睡衣的食尸鬼', '阿不思·邓布利多的遗嘱', '婚礼',
    '藏身之处', '克利切的故事', '贿赂', '魔法即是权力',
    '麻瓜出身登记委员会', '小偷', '妖精的报复', '戈德里克山谷',
    '巴希达的秘密', '阿不思·邓布利多的生与谎', '银色的牝鹿', '卢娜的爸爸',
    '三兄弟的传说', '死亡圣器', '马尔福庄园', '魔杖制作人',
    '贝壳小屋', '古灵阁', '最后的隐匿', '迷失的冠冕',
    '劫后余生', '西弗勒斯·斯内普的故事', '禁林',
    '国王十字车站', '裂缝', '缺陷', '再一次', '尾声：十九年后'
  ],
}

const bookTitles = {
  1: '哈利·波特与魔法石',
  2: '哈利·波特与密室',
  3: '哈利·波特与阿兹卡班囚徒',
  4: '哈利·波特与火焰杯',
  5: '哈利·波特与凤凰社',
  6: '哈利·波特与混血王子',
  7: '哈利·波特与死亡圣器',
}

const bookTitlesEn = {
  1: "Harry Potter and the Sorcerer's Stone",
  2: 'Harry Potter and the Chamber of Secrets',
  3: 'Harry Potter and the Prisoner of Azkaban',
  4: 'Harry Potter and the Goblet of Fire',
  5: 'Harry Potter and the Order of the Phoenix',
  6: 'Harry Potter and the Half-Blood Prince',
  7: 'Harry Potter and the Deathly Hallows',
}

const bookCovers = {
  1: '📕', 2: '📗', 3: '📘', 4: '📙', 5: '📓', 6: '📒', 7: '📔',
}

const bookColors = {
  1: '#C62828', 2: '#2E7D32', 3: '#1565C0', 4: '#F9A825',
  5: '#8E24AA', 6: '#00897B', 7: '#E65100',
}

/**
 * 加载书籍文本并分割为章节（支持中英文）
 * @param {number} bookNum - 书号 (1-7)
 * @param {'en'|'cn'} lang - 语言，默认 'en'
 * @returns {Promise<{ title: string, chapters: Array<{ number, title, titleCn, content }>, lang }>}
 */
export async function loadBook(bookNum, lang = 'en') {
  const files = lang === 'cn' ? bookFilesCn : bookFilesEn
  const loader = files[bookNum]
  if (!loader) throw new Error(`Book ${bookNum} not found`)

  const module = await loader()
  const text = module.default

  const cnNames = chapterNames[bookNum] || []
  const chapters = []

  if (lang === 'cn') {
    // 中文版：按 "第X章　标题" 分割，同时支持 "尾声" 作为最后一章
    const cnChapterRegex = /(?:^|\n)(第[一二三四五六七八九十百零\d]+章[\s　]+.+|尾声[\s　]+.+)\n/g
    const splits = []
    let match

    while ((match = cnChapterRegex.exec(text)) !== null) {
      // 提取章节标题（去掉 "第X章　" 前缀）
      let heading = match[1].trim()
      let chTitle = ''
      const headingMatch = heading.match(/^第[一二三四五六七八九十百零\d]+章[\s　]+(.+)/)
      if (headingMatch) {
        chTitle = headingMatch[1].trim()
      } else if (heading.startsWith('尾声')) {
        chTitle = heading.replace(/^尾声[\s　]+/, '').trim()
      }
      splits.push({
        index: match.index,
        raw: match[0],
        chTitle,
      })
    }

    for (let i = 0; i < splits.length; i++) {
      const start = splits[i].index + splits[i].raw.length
      const end = i + 1 < splits.length ? splits[i + 1].index : text.length
      const content = text.slice(start, end).trim()

      chapters.push({
        number: i + 1,
        title: cnNames[i] || splits[i].chTitle || `第${i + 1}章`,
        titleCn: cnNames[i] || splits[i].chTitle || `第${i + 1}章`,
        content,
      })
    }
  } else {
    // 英文版：按 "CHAPTER X" / "Chapter X" 分割
    // 支持两种格式：
    // 1. CHAPTER X\nTITLE (分行)
    // 2. CHAPTER X TITLE (同行)
    // 注意：使用 [ \t] 而不是 \s，避免跨行匹配
    const chapterRegex = /(?:^|\n)[ \t]*(CHAPTER|Chapter)[ \t]+([A-Za-z-]+)[ \t]*([^\r\n]*)\r?\n/g
    const splits = []
    let match

    while ((match = chapterRegex.exec(text)) !== null) {
      // match[2] 是章节号（如 ONE, SEVEN）
      // match[3] 是同行标题（如果有，如 THE SORTING HAT）
      const sameLineTitle = match[3] ? match[3].trim() : ''
      splits.push({
        index: match.index,
        raw: match[0],
        sameLineTitle: sameLineTitle.length > 0 && sameLineTitle.length < 80 ? sameLineTitle : '',
      })
    }

    for (let i = 0; i < splits.length; i++) {
      const start = splits[i].index + splits[i].raw.length
      const end = i + 1 < splits.length ? splits[i + 1].index : text.length
      let content = text.slice(start, end).trim()

      // 如果同行有标题，直接使用
      let engTitle = splits[i].sameLineTitle || ''

      // 如果同行没有标题，尝试从下一行提取
      if (!engTitle) {
        const firstNewline = content.indexOf('\n')
        if (firstNewline > 0 && firstNewline < 80) {
          const possibleTitle = content.slice(0, firstNewline).trim()
          if (possibleTitle.length < 80 && possibleTitle.length > 0 &&
              (possibleTitle === possibleTitle.toUpperCase() || /^[A-Z]/.test(possibleTitle))) {
            engTitle = possibleTitle
            content = content.slice(firstNewline).trim()
          }
        }
      }

      chapters.push({
        number: i + 1,
        title: engTitle || `Chapter ${i + 1}`,
        titleCn: cnNames[i] || `第${i + 1}章`,
        content,
      })
    }
  }

  return {
    bookNum,
    title: lang === 'cn' ? bookTitles[bookNum] : bookTitlesEn[bookNum],
    titleCn: bookTitles[bookNum],
    titleEn: bookTitlesEn[bookNum],
    cover: bookCovers[bookNum],
    color: bookColors[bookNum],
    lang,
    chapters,
  }
}

export { bookTitles, bookTitlesEn, bookCovers, bookColors, chapterNames }
