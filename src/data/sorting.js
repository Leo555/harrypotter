// 分院帽测试数据
const sortingQuestions = [
  {
    id: 1,
    question: '当你站在十字路口时，你最想走哪条路？',
    options: [
      { text: '通往危险但可能有宝藏的森林', house: 'gryffindor', points: 3 },
      { text: '通往神秘而古老的图书馆', house: 'ravenclaw', points: 3 },
      { text: '通往可以帮助他人的村庄', house: 'hufflepuff', points: 3 },
      { text: '通往权力和影响力的城堡', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 2,
    question: '如果你可以拥有一种超能力，你会选择？',
    options: [
      { text: '无畏的勇气，面对任何恐惧', house: 'gryffindor', points: 3 },
      { text: '无尽的智慧，洞察一切真相', house: 'ravenclaw', points: 3 },
      { text: '治愈之力，抚平所有伤痛', house: 'hufflepuff', points: 3 },
      { text: '说服之术，让所有人听从你', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 3,
    question: '你最敬佩的品质是什么？',
    options: [
      { text: '勇敢——敢于做正确的事', house: 'gryffindor', points: 3 },
      { text: '智慧——追求知识和真理', house: 'ravenclaw', points: 3 },
      { text: '忠诚——永远站在朋友身边', house: 'hufflepuff', points: 3 },
      { text: '野心——追求卓越和成功', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 4,
    question: '面对一个不公正的规则，你会怎么做？',
    options: [
      { text: '公开反抗，即使会受到惩罚', house: 'gryffindor', points: 3 },
      { text: '研究规则的漏洞，找到合法的方式绕过', house: 'ravenclaw', points: 3 },
      { text: '联合所有人一起和平抗议', house: 'hufflepuff', points: 3 },
      { text: '暗中谋划，等待最佳时机改变它', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 5,
    question: '在霍格沃茨，你最想选修哪门课？',
    options: [
      { text: '黑魔法防御术——学习保护自己和他人', house: 'gryffindor', points: 3 },
      { text: '古代魔文——解读古老的魔法文字', house: 'ravenclaw', points: 3 },
      { text: '保护神奇动物——照顾魔法生物', house: 'hufflepuff', points: 3 },
      { text: '魔药学——掌握精密的魔药配方', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 6,
    question: '你的朋友遇到了危险，但帮助他意味着你也会陷入险境。你会？',
    options: [
      { text: '毫不犹豫地冲上去帮忙', house: 'gryffindor', points: 3 },
      { text: '快速分析情况，找到最安全的救援方案', house: 'ravenclaw', points: 3 },
      { text: '不管危险有多大，朋友比什么都重要', house: 'hufflepuff', points: 3 },
      { text: '先确保自己安全，然后寻找帮手一起解决', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 7,
    question: '你最害怕别人怎么评价你？',
    options: [
      { text: '胆小、懦弱', house: 'gryffindor', points: 3 },
      { text: '无知、愚蠢', house: 'ravenclaw', points: 3 },
      { text: '自私、不忠', house: 'hufflepuff', points: 3 },
      { text: '平庸、无能', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 8,
    question: '如果你发现一本神秘的古书，你会？',
    options: [
      { text: '立即打开翻阅，冒险是生活的调味料', house: 'gryffindor', points: 3 },
      { text: '仔细研究封面和来源，再决定是否打开', house: 'ravenclaw', points: 3 },
      { text: '和朋友们一起分享这个发现', house: 'hufflepuff', points: 3 },
      { text: '独自保存，等到合适的时机再利用它', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 9,
    question: '在厄里斯魔镜中，你最可能看到什么？',
    options: [
      { text: '自己成为英雄，拯救了所有人', house: 'gryffindor', points: 3 },
      { text: '自己获得了世界上所有的知识', house: 'ravenclaw', points: 3 },
      { text: '自己被所有亲人和朋友包围，幸福快乐', house: 'hufflepuff', points: 3 },
      { text: '自己站在权力的巅峰，受人尊敬', house: 'slytherin', points: 3 },
    ]
  },
  {
    id: 10,
    question: '黎明还是黄昏？',
    options: [
      { text: '黎明——新的一天充满可能', house: 'gryffindor', points: 2 },
      { text: '黎明——最安静的思考时间', house: 'ravenclaw', points: 2 },
      { text: '黄昏——温暖而宁静的时刻', house: 'hufflepuff', points: 2 },
      { text: '黄昏——夜晚的序章，属于野心家', house: 'slytherin', points: 2 },
    ]
  },
]

// 学院详细描述
const houseResults = {
  gryffindor: {
    name: '格兰芬多',
    nameEn: 'Gryffindor',
    founder: '戈德里克·格兰芬多',
    element: '火',
    animal: '狮子',
    ghost: '差点没头的尼克',
    commonRoom: '格兰芬多塔楼',
    colors: ['猩红色', '金色'],
    emoji: '🦁',
    color: '#740001',
    lightColor: '#ae0001',
    trait: '勇气、果敢、骑士精神',
    description: '你属于格兰芬多！这里是勇者的家园。格兰芬多重视勇气、胆量和骑士精神。你拥有一颗勇敢的心，敢于为正义挺身而出，即使面对困难也绝不退缩。哈利·波特、赫敏·格兰杰和阿不思·邓布利多都是你的学院同胞！',
    famousMembers: ['哈利·波特', '赫敏·格兰杰', '罗恩·韦斯莱', '阿不思·邓布利多', '小天狼星·布莱克', '米勒娃·麦格'],
  },
  ravenclaw: {
    name: '拉文克劳',
    nameEn: 'Ravenclaw',
    founder: '罗伊纳·拉文克劳',
    element: '风',
    animal: '鹰',
    ghost: '格雷女士（海莲娜·拉文克劳）',
    commonRoom: '拉文克劳塔楼',
    colors: ['蓝色', '青铜色'],
    emoji: '🦅',
    color: '#0e1a40',
    lightColor: '#222f5b',
    trait: '智慧、创造力、博学',
    description: '你属于拉文克劳！这里是智者的殿堂。拉文克劳重视智慧、学识和创造力。你拥有敏锐的头脑和无尽的求知欲，善于思考和分析问题。卢娜·洛夫古德和菲利乌斯·弗立维都是你的学院同胞！',
    famousMembers: ['卢娜·洛夫古德', '秋·张', '菲利乌斯·弗立维', '吉德罗·洛哈特', '奎里纳斯·奇洛'],
  },
  hufflepuff: {
    name: '赫奇帕奇',
    nameEn: 'Hufflepuff',
    founder: '赫尔加·赫奇帕奇',
    element: '土',
    animal: '獾',
    ghost: '胖修士',
    commonRoom: '赫奇帕奇地下室',
    colors: ['黄色', '黑色'],
    emoji: '🦡',
    color: '#ecb939',
    lightColor: '#f0c75e',
    trait: '忠诚、勤劳、公正',
    description: '你属于赫奇帕奇！这里是忠诚者的港湾。赫奇帕奇重视忠诚、公正和不懈的努力。你拥有一颗温暖善良的心，对待朋友真诚忠实，不畏辛劳。纽特·斯卡曼德和塞德里克·迪戈里都是你的学院同胞！',
    famousMembers: ['纽特·斯卡曼德', '塞德里克·迪戈里', '尼法朵拉·唐克斯', '波莫娜·斯普劳特'],
  },
  slytherin: {
    name: '斯莱特林',
    nameEn: 'Slytherin',
    founder: '萨拉查·斯莱特林',
    element: '水',
    animal: '蛇',
    ghost: '血人巴罗',
    commonRoom: '斯莱特林地牢',
    colors: ['翠绿色', '银色'],
    emoji: '🐍',
    color: '#1a472a',
    lightColor: '#2a623d',
    trait: '野心、精明、领导力',
    description: '你属于斯莱特林！这里是雄心者的领地。斯莱特林重视野心、精明和领导才能。你足智多谋、目标明确，善于利用一切资源达成目标。西弗勒斯·斯内普和梅林都是你的学院同胞！',
    famousMembers: ['西弗勒斯·斯内普', '德拉科·马尔福', '梅林', '贝拉特里克斯·莱斯特兰奇', '霍拉斯·斯拉格霍恩'],
  },
}

export { sortingQuestions, houseResults }
