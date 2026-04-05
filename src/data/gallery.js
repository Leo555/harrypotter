// 人物剧照画廊数据
// 由于版权原因，使用渐变色+人物场景描述作为视觉化替代方案
// 每张「剧照」包含场景描述、出处电影、角色造型等关键信息

const characterGallery = {
  'harry-potter': {
    photos: [
      { id: 1, scene: '11岁的哈利第一次踏入对角巷', movie: '魔法石', year: 2001, mood: '惊奇', colors: ['#1a1a2e', '#e94560'] },
      { id: 2, scene: '骑着火弩箭追逐金色飞贼', movie: '阿兹卡班囚徒', year: 2004, mood: '自由', colors: ['#0f3460', '#53c7f0'] },
      { id: 3, scene: '在禁林中面对伏地魔', movie: '魔法石', year: 2001, mood: '勇气', colors: ['#1a1a2e', '#4a0e4e'] },
      { id: 4, scene: '水下营救罗恩（三强争霸赛第二项任务）', movie: '火焰杯', year: 2005, mood: '决心', colors: ['#0c2461', '#4834d4'] },
      { id: 5, scene: '在墓地与伏地魔魔杖对决', movie: '火焰杯', year: 2005, mood: '悲壮', colors: ['#2d3436', '#d63031'] },
      { id: 6, scene: '教授DA成员使用守护神咒', movie: '凤凰社', year: 2007, mood: '领导', colors: ['#0c2461', '#6c5ce7'] },
      { id: 7, scene: '目睹邓布利多在天文塔坠落', movie: '混血王子', year: 2009, mood: '悲痛', colors: ['#2d3436', '#636e72'] },
      { id: 8, scene: '在禁林中使用复活石召唤亲人', movie: '死亡圣器(下)', year: 2011, mood: '释然', colors: ['#0f3460', '#ffd700'] },
      { id: 9, scene: '与伏地魔在霍格沃茨的最终对决', movie: '死亡圣器(下)', year: 2011, mood: '终章', colors: ['#d63031', '#ffd700'] },
      { id: 10, scene: '19年后在九又四分之三站台送儿子上学', movie: '死亡圣器(下)', year: 2011, mood: '温暖', colors: ['#e17055', '#ffeaa7'] },
    ]
  },
  'hermione-granger': {
    photos: [
      { id: 1, scene: '在霍格沃茨特快列车上第一次施咒修好眼镜', movie: '魔法石', year: 2001, mood: '自信', colors: ['#6c5ce7', '#a29bfe'] },
      { id: 2, scene: '举手回答问题的经典课堂形象', movie: '魔法石', year: 2001, mood: '好学', colors: ['#740001', '#ffeaa7'] },
      { id: 3, scene: '圣诞舞会上穿着粉色长裙惊艳全场', movie: '火焰杯', year: 2005, mood: '美丽', colors: ['#fd79a8', '#ffeaa7'] },
      { id: 4, scene: '在神秘事务司之战中英勇战斗', movie: '凤凰社', year: 2007, mood: '勇敢', colors: ['#2d3436', '#e17055'] },
      { id: 5, scene: '修改父母的记忆以保护他们', movie: '死亡圣器(上)', year: 2010, mood: '心碎', colors: ['#636e72', '#74b9ff'] },
      { id: 6, scene: '在马尔福庄园被贝拉特里克斯审讯', movie: '死亡圣器(上)', year: 2010, mood: '坚韧', colors: ['#2d3436', '#d63031'] },
      { id: 7, scene: '骑龙逃离古灵阁金库', movie: '死亡圣器(下)', year: 2011, mood: '刺激', colors: ['#e17055', '#ffd700'] },
      { id: 8, scene: '在霍格沃茨大战中与罗恩并肩作战', movie: '死亡圣器(下)', year: 2011, mood: '坚定', colors: ['#740001', '#d63031'] },
    ]
  },
  'ron-weasley': {
    photos: [
      { id: 1, scene: '在霍格沃茨特快列车上与哈利分享食物', movie: '魔法石', year: 2001, mood: '友谊', colors: ['#e17055', '#ffeaa7'] },
      { id: 2, scene: '骑巨型棋子指挥巫师棋', movie: '魔法石', year: 2001, mood: '勇气', colors: ['#2d3436', '#dfe6e9'] },
      { id: 3, scene: '吐蛞蝓的经典名场面', movie: '密室', year: 2002, mood: '搞笑', colors: ['#55efc4', '#00b894'] },
      { id: 4, scene: '身穿可笑的礼服长袍参加圣诞舞会', movie: '火焰杯', year: 2005, mood: '尴尬', colors: ['#636e72', '#b2bec3'] },
      { id: 5, scene: '作为守门员在魁地奇赛场上', movie: '混血王子', year: 2009, mood: '紧张', colors: ['#740001', '#ffd700'] },
      { id: 6, scene: '用格兰芬多之剑摧毁挂坠盒魂器', movie: '死亡圣器(上)', year: 2010, mood: '勇敢', colors: ['#0c2461', '#00cec9'] },
    ]
  },
  'albus-dumbledore': {
    photos: [
      { id: 1, scene: '在霍格沃茨大厅发表欢迎致辞', movie: '魔法石', year: 2001, mood: '智慧', colors: ['#6c5ce7', '#ffd700'] },
      { id: 2, scene: '在厄里斯魔镜前与哈利对话', movie: '魔法石', year: 2001, mood: '深邃', colors: ['#0f3460', '#a29bfe'] },
      { id: 3, scene: '用冥想盆回顾记忆', movie: '火焰杯', year: 2005, mood: '沉思', colors: ['#a29bfe', '#dfe6e9'] },
      { id: 4, scene: '在魔法部大厅与伏地魔决斗', movie: '凤凰社', year: 2007, mood: '威严', colors: ['#6c5ce7', '#d63031'] },
      { id: 5, scene: '在洞穴中喝下翠绿色药水', movie: '混血王子', year: 2009, mood: '痛苦', colors: ['#00b894', '#2d3436'] },
      { id: 6, scene: '在天文塔上最后的时刻', movie: '混血王子', year: 2009, mood: '悲壮', colors: ['#2d3436', '#ffd700'] },
      { id: 7, scene: '在国王十字车站的纯白空间与哈利对话', movie: '死亡圣器(下)', year: 2011, mood: '超脱', colors: ['#dfe6e9', '#ffeaa7'] },
    ]
  },
  'severus-snape': {
    photos: [
      { id: 1, scene: '在魔药课上严厉审视学生', movie: '魔法石', year: 2001, mood: '冷峻', colors: ['#2d3436', '#636e72'] },
      { id: 2, scene: '在黑魔法防御术课堂上演示', movie: '混血王子', year: 2009, mood: '威严', colors: ['#2d3436', '#0c2461'] },
      { id: 3, scene: '用魔杖对准邓布利多——天文塔上的抉择', movie: '混血王子', year: 2009, mood: '痛苦', colors: ['#2d3436', '#00b894'] },
      { id: 4, scene: '在临死前将记忆交给哈利', movie: '死亡圣器(下)', year: 2011, mood: '释然', colors: ['#636e72', '#74b9ff'] },
      { id: 5, scene: '"看着我……你和你母亲有一样的眼睛"', movie: '死亡圣器(下)', year: 2011, mood: '深情', colors: ['#2d3436', '#00b894'] },
      { id: 6, scene: '冥想盆中年轻的斯内普与莉莉在一起', movie: '死亡圣器(下)', year: 2011, mood: '温柔', colors: ['#55efc4', '#ffeaa7'] },
    ]
  },
  'ginny-weasley': {
    photos: [
      { id: 1, scene: '在密室中被汤姆·里德尔附体', movie: '密室', year: 2002, mood: '恐惧', colors: ['#2d3436', '#d63031'] },
      { id: 2, scene: '在魁地奇球场上作为追球手飞驰', movie: '混血王子', year: 2009, mood: '英姿', colors: ['#740001', '#e17055'] },
      { id: 3, scene: '在有求必应室中与哈利接吻', movie: '混血王子', year: 2009, mood: '甜蜜', colors: ['#e17055', '#ffeaa7'] },
      { id: 4, scene: '在霍格沃茨大战中英勇战斗', movie: '死亡圣器(下)', year: 2011, mood: '勇气', colors: ['#d63031', '#ffd700'] },
    ]
  },
  'sirius-black': {
    photos: [
      { id: 1, scene: '通缉令上的阿兹卡班囚犯形象', movie: '阿兹卡班囚徒', year: 2004, mood: '阴暗', colors: ['#2d3436', '#636e72'] },
      { id: 2, scene: '以大黑狗（大脚板）形态在街头', movie: '阿兹卡班囚徒', year: 2004, mood: '自由', colors: ['#2d3436', '#0f3460'] },
      { id: 3, scene: '在格里莫广场12号与哈利交谈', movie: '凤凰社', year: 2007, mood: '温暖', colors: ['#636e72', '#ffeaa7'] },
      { id: 4, scene: '在神秘事务司与贝拉特里克斯决斗', movie: '凤凰社', year: 2007, mood: '激战', colors: ['#6c5ce7', '#d63031'] },
      { id: 5, scene: '坠入帷幕的最后一刻', movie: '凤凰社', year: 2007, mood: '永别', colors: ['#2d3436', '#a29bfe'] },
    ]
  },
  'draco-malfoy': {
    photos: [
      { id: 1, scene: '在对角巷初遇哈利的傲慢姿态', movie: '魔法石', year: 2001, mood: '傲慢', colors: ['#1a472a', '#dfe6e9'] },
      { id: 2, scene: '作为找球手在魁地奇比赛中', movie: '密室', year: 2002, mood: '竞争', colors: ['#1a472a', '#b2bec3'] },
      { id: 3, scene: '六年级在有求必应室修理消失柜', movie: '混血王子', year: 2009, mood: '焦虑', colors: ['#2d3436', '#636e72'] },
      { id: 4, scene: '在天文塔上无法对邓布利多施索命咒', movie: '混血王子', year: 2009, mood: '挣扎', colors: ['#2d3436', '#ffd700'] },
      { id: 5, scene: '不愿辨认被毁容的哈利', movie: '死亡圣器(上)', year: 2010, mood: '犹豫', colors: ['#636e72', '#74b9ff'] },
    ]
  },
  'luna-lovegood': {
    photos: [
      { id: 1, scene: '戴着指向性眼镜阅读《唱唱反调》', movie: '凤凰社', year: 2007, mood: '梦幻', colors: ['#74b9ff', '#ffeaa7'] },
      { id: 2, scene: '在DA训练中施展守护神（野兔）', movie: '凤凰社', year: 2007, mood: '灵动', colors: ['#a29bfe', '#dfe6e9'] },
      { id: 3, scene: '戴着狮子帽为格兰芬多加油', movie: '混血王子', year: 2009, mood: '古怪', colors: ['#fdcb6e', '#e17055'] },
      { id: 4, scene: '在马尔福庄园地牢中安慰同伴', movie: '死亡圣器(上)', year: 2010, mood: '坚强', colors: ['#636e72', '#74b9ff'] },
    ]
  },
  'minerva-mcgonagall': {
    photos: [
      { id: 1, scene: '变形为猫坐在女贞路等待邓布利多', movie: '魔法石', year: 2001, mood: '严谨', colors: ['#1a472a', '#636e72'] },
      { id: 2, scene: '在变形术课上演示茶杯变白鼠', movie: '魔法石', year: 2001, mood: '专业', colors: ['#0e1a40', '#b2bec3'] },
      { id: 3, scene: '说出"我一直想用那个咒语"召唤石甲兵', movie: '死亡圣器(下)', year: 2011, mood: '兴奋', colors: ['#636e72', '#ffd700'] },
      { id: 4, scene: '指挥霍格沃茨防御力量', movie: '死亡圣器(下)', year: 2011, mood: '威严', colors: ['#0e1a40', '#d63031'] },
    ]
  },
  'voldemort': {
    photos: [
      { id: 1, scene: '寄生于奇洛教授后脑的恐怖面容', movie: '魔法石', year: 2001, mood: '恐怖', colors: ['#2d3436', '#636e72'] },
      { id: 2, scene: '年少时期的汤姆·里德尔（日记记忆中）', movie: '密室', year: 2002, mood: '伪善', colors: ['#1a472a', '#b2bec3'] },
      { id: 3, scene: '在墓地中重获肉身', movie: '火焰杯', year: 2005, mood: '邪恶', colors: ['#2d3436', '#d63031'] },
      { id: 4, scene: '在魔法部大厅与邓布利多决斗', movie: '凤凰社', year: 2007, mood: '疯狂', colors: ['#d63031', '#6c5ce7'] },
      { id: 5, scene: '获取老魔杖的瞬间', movie: '死亡圣器(上)', year: 2010, mood: '贪婪', colors: ['#2d3436', '#ffd700'] },
      { id: 6, scene: '在霍格沃茨大战中与哈利最终对决', movie: '死亡圣器(下)', year: 2011, mood: '终结', colors: ['#d63031', '#ffd700'] },
    ]
  },
  'neville-longbottom': {
    photos: [
      { id: 1, scene: '被全身束缚咒定住后勇敢站出来', movie: '魔法石', year: 2001, mood: '勇气', colors: ['#740001', '#ffeaa7'] },
      { id: 2, scene: '面对博格特（斯内普穿外婆衣服）', movie: '阿兹卡班囚徒', year: 2004, mood: '搞笑', colors: ['#55efc4', '#ffeaa7'] },
      { id: 3, scene: '在DA训练中进步神速', movie: '凤凰社', year: 2007, mood: '成长', colors: ['#740001', '#6c5ce7'] },
      { id: 4, scene: '手持格兰芬多之剑斩杀蛇妖娜吉尼', movie: '死亡圣器(下)', year: 2011, mood: '英雄', colors: ['#d63031', '#ffd700'] },
    ]
  },
  'rubeus-hagrid': {
    photos: [
      { id: 1, scene: '骑着飞行摩托车送婴儿哈利到德思礼家', movie: '魔法石', year: 2001, mood: '使命', colors: ['#2d3436', '#636e72'] },
      { id: 2, scene: '在海上小屋给哈利送生日蛋糕', movie: '魔法石', year: 2001, mood: '温暖', colors: ['#e17055', '#ffeaa7'] },
      { id: 3, scene: '照看刚孵化的龙宝宝诺伯特', movie: '魔法石', year: 2001, mood: '慈爱', colors: ['#e17055', '#d63031'] },
      { id: 4, scene: '抱着"死去"的哈利走出禁林', movie: '死亡圣器(下)', year: 2011, mood: '悲痛', colors: ['#2d3436', '#636e72'] },
    ]
  },
  'remus-lupin': {
    photos: [
      { id: 1, scene: '在霍格沃茨特快列车上驱赶摄魂怪', movie: '阿兹卡班囚徒', year: 2004, mood: '守护', colors: ['#0f3460', '#dfe6e9'] },
      { id: 2, scene: '教哈利施展守护神咒', movie: '阿兹卡班囚徒', year: 2004, mood: '耐心', colors: ['#6c5ce7', '#ffd700'] },
      { id: 3, scene: '在满月下变身为狼人', movie: '阿兹卡班囚徒', year: 2004, mood: '痛苦', colors: ['#636e72', '#b2bec3'] },
    ]
  },
  'dobby': {
    photos: [
      { id: 1, scene: '第一次出现在哈利卧室', movie: '密室', year: 2002, mood: '紧张', colors: ['#b2bec3', '#dfe6e9'] },
      { id: 2, scene: '接住哈利扔出的袜子获得自由', movie: '密室', year: 2002, mood: '狂喜', colors: ['#ffeaa7', '#ffd700'] },
      { id: 3, scene: '穿着各种不搭配的袜子在厨房工作', movie: '火焰杯', year: 2005, mood: '快乐', colors: ['#55efc4', '#fdcb6e'] },
      { id: 4, scene: '在贝壳小屋花园中最后的告别', movie: '死亡圣器(上)', year: 2010, mood: '永别', colors: ['#74b9ff', '#dfe6e9'] },
    ]
  },
  'bellatrix-lestrange': {
    photos: [
      { id: 1, scene: '从阿兹卡班越狱后的癫狂形象', movie: '凤凰社', year: 2007, mood: '疯狂', colors: ['#2d3436', '#d63031'] },
      { id: 2, scene: '在神秘事务司杀死小天狼星后的嘲笑', movie: '凤凰社', year: 2007, mood: '残忍', colors: ['#d63031', '#636e72'] },
      { id: 3, scene: '在马尔福庄园拷问赫敏', movie: '死亡圣器(上)', year: 2010, mood: '邪恶', colors: ['#2d3436', '#636e72'] },
    ]
  },
  'fred-george-weasley': {
    photos: [
      { id: 1, scene: '骑着扫帚飞出霍格沃茨对抗乌姆里奇', movie: '凤凰社', year: 2007, mood: '自由', colors: ['#e17055', '#ffd700'] },
      { id: 2, scene: '在韦斯莱魔法把戏坊里展示发明', movie: '混血王子', year: 2009, mood: '欢乐', colors: ['#e17055', '#fdcb6e'] },
      { id: 3, scene: '在霍格沃茨释放烟花对抗乌姆里奇', movie: '凤凰社', year: 2007, mood: '壮观', colors: ['#d63031', '#ffd700'] },
    ]
  },
}

export default characterGallery
