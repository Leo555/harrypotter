// 守护神测试数据

const patronusQuestions = [
  {
    id: 1,
    question: '夜晚独自走在一条幽暗的小路上，你听到身后有脚步声，你会？',
    options: [
      { text: '转身面对，准备迎接任何挑战', trait: 'brave', points: 3 },
      { text: '加快脚步，寻找最近的安全地点', trait: 'cautious', points: 3 },
      { text: '停下来仔细倾听，分析声音的来源', trait: 'wise', points: 3 },
      { text: '悄无声息地隐入阴影中观察', trait: 'cunning', points: 3 },
    ]
  },
  {
    id: 2,
    question: '你最快乐的记忆与什么有关？',
    options: [
      { text: '一次冒险或挑战的胜利时刻', trait: 'brave', points: 3 },
      { text: '与最亲密的人在一起的平凡时光', trait: 'gentle', points: 3 },
      { text: '发现或学习到令人惊奇的新事物', trait: 'wise', points: 3 },
      { text: '在自然中感受到的宁静与自由', trait: 'free', points: 3 },
    ]
  },
  {
    id: 3,
    question: '如果你是一种自然元素，你觉得自己最像？',
    options: [
      { text: '火焰 — 热烈而充满力量', trait: 'brave', points: 3 },
      { text: '流水 — 温柔但坚持不懈', trait: 'gentle', points: 3 },
      { text: '清风 — 自由且无拘无束', trait: 'free', points: 3 },
      { text: '大地 — 沉稳而值得信赖', trait: 'cautious', points: 3 },
    ]
  },
  {
    id: 4,
    question: '在一场激烈的辩论中，你通常会？',
    options: [
      { text: '据理力争，绝不退让', trait: 'brave', points: 3 },
      { text: '冷静分析双方观点，找出真相', trait: 'wise', points: 3 },
      { text: '试图调解，寻找双方都能接受的方案', trait: 'gentle', points: 3 },
      { text: '巧妙引导话题，让对方不知不觉同意你', trait: 'cunning', points: 3 },
    ]
  },
  {
    id: 5,
    question: '如果可以变成一种动物在自然中生活一天，你选择？',
    options: [
      { text: '翱翔天际的鹰，俯瞰整个世界', trait: 'free', points: 3 },
      { text: '森林深处的狼，与族群一起奔跑', trait: 'brave', points: 3 },
      { text: '海洋中的海豚，在波浪中嬉戏', trait: 'gentle', points: 3 },
      { text: '草丛中的猫，独自探索每个角落', trait: 'cunning', points: 3 },
    ]
  },
  {
    id: 6,
    question: '你最珍视的品质是？',
    options: [
      { text: '勇气 — 即使害怕也要行动', trait: 'brave', points: 3 },
      { text: '智慧 — 用知识照亮前路', trait: 'wise', points: 3 },
      { text: '善良 — 对所有生命怀有怜悯', trait: 'gentle', points: 3 },
      { text: '自由 — 不被任何东西束缚', trait: 'free', points: 3 },
    ]
  },
  {
    id: 7,
    question: '面对一个看似不可能完成的任务，你的第一反应是？',
    options: [
      { text: '兴奋！越难越有挑战性', trait: 'brave', points: 3 },
      { text: '制定详细计划，分步攻克', trait: 'wise', points: 3 },
      { text: '寻找盟友，相信团队的力量', trait: 'gentle', points: 3 },
      { text: '另辟蹊径，总有意想不到的方法', trait: 'cunning', points: 3 },
    ]
  },
  {
    id: 8,
    question: '在月光下的湖边，你更想做什么？',
    options: [
      { text: '向黑暗的湖心游去，探索未知', trait: 'brave', points: 2 },
      { text: '静静地坐着，沉浸在月光的宁静中', trait: 'gentle', points: 2 },
      { text: '仰望星空，思考宇宙的奥秘', trait: 'wise', points: 2 },
      { text: '沿着湖岸漫步，享受独处的自由', trait: 'free', points: 2 },
    ]
  },
  {
    id: 9,
    question: '如果你的守护神能传递一条信息，你最希望它说什么？',
    options: [
      { text: '"不要害怕，我与你同在"', trait: 'brave', points: 2 },
      { text: '"答案就在你心中"', trait: 'wise', points: 2 },
      { text: '"你被深深地爱着"', trait: 'gentle', points: 2 },
      { text: '"展开翅膀，随风飞翔"', trait: 'free', points: 2 },
    ]
  },
  {
    id: 10,
    question: '召唤守护神需要最快乐的记忆。此刻，你脑海中浮现的是？',
    options: [
      { text: '一段充满冒险和胜利的经历', trait: 'brave', points: 3 },
      { text: '一个让你顿悟的智慧瞬间', trait: 'wise', points: 3 },
      { text: '与挚爱之人的温暖拥抱', trait: 'gentle', points: 3 },
      { text: '在广阔天地间奔跑的自由', trait: 'free', points: 3 },
    ]
  },
]

// 守护神结果 — 按主要特质分组
const patronusResults = {
  brave: [
    {
      name: '牡鹿',
      nameEn: 'Stag',
      emoji: '🦌',
      description: '你的守护神是牡鹿！这是最崇高的守护神之一，象征着勇气、守护与高贵的牺牲精神。牡鹿守护神的主人拥有坚定的信念和无畏的心灵，他们会为了保护所爱之人而奋不顾身。',
      famous: '哈利·波特、詹姆·波特',
      traits: ['勇敢', '守护', '高贵', '牺牲精神'],
      element: '火',
      rarity: '罕见',
      power: '极强',
      lore: '牡鹿在凯尔特神话中是森林之王，象征着太阳的力量和生命的循环。拥有牡鹿守护神的巫师，内心深处蕴藏着最纯粹的勇气和对生命的热爱。',
    },
    {
      name: '狮子',
      nameEn: 'Lion',
      emoji: '🦁',
      description: '你的守护神是狮子！万兽之王的形态展现了你内心的王者气度。狮子守护神的主人拥有天生的领导力和保护弱者的强烈本能，你的勇气能够感染身边的每一个人。',
      famous: '（极为稀有）',
      traits: ['领导力', '威严', '勇猛', '正义'],
      element: '火',
      rarity: '极为罕见',
      power: '极强',
      lore: '狮子守护神极为罕见，在魔法史上仅有少数记载。它代表着绝对的勇气和王者之风，拥有者往往在危急时刻展现出惊人的力量。',
    },
  ],
  wise: [
    {
      name: '苍鹰',
      nameEn: 'Hawk',
      emoji: '🦅',
      description: '你的守护神是苍鹰！这高空中的猎手代表着敏锐的洞察力和超凡的智慧。苍鹰守护神的主人能够从高处审视全局，以清晰的思维穿透迷雾，看到别人看不到的真相。',
      famous: '（与拉文克劳精神相通）',
      traits: ['洞察', '远见', '智慧', '独立'],
      element: '风',
      rarity: '稀有',
      power: '强',
      lore: '苍鹰在许多文化中都被视为神的使者，它拥有最敏锐的双眼和最迅捷的飞行。苍鹰守护神暗示着主人对知识和真理有着永不满足的渴望。',
    },
    {
      name: '猫头鹰',
      nameEn: 'Owl',
      emoji: '🦉',
      description: '你的守护神是猫头鹰！夜之智者的化身，猫头鹰守护神象征着深沉的智慧和对黑暗的无畏。你能在最混乱的环境中保持冷静，用知识和理性为他人照亮前路。',
      famous: '（古老的智慧象征）',
      traits: ['智慧', '冷静', '夜视力', '神秘'],
      element: '风',
      rarity: '稀有',
      power: '强',
      lore: '猫头鹰自古以来就是雅典娜（智慧女神）的圣兽，在巫师世界中同样备受尊敬。猫头鹰守护神的主人往往是最博学的人，他们的思维能够穿透最深的黑暗。',
    },
  ],
  gentle: [
    {
      name: '水獭',
      nameEn: 'Otter',
      emoji: '🦦',
      description: '你的守护神是水獭！活泼、聪慧、充满好奇心的水獭代表着纯真的快乐和深厚的情感纽带。水獭守护神的主人内心充满温暖，善于用智慧和爱来守护身边的人。',
      famous: '赫敏·格兰杰',
      traits: ['聪慧', '好奇', '温暖', '忠诚'],
      element: '水',
      rarity: '较为常见',
      power: '强',
      lore: '水獭是最具灵性的水中生物之一，它们聪明、善于合作，且总是充满欢乐。赫敏·格兰杰的守护神正是水獭，这反映了她聪慧而善良的内心。',
    },
    {
      name: '天鹅',
      nameEn: 'Swan',
      emoji: '🦢',
      description: '你的守护神是天鹅！优雅、忠贞、纯洁的天鹅代表着永恒的爱与内在的高贵。天鹅守护神的主人外表柔和但内心刚强，他们对感情无比忠诚，愿意为爱付出一切。',
      famous: '秋·张',
      traits: ['优雅', '忠贞', '纯洁', '坚韧'],
      element: '水',
      rarity: '稀有',
      power: '强',
      lore: '天鹅终生只有一个伴侣，这种忠贞不渝的特质使它成为最浪漫的守护神之一。天鹅守护神说明主人的内心深处蕴藏着纯净而强大的爱的力量。',
    },
  ],
  free: [
    {
      name: '野马',
      nameEn: 'Wild Horse',
      emoji: '🐴',
      description: '你的守护神是野马！自由奔放、桀骜不驯的野马代表着对自由的极致追求和不屈的灵魂。野马守护神的主人天生反叛，不愿被任何规则束缚，有着最强烈的自由意志。',
      famous: '金妮·韦斯莱',
      traits: ['自由', '力量', '桀骜', '奔放'],
      element: '风',
      rarity: '较为罕见',
      power: '强',
      lore: '野马象征着未被驯服的原始力量，它们在广袤的草原上自由奔跑。金妮·韦斯莱的守护神就是母马，反映了她独立而不屈的性格。',
    },
    {
      name: '凤凰',
      nameEn: 'Phoenix',
      emoji: '🔥',
      description: '你的守护神是凤凰！涅槃重生、永不熄灭的凤凰是最强大的守护神之一。凤凰守护神的主人拥有浴火重生的力量，无论经历多少挫折都能重新站起，永远向着光明飞翔。',
      famous: '阿不思·邓布利多（伙伴福克斯）',
      traits: ['重生', '希望', '自由', '永恒'],
      element: '火与风',
      rarity: '极为罕见',
      power: '传说级',
      lore: '凤凰守护神在魔法史上几乎闻所未闻，它代表着最纯粹的希望和永不熄灭的信念。只有那些经历过最深的黑暗却仍然选择光明的人，才有可能召唤出凤凰形态的守护神。',
    },
  ],
  cunning: [
    {
      name: '狐狸',
      nameEn: 'Fox',
      emoji: '🦊',
      description: '你的守护神是狐狸！机智、敏捷、适应力极强的狐狸代表着超凡的智慧和生存能力。狐狸守护神的主人思维灵活，总能找到出路，在任何困境中都能优雅地化险为夷。',
      famous: '西莫·斐尼甘',
      traits: ['机智', '敏捷', '适应力', '独立'],
      element: '土',
      rarity: '较为常见',
      power: '中等',
      lore: '狐狸在各种文化中都被视为最聪明的动物之一。拥有狐狸守护神的巫师天生具有敏锐的直觉和灵活的应变能力，他们很少被困境难倒。',
    },
    {
      name: '猫',
      nameEn: 'Cat',
      emoji: '🐱',
      description: '你的守护神是猫！优雅、神秘、独立的猫代表着敏锐的直觉和超然的处世态度。猫守护神的主人拥有看透事物本质的能力，他们外表冷静从容，内心却时刻保持警觉。',
      famous: '米勒娃·麦格教授',
      traits: ['独立', '神秘', '优雅', '直觉'],
      element: '土',
      rarity: '较为常见',
      power: '中等偏强',
      lore: '猫在魔法世界中有着特殊的地位，它们与巫师有着天然的亲和力。麦格教授的阿尼马格斯形态就是猫，猫守护神暗示着主人拥有极其敏锐的直觉和独立自主的精神。',
    },
  ],
}

export { patronusQuestions, patronusResults }
