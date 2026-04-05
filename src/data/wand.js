// 魔杖匹配测试数据

const wandQuestions = [
  {
    id: 1,
    question: '你出生在一年中的哪个时段？',
    options: [
      { text: '春天 — 万物复苏的季节', wood: 'vine', core: 'unicorn', points: 3 },
      { text: '夏天 — 阳光灿烂的时光', wood: 'holly', core: 'phoenix', points: 3 },
      { text: '秋天 — 收获与成熟的季节', wood: 'oak', core: 'dragon', points: 3 },
      { text: '冬天 — 寂静而深沉的季节', wood: 'yew', core: 'phoenix', points: 3 },
    ]
  },
  {
    id: 2,
    question: '你更倾向于用哪只手施魔法？',
    options: [
      { text: '右手 — 代表逻辑与秩序', wood: 'oak', core: 'unicorn', points: 2 },
      { text: '左手 — 代表直觉与创造', wood: 'willow', core: 'phoenix', points: 2 },
      { text: '双手 — 我需要更多力量', wood: 'elder', core: 'dragon', points: 2 },
      { text: '不确定 — 魔杖会告诉我答案', wood: 'hawthorn', core: 'unicorn', points: 2 },
    ]
  },
  {
    id: 3,
    question: '走进奥利凡德的魔杖店，你的目光首先被什么吸引？',
    options: [
      { text: '最高架子上那根布满灰尘的古老魔杖', wood: 'elder', core: 'phoenix', points: 3 },
      { text: '柜台上那根散发温暖光泽的魔杖', wood: 'holly', core: 'unicorn', points: 3 },
      { text: '角落里那根造型独特的暗色魔杖', wood: 'yew', core: 'dragon', points: 3 },
      { text: '我会等待——正确的魔杖会自己找到我', wood: 'willow', core: 'unicorn', points: 3 },
    ]
  },
  {
    id: 4,
    question: '你最希望你的魔杖擅长哪种魔法？',
    options: [
      { text: '防御与保护魔法', wood: 'holly', core: 'unicorn', points: 3 },
      { text: '变形术和幻术', wood: 'vine', core: 'dragon', points: 3 },
      { text: '治愈与恢复魔法', wood: 'willow', core: 'unicorn', points: 3 },
      { text: '决斗与攻击魔法', wood: 'oak', core: 'dragon', points: 3 },
    ]
  },
  {
    id: 5,
    question: '如果你的魔杖有灵魂，你希望它是什么性格？',
    options: [
      { text: '忠诚且可靠，永远不会背叛我', wood: 'oak', core: 'unicorn', points: 3 },
      { text: '聪明且强大，帮我探索魔法的极限', wood: 'elder', core: 'dragon', points: 3 },
      { text: '温柔且善解人意，与我心灵相通', wood: 'willow', core: 'phoenix', points: 3 },
      { text: '桀骜不驯，但一旦认主便至死不渝', wood: 'hawthorn', core: 'phoenix', points: 3 },
    ]
  },
  {
    id: 6,
    question: '你觉得一根完美的魔杖应该有多长？',
    options: [
      { text: '短而精悍（9英寸以下）— 精准有力', wood: 'vine', core: 'dragon', points: 2 },
      { text: '适中（10-11英寸）— 平衡全面', wood: 'holly', core: 'unicorn', points: 2 },
      { text: '较长（12-13英寸）— 气势磅礴', wood: 'oak', core: 'phoenix', points: 2 },
      { text: '极长（14英寸以上）— 张扬个性', wood: 'elder', core: 'dragon', points: 2 },
    ]
  },
  {
    id: 7,
    question: '挥动魔杖的瞬间，你希望看到什么？',
    options: [
      { text: '金色的火花如同烟火般绽放', wood: 'holly', core: 'phoenix', points: 3 },
      { text: '柔和的银色光芒环绕指尖', wood: 'willow', core: 'unicorn', points: 3 },
      { text: '深红色的光弧划破空气', wood: 'yew', core: 'dragon', points: 3 },
      { text: '翠绿的光点如萤火虫般飘散', wood: 'vine', core: 'unicorn', points: 3 },
    ]
  },
  {
    id: 8,
    question: '如果魔杖可以由一种神奇生物守护，你选择？',
    options: [
      { text: '凤凰 — 涅槃重生、忠诚不渝', wood: 'holly', core: 'phoenix', points: 3 },
      { text: '独角兽 — 纯洁善良、坚定忠实', wood: 'willow', core: 'unicorn', points: 3 },
      { text: '匈牙利树蜂龙 — 强大凶猛、势不可挡', wood: 'oak', core: 'dragon', points: 3 },
      { text: '凤凰与龙的混合 — 我想要最独特的', wood: 'elder', core: 'phoenix', points: 3 },
    ]
  },
]

// 魔杖木材结果
const wandWoodResults = {
  holly: {
    name: '冬青木',
    nameEn: 'Holly',
    emoji: '🌿',
    description: '冬青木魔杖是最具保护力的魔杖之一，传统上被认为能驱除邪恶。它常常选择那些从事危险而高贵追求的巫师。冬青木与凤凰羽毛的组合尤为罕见——据奥利凡德先生说，这是一个棘手的组合。',
    trait: '守护者',
    famousOwner: '哈利·波特（11英寸，冬青木，凤凰羽毛芯）',
    symbolism: '冬青在冬天依然翠绿，象征着在黑暗中保持希望和生命力。',
  },
  oak: {
    name: '橡木',
    nameEn: 'Oak',
    emoji: '🌳',
    description: '橡木魔杖象征着力量与忠诚，它需要一位拥有勇气、忠心和强烈直觉的伙伴。橡木魔杖在自然魔法和保护魔法方面尤其出色，是一根可以信赖一生的魔杖。',
    trait: '忠诚战士',
    famousOwner: '鲁伯·海格（橡木，但已被折断藏于伞中）',
    symbolism: '橡树是森林中最强壮持久的树种，象征着不可动摇的力量和永恒的忠诚。',
  },
  willow: {
    name: '柳木',
    nameEn: 'Willow',
    emoji: '🌾',
    description: '柳木魔杖偏好有潜力但缺乏安全感的施术者，它柔韧而善于治愈。柳木魔杖最擅长非语言咒语，与拥有丰富情感和直觉的巫师最为相配。',
    trait: '治愈者',
    famousOwner: '莉莉·波特（10¼英寸，柳木，杖芯未知）',
    symbolism: '柳树虽然柔弱但韧性极强，象征着温柔中蕴含的巨大力量。',
  },
  vine: {
    name: '葡萄藤',
    nameEn: 'Vine',
    emoji: '🍇',
    description: '葡萄藤魔杖极为特殊，它会被那些追求更高目标、拥有隐藏深度的巫师吸引。这种魔杖最敏感，往往在遇到合适的主人时就会施展出魔法。',
    trait: '深邃探索者',
    famousOwner: '赫敏·格兰杰（10¾英寸，葡萄藤，龙心弦）',
    symbolism: '葡萄藤虽然纤细，但能够攀援至最高处，象征着不断向上的求知欲和深厚的内在力量。',
  },
  yew: {
    name: '紫杉木',
    nameEn: 'Yew',
    emoji: '🌲',
    description: '紫杉木魔杖有着可怕的名声，因为它与黑魔法和死亡有着古老的联系。但实际上，紫杉木选择的是真正非凡的巫师——那些拥有保护他人或征服死亡的强大能力的人。',
    trait: '命运之手',
    famousOwner: '伏地魔（13½英寸，紫杉木，凤凰羽毛芯）',
    symbolism: '紫杉木是寿命最长的树种之一，既象征死亡也象征永生，持有者往往面临非凡的命运。',
  },
  elder: {
    name: '接骨木',
    nameEn: 'Elder',
    emoji: '⚡',
    description: '接骨木是最稀有、最难驾驭的魔杖木材。它只尊重一种巫师：注定非凡的人。接骨木魔杖的持有者必须比周围的人都要优秀，否则魔杖宁愿被夺走也不愿效忠。',
    trait: '传奇',
    famousOwner: '阿不思·邓布利多（老魔杖 / 死亡圣器之一）',
    symbolism: '接骨木在巫师世界拥有最神秘的传说，它是三件死亡圣器之一，象征着至高无上的魔法力量。',
  },
  hawthorn: {
    name: '山楂木',
    nameEn: 'Hawthorn',
    emoji: '🌸',
    description: '山楂木魔杖最为矛盾——它既适合治愈术，也与诅咒有天然的亲和力。山楂木选择的巫师往往内心复杂，正经历或即将经历重大的内心转变。',
    trait: '矛盾体',
    famousOwner: '德拉科·马尔福（10英寸，山楂木，独角兽毛）',
    symbolism: '山楂树春天开满美丽的花，但枝上长满尖锐的刺，完美象征着复杂而矛盾的灵魂。',
  },
}

// 杖芯结果
const wandCoreResults = {
  phoenix: {
    name: '凤凰羽毛',
    nameEn: 'Phoenix Feather',
    emoji: '🪶',
    description: '凤凰羽毛是最稀有的杖芯材料，能施展最广泛的魔法。它拥有极大的主动性，有时会不经主人允许就施展魔法。凤凰羽毛杖芯最难被驯服，选择主人最为挑剔。',
    trait: '多才多艺',
    power: '最广泛的魔法范围',
    weakness: '忠诚度需要通过考验才能建立',
  },
  unicorn: {
    name: '独角兽毛',
    nameEn: 'Unicorn Hair',
    emoji: '🦄',
    description: '独角兽毛是最忠诚的杖芯材料，施咒稳定且持续有力。它不太容易倒向黑魔法，对第一任主人最为忠诚。虽然不是最强大的杖芯，但最为可靠。',
    trait: '忠诚稳定',
    power: '最稳定的魔法输出',
    weakness: '在黑魔法方面较为薄弱',
  },
  dragon: {
    name: '龙心弦',
    nameEn: 'Dragon Heartstring',
    emoji: '💛',
    description: '龙心弦是最强大的杖芯材料，学习速度快，魔法威力十足。它最容易与新主人形成纽带，但也最容易将忠诚转移到新的征服者手中。',
    trait: '强大凶猛',
    power: '最强大的原始威力',
    weakness: '最容易意外施咒，忠诚度波动较大',
  },
}

// 魔杖长度描述
const wandLengths = {
  short: { range: '9-10英寸', desc: '精巧而精确', trait: '偏好魔咒和精细魔法' },
  medium: { range: '10½-11½英寸', desc: '均衡而全面', trait: '适合各种魔法风格' },
  long: { range: '12-13英寸', desc: '气势磅礴', trait: '擅长变形术和高级魔法' },
  extra: { range: '13½-15英寸', desc: '非凡而张扬', trait: '适合戏剧性的魔法和大范围施术' },
}

export { wandQuestions, wandWoodResults, wandCoreResults, wandLengths }
