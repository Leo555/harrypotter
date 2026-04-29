// 魔法物品百科数据
// 物品图片映射（文件位于 src/assets/magic-items/）
function getItemImage(id) {
  return id ? `/images/magic-items/${id}.webp` : null
}

const magicItems = [
  { 
    emoji: '📔', 
    name: '汤姆·里德尔的日记', 
    id: 'tom-riddle',
    nameEn: "Tom Riddle's Diary", 
    image: getItemImage('tom-riddles-diary'),
    type: '魂器', 
    desc: '伏地魔创造的第一个魂器，记录着年少时代的里德尔。日记中潜藏着16岁汤姆·里德尔的灵魂碎片，它曾控制金妮·韦斯莱打开密室释放蛇怪。哈利在密室中用蛇怪的毒牙将其刺穿摧毁——这是第一个被摧毁的魂器。', 
    destroyed: '蛇怪毒牙（哈利·波特）' 
  },
  { 
    emoji: '💍', 
    name: '马沃罗·冈特的戒指', 
    id: 'marvolo-gaunt',
    nameEn: "Marvolo Gaunt's Ring", 
    image: getItemImage('gaunts-ring'),
    type: '魂器/圣器', 
    desc: '冈特家族的传家宝，镶有佩弗利尔家族的标记（实为复活石）。伏地魔杀害父亲后将其制成魂器。邓布利多在冈特旧宅找到并用格兰芬多之剑摧毁它，但戒指上的致命诅咒使他的手变黑枯萎，只剩一年寿命。', 
    destroyed: '格兰芬多之剑（邓布利多）' 
  },
  { 
    emoji: '🏆', 
    name: '赫奇帕奇的金杯', 
    id: 'hufflepuff',
    nameEn: "Hufflepuff's Cup", 
    image: getItemImage('hufflepuffs-cup'),
    type: '魂器', 
    desc: '赫尔加·赫奇帕奇的遗物，一个小型金杯，具有特殊魔法属性。伏地魔杀害赫普兹巴·史密斯后偷走了它，存放在贝拉特里克斯·莱斯特兰奇在古灵阁的高安全等级金库中。', 
    destroyed: '蛇怪毒牙（赫敏·格兰杰）' 
  },
  { 
    emoji: '👑', 
    name: '拉文克劳的冠冕', 
    id: 'ravenclaw',
    nameEn: "Ravenclaw's Diadem", 
    image: getItemImage('ravenclaws-diadem'),
    type: '魂器', 
    desc: '罗伊纳·拉文克劳的冠冕，据说能增强佩戴者的智慧，上面刻着"超凡的智慧是人类最大的财富"。失踪数百年后被伏地魔找到并制成魂器，藏于霍格沃茨有求必应室。', 
    destroyed: '厉火（文森特·克拉布意外释放）' 
  },
  { 
    emoji: '🐍', 
    name: '斯莱特林的挂坠盒', 
    id: 'slytherin',
    nameEn: "Slytherin's Locket", 
    image: getItemImage('slytherins-locket'),
    type: '魂器', 
    desc: '萨拉查·斯莱特林的遗物。R.A.B（雷古勒斯·布莱克）牺牲自己从洞穴中取出并替换了假货。真正的挂坠盒辗转到了蒙顿格斯手中，后被乌姆里奇获得。三人组潜入魔法部将其取回，罗恩用格兰芬多之剑将其摧毁。', 
    destroyed: '格兰芬多之剑（罗恩·韦斯莱）' 
  },
  { 
    emoji: '⚡', 
    name: '哈利·波特（活魂器）', 
    id: 'harry-potter-living-horcrux',
    nameEn: 'Harry Potter (Living Horcrux)', 
    image: getItemImage('harry-living-horcrux'),
    type: '魂器', 
    desc: '伏地魔无意中创造的第七个魂器。1981年当索命咒反弹时，伏地魔不稳定的灵魂碎片嵌入了婴儿哈利体内。这赋予了哈利蛇佬腔能力和与伏地魔的精神连接。哈利在禁林中坦然赴死，伏地魔的索命咒只摧毁了魂器碎片。', 
    destroyed: '阿瓦达索命咒（伏地魔本人，误杀自己的魂器）' 
  },
  { 
    emoji: '🐍', 
    name: '娜吉尼', 
    id: 'nagini',
    nameEn: 'Nagini', 
    image: getItemImage('nagini'),
    type: '魂器', 
    desc: '伏地魔的蛇宠和最后一个有意创造的魂器。娜吉尼实际上是一个被血咒诅咒、永久变成蛇的女人（马尔迪克图斯）。她执行了伏地魔的多个命令，包括杀害斯内普。', 
    destroyed: '格兰芬多之剑（纳威·隆巴顿）' 
  },
  { 
    emoji: '🪄', 
    name: '老魔杖（接骨木魔杖）', 
    id: 'the-elder-wand',
    nameEn: 'The Elder Wand', 
    image: getItemImage('elder-wand'),
    type: '死亡圣器', 
    desc: '三件死亡圣器中最强大的一件，据说由死亡本身所造。这根魔杖的忠诚只属于打败其前任主人的巫师。从安提俄克·佩弗利尔到格林德沃到邓布利多，直到德拉科缴了邓布利多的械，再到哈利缴了德拉科的械——最终老魔杖效忠于哈利。', 
    destroyed: null 
  },
  { 
    emoji: '🧥', 
    name: '隐形衣', 
    id: 'cloak-of-invisibility',
    nameEn: 'Cloak of Invisibility', 
    image: getItemImage('invisibility-cloak'),
    type: '死亡圣器', 
    desc: '三件死亡圣器之一，由最小的佩弗利尔兄弟伊格诺图斯获得，此后在波特家族世代相传。与普通隐形衣不同，它永不褪色、永不失效，甚至连死亡都无法透过它。邓布利多曾借用研究后归还给哈利。', 
    destroyed: null 
  },
  { 
    emoji: '💎', 
    name: '复活石', 
    id: 'resurrection-stone',
    nameEn: 'Resurrection Stone', 
    image: getItemImage('resurrection-stone'),
    type: '死亡圣器', 
    desc: '三件死亡圣器之一，能召唤已逝之人的灵魂影像（非真正复活）。它被镶在冈特戒指中，后被邓布利多取出。哈利在走向禁林面对伏地魔时转动复活石，见到了父母、小天狼星和卢平的灵魂陪伴他走完最后的路。', 
    destroyed: null 
  },
  { 
    emoji: '🗺️', 
    name: '活点地图', 
    id: 'marauder',
    nameEn: "Marauder's Map", 
    image: getItemImage('marauders-map'),
    type: '魔法道具', 
    desc: '由掠夺者（尖头叉子詹姆、大脚板小天狼星、月亮脸卢平、虫尾巴彼得）在学生时代创造。激活咒语"我庄严宣誓我绝不干好事"，关闭咒语"恶作剧完成"。能实时显示霍格沃茨内所有人的位置，无论其使用隐形衣还是复方汤剂。', 
    destroyed: null 
  },
  { 
    emoji: '⏰', 
    name: '时间转换器', 
    id: 'time-turner',
    nameEn: 'Time-Turner', 
    image: getItemImage('time-turner'),
    type: '魔法道具', 
    desc: '沙漏形魔法装置，每转一圈可以回到一小时前。赫敏在三年级获得许可使用它来上额外课程，后来用它帮助拯救了小天狼星和巴克比克。魔法部神秘事务司存有大量时间转换器，在五年级的战斗中全部被毁。', 
    destroyed: null 
  },
  { 
    emoji: '🪞', 
    name: '厄里斯魔镜', 
    id: 'mirror-of-erised',
    nameEn: 'Mirror of Erised', 
    image: getItemImage('mirror-of-erised'),
    type: '魔法道具', 
    desc: '能显示观看者内心最深切渴望的魔镜。镜框上刻着"Erised stra ehru oyt ube cafru oyt on wohsi"（倒写的"I show not your face but your heart\'s desire"）。邓布利多在镜中看到自己的家人团聚，哈利看到了父母。', 
    destroyed: null 
  },
  { 
    emoji: '🗡️', 
    name: '格兰芬多之剑', 
    id: 'sword-of-gryffindor',
    nameEn: 'Sword of Gryffindor', 
    image: getItemImage('sword-of-gryffindor'),
    type: '传奇物品', 
    desc: '由妖精工匠格里菲克用精灵银打造，它会在真正的格兰芬多人有需要时出现。剑会吸收让它变强的物质——哈利用它杀死蛇怪后，剑浸透了蛇怪毒液，因此能够摧毁魂器。它先后被哈利、邓布利多、罗恩和纳威使用。', 
    destroyed: null 
  },
  { 
    emoji: '🧹', 
    name: '火弩箭', 
    id: 'firebolt',
    nameEn: 'Firebolt', 
    image: getItemImage('firebolt'),
    type: '魔法道具', 
    desc: '世界上最快的竞赛飞天扫帚，10秒内可加速到150英里/小时。由小天狼星作为圣诞礼物匿名送给哈利。曾被麦格教授没收检查是否被施了恶咒（让哈利和赫敏产生了短暂的矛盾）。在"七个波特"行动中被毁。', 
    destroyed: null 
  },
  { 
    emoji: '📻', 
    name: '波特守望', 
    id: 'potterwatch',
    nameEn: 'Potterwatch', 
    image: getItemImage('potterwatch'),
    type: '魔法道具', 
    desc: '第二次巫师战争期间由凤凰社成员运营的秘密广播节目。使用密码才能收听（如"疯眼汉"），由李·乔丹主持，弗雷德和乔治参与。节目为躲藏中的人提供真实的战争消息、失踪者名单和鼓舞士气的信息——在预言家日报被控制的黑暗时期，它是人们获得真相的唯一渠道。', 
    destroyed: null 
  },
  { 
    emoji: '🔮', 
    name: '预言球', 
    id: 'prophecy-orb',
    nameEn: 'Prophecy Orb', 
    image: getItemImage('prophecy-orb'),
    type: '魔法道具', 
    desc: '魔法部神秘事务司预言厅中保存的水晶球，记录了有关哈利和伏地魔的完整预言。只有预言涉及的当事人才能安全地取下它。伏地魔为了得到完整预言而引诱哈利前往神秘事务司，导致了那场改变了一切的战斗。预言球在混战中被打碎。', 
    destroyed: '在神秘事务司之战中被打碎' 
  },
  { 
    emoji: '📜', 
    name: '韦斯莱魔法把戏坊发明', 
    id: 'weasleys',
    nameEn: "Weasleys' Wizard Wheezes Products", 
    image: getItemImage('weasleys-products'),
    type: '魔法道具', 
    desc: '弗雷德和乔治·韦斯莱发明的一系列恶作剧和防护道具。速效翘课糖（流鼻血太妃糖、发烧软糖等）可以让学生快速"生病"翘课；伸缩耳用于偷听远处的对话；便携沼泽可以在任何地方制造一片真正的沼泽。战时他们还研发了盾帽和隐形斗篷等防护装备。', 
    destroyed: null 
  },
  { 
    emoji: '🪙', 
    name: 'DA联络金币', 
    id: 'dumbledore',
    nameEn: "Dumbledore's Army Coins", 
    image: getItemImage('da-coins'),
    type: '魔法道具', 
    desc: '赫敏制作的联络金币，外观与普通金加隆完全相同，但边缘的数字会随着哈利的信号而变化发热。这是赫敏将变形咒应用于实物通讯的天才发明——灵感来自伏地魔的黑魔标记。DA的所有成员人手一枚，用于通知集会时间和地点。纳威在七年级用它召集DA成员参与霍格沃茨大战。', 
    destroyed: null 
  },
  { 
    emoji: '🏆', 
    name: '三强争霸赛杯', 
    id: 'triwizard-cup',
    nameEn: 'Triwizard Cup', 
    image: getItemImage('triwizard-cup'),
    type: '魔法道具', 
    desc: '三强争霸赛的最终奖杯，在第三项任务——迷宫中等待最先到达的选手。然而在1994年的比赛中，冒牌穆迪（克劳奇二世）将奖杯变成了门钥匙，将同时触碰到奖杯的哈利和塞德里克传送到小汉格顿墓地。塞德里克被虫尾巴杀害，伏地魔在这里重获肉体。', 
    destroyed: null 
  },
  { 
    emoji: '💌', 
    name: '吼叫信', 
    id: 'howler',
    nameEn: 'Howler', 
    image: getItemImage('howler'),
    type: '魔法道具', 
    desc: '一种特殊的巫师邮件，如果不及时打开会自动爆炸。打开后会以发信人的声音（放大数十倍）大声怒吼其中的内容。莫丽·韦斯莱在罗恩和哈利飞车去学校后寄了一封经典的吼叫信，在大厅里当着所有人的面怒吼，让罗恩恨不得钻到地缝里。', 
    destroyed: null 
  },
  { 
    emoji: '🫙', 
    name: '冥想盆', 
    id: 'pensieve',
    nameEn: 'Pensieve', 
    image: getItemImage('pensieve'),
    type: '魔法道具', 
    desc: '一个浅石盆，内含银色液体，可以储存和回顾记忆。将魔杖抵在太阳穴抽出银色丝状记忆放入盆中，然后可以进入记忆中身临其境地观看。邓布利多的冥想盆是他最重要的工具之一——哈利通过它了解了伏地魔的过去、斯内普的真相和关于魂器的关键情报。斯内普临终时将记忆交给哈利，正是通过冥想盆揭示了一切。', 
    destroyed: null 
  },
  { 
    emoji: '🔥', 
    name: '飞路粉', 
    id: 'floo-powder',
    nameEn: 'Floo Powder', 
    image: getItemImage('floo-powder'),
    type: '魔法道具', 
    desc: '一种闪闪发光的银色粉末，投入壁炉火焰中后可以实现瞬间传送（飞路网络）或头部通讯（只把头伸入火焰中与另一个壁炉对话）。使用时必须清晰地说出目的地名称——哈利第一次使用时把"对角巷"说成了"对角巷"的模糊发音，结果误入了翻倒巷的博金-博克店。小天狼星也通过飞路网络与哈利通讯。', 
    destroyed: null 
  },
  { 
    emoji: '🕰️', 
    name: '韦斯莱家的魔法钟', 
    id: 'weasley-clock',
    nameEn: 'Weasley Clock', 
    image: getItemImage('weasley-clock'),
    type: '魔法道具', 
    desc: '陋居中一面特殊的大钟，九根指针分别代表韦斯莱一家九口人。指针不是指向时间，而是指向家人的状态——"家中"、"上学"、"上班"、"旅途中"、"迷路"、"医院"、"监狱"，以及在战争时期经常指向的"性命垂危"。第二次巫师战争期间，所有指针都长期指向"性命垂危"。', 
    destroyed: null 
  },
  { 
    emoji: '📗', 
    name: '怪兽之书', 
    id: 'the-monster-book-of-monsters',
    nameEn: 'The Monster Book of Monsters', 
    image: getItemImage('monster-book'),
    type: '魔法道具', 
    desc: '海格为三年级奇兽饲育学选用的教材——一本会咬人的书。这本书有牙齿，如果不知道抚摸书脊来安抚它，它会疯狂地咬人和四处逃窜。对角巷丽痕书店的店员因为此书被咬得遍体鳞伤，不得不戴上厚手套才敢靠近。', 
    destroyed: null 
  },
  { 
    emoji: '🔴', 
    name: '记忆球', 
    id: 'remembrall',
    nameEn: 'Remembrall', 
    image: getItemImage('remembrall'),
    type: '魔法道具', 
    desc: '一个水晶球大小的玻璃球，内含白烟。当持有者忘记了某件事时，球内的烟雾会变成红色。纳威的祖母在一年级送了他一个，烟雾立刻变红——但纳威完全想不起自己忘了什么（其实是忘了穿长袍）。马尔福抢走记忆球，哈利飞上空中追回，被麦格教授看到后反而成为了格兰芬多魁地奇队的找球手。', 
    destroyed: null 
  },
  { 
    emoji: '🪙', 
    name: '妖精银', 
    id: 'goblin-silver',
    nameEn: 'Goblin Silver', 
    image: getItemImage('goblin-silver'),
    type: '传奇物品', 
    desc: '妖精工匠锻造的最珍贵金属——只吸收能让它变强的物质。格兰芬多之剑就是由妖精银制成的。妖精对金属制品有独特的观念：他们认为制造者才是物品的真正主人，出售给巫师的物品在买家死后应归还给妖精。这种观念差异造成了巫师与妖精之间持续数世纪的紧张关系。', 
    destroyed: null 
  },
  { 
    emoji: '👜', 
    name: '赫敏的串珠手包', 
    id: 'hermione',
    nameEn: "Hermione's Beaded Bag", 
    image: getItemImage('hermiones-bag'),
    type: '魔法道具', 
    desc: '赫敏用无痕伸展咒对一个小巧的串珠手包施咒，使其内部空间远大于外表。她在逃亡前将帐篷、衣服、书籍、魔药材料、复方汤剂等所有必需品装入其中。这个小手包成为了三人组在长达数月的流亡生活中的生命线——没有它，寻找和摧毁魂器的任务根本无法完成。', 
    destroyed: null 
  },
  { 
    emoji: '🧹', 
    name: '光轮2000', 
    id: 'nimbus-2000',
    nameEn: 'Nimbus 2000', 
    image: getItemImage('nimbus-2000'),
    type: '魔法道具', 
    desc: '哈利在霍格沃茨的第一把飞天扫帚，由麦格教授在一年级破格赠予（为了让他成为格兰芬多魁地奇队的找球手）。这在当时是最先进的竞赛扫帚——时速可达100英里。哈利骑着它赢得了多场魁地奇比赛。三年级时它在与赫奇帕奇的比赛中被打人柳砸成碎片。', 
    destroyed: '打人柳' 
  },
  { 
    emoji: '🚗', 
    name: '韦斯莱飞行汽车', 
    id: 'weasley-flying-car',
    nameEn: 'Weasley Flying Car', 
    image: getItemImage('flying-car'),
    type: '魔法道具', 
    desc: '亚瑟·韦斯莱秘密改装的一辆绿松石色福特安格利亚轿车——内部空间用魔法扩大，还能飞行和隐形。二年级开学时多比封锁了九又四分之三站台入口，罗恩和哈利不得不开着飞车去霍格沃茨，结果撞上了打人柳。汽车此后在禁林中变成了野生状态，偶尔在森林中游荡，后来在八眼蜘蛛巢穴中救了哈利和罗恩。', 
    destroyed: null 
  },
  { 
    emoji: '🔮', 
    name: '魔法部电话亭入口', 
    id: 'ministry-of-magic-visitor-entrance',
    nameEn: 'Ministry of Magic Visitor Entrance', 
    image: getItemImage('ministry-entrance'),
    type: '魔法道具', 
    desc: '伦敦一个破旧的红色电话亭，是魔法部的来访者入口。拿起电话拨62442（拼写为MAGIC），会有一个女声询问来访目的，然后电话亭会像电梯一样沉入地下，将来访者送到魔法部大厅。在五年级哈利纪律审查会和七年级潜入魔法部盗取挂坠盒时都使用了这个入口。', 
    destroyed: null 
  },
  { 
    emoji: '🌌', 
    name: '黑魔法探测器', 
    id: 'dark-detectors',
    nameEn: 'Dark Detectors', 
    image: getItemImage('dark-detectors'),
    type: '魔法道具', 
    desc: '一系列探测黑魔法和欺骗行为的魔法装置。包括：窥镜（当有不可信的人在附近时会发光旋转）、隐敌镜（显示敌人的影像）和熄灯器（可以吸收和释放光源，也可以引导持有者找到心之所念）。邓布利多把熄灯器遗赠给罗恩——它在关键时刻引导罗恩找到了哈利和赫敏，成为三人组重聚的关键。', 
    destroyed: null 
  },
  { 
    emoji: '🧿', 
    name: '黑魔标记', 
    id: 'dark-mark',
    nameEn: 'Dark Mark', 
    image: getItemImage('dark-mark'),
    type: '黑暗物品', 
    desc: '伏地魔在食死徒左前臂上烙下的标记——一颗骷髅头口中吐出一条蛇。伏地魔通过黑魔标记召唤食死徒：当他触碰任何食死徒的标记时，所有食死徒的标记都会灼痛发黑，指引他们幻影移形到主人身边。杀人后食死徒会用"尸骨再现"咒将黑魔标记投射到天空中作为恐怖象征。伏地魔死后标记逐渐褪色但永不完全消失。', 
    destroyed: null 
  },
  { 
    emoji: '🪞', 
    name: '双面镜', 
    id: 'two-way-mirror',
    nameEn: 'Two-Way Mirror', 
    image: getItemImage('two-way-mirror'),
    type: '魔法道具', 
    desc: '一对魔法镜子，持有者可以通过镜子实时见到和交谈对方——类似巫师世界的视频通话。小天狼星将其中一面送给哈利，自己保留另一面。哈利在小天狼星死后才打开礼物，追悔莫及——如果他早用镜子就不会被伏地魔用假象引诱到神秘事务司。后来阿不福思·邓布利多获得了小天狼星的那面，在危急时刻通过它派多比前来营救哈利。', 
    destroyed: null 
  },
  { 
    emoji: '👂', 
    name: '伸缩耳', 
    id: 'extendable-ears',
    nameEn: 'Extendable Ears', 
    image: getItemImage('extendable-ears'),
    type: '魔法道具', 
    desc: '弗雷德和乔治·韦斯莱的发明——一种可以延伸的肉色绳状装置，一端放在耳边、另一端放到想偷听的地方。凤凰社成员们在格里莫广场12号开会时，韦斯莱家的孩子们就用伸缩耳偷听情报。莫丽·韦斯莱没收了好几副，但双胞胎总有更多。后来赫敏对它进行了改良，增加了更强的窃听能力。', 
    destroyed: null 
  },
  { 
    emoji: '🤧', 
    name: '速效翘课糖', 
    id: 'skiving-snackboxes',
    nameEn: 'Skiving Snackboxes', 
    image: getItemImage('skiving-snackboxes'),
    type: '魔法道具', 
    desc: '弗雷德和乔治的得意之作——一系列双头糖果，吃一头会立刻出现症状（流鼻血、发烧、呕吐等），吃另一头症状立即消失。包括流鼻血牛轧糖、发烧软糖、呕吐奶油等。在乌姆里奇统治霍格沃茨期间，这些糖果成为学生们对抗暴政的秘密武器——几乎所有人都用它翘掉了乌姆里奇的课。韦斯莱魔法把戏坊的畅销产品。', 
    destroyed: null 
  },
  { 
    emoji: '🔦', 
    name: '熄灯器', 
    id: 'deluminator',
    nameEn: 'Deluminator', 
    image: getItemImage('deluminator'),
    type: '传奇物品', 
    desc: '邓布利多发明的独特装置——外形类似打火机，可以吸收附近的光源并在需要时释放。但它最特殊的功能直到最后才揭示：当持有者的名字被某个重要的人提到时，熄灯器会发出引导之光，带领持有者找到那个人。邓布利多将它遗赠给罗恩——在罗恩因魂器影响离开后，正是赫敏提到了他的名字，熄灯器引导罗恩找到了哈利和赫敏，实现了三人组的重聚。', 
    destroyed: null 
  },
  { 
    emoji: '🏍️', 
    name: '小天狼星的飞行摩托车', 
    id: 'sirius-black',
    nameEn: "Sirius Black's Flying Motorcycle", 
    image: getItemImage('sirius-motorcycle'),
    type: '魔法道具', 
    desc: '小天狼星的标志性交通工具——一辆被施了飞行魔法的巨大黑色摩托车。1981年万圣节之夜，海格正是骑着这辆摩托车将婴儿哈利从戈德里克山谷的废墟中救出，送到女贞路4号。十六年后的"七个波特"行动中，海格再次驾驶这辆摩托车（由亚瑟·韦斯莱升级了龙火喷射等防御功能）载着真正的哈利突围。在空战中摩托车最终坠毁。', 
    destroyed: '"七个波特"行动中坠毁' 
  },
  { 
    emoji: '🎩', 
    name: '分院帽', 
    id: 'sorting-hat',
    nameEn: 'Sorting Hat', 
    image: getItemImage('sorting-hat'),
    type: '传奇物品', 
    desc: '戈德里克·格兰芬多的旧帽子，被四位创始人施了魔法使其拥有智慧和判断力。每年开学时它会为新生分配学院——它能读取佩戴者内心深处的品质和愿望。帽子尊重佩戴者的意愿——哈利恳求"不要斯莱特林"时它选择了格兰芬多。在危急时刻，真正的格兰芬多人可以从帽中抽出格兰芬多之剑。每年开学宴上分院帽还会唱一首自创歌曲，有时还会发出关于学院团结的警告。', 
    destroyed: null 
  },
  { 
    emoji: '🚂', 
    name: '霍格沃茨特快列车', 
    id: 'hogwarts-express',
    nameEn: 'Hogwarts Express', 
    image: getItemImage('hogwarts-express'),
    type: '传奇物品', 
    desc: '一列猩红色蒸汽火车，每年9月1日从伦敦国王十字车站九又四分之三站台出发，将学生们送往霍格沃茨。对每一个巫师来说，穿过九又四分之三站台的砖墙、第一次看到猩红色火车头的那一刻，是他们魔法人生的真正起点。车上有女巫推车售卖巧克力蛙、比比多味豆等零食。哈利与罗恩的友谊就始于霍格沃茨特快列车的车厢中。', 
    destroyed: null 
  },
  { 
    emoji: '🌫️', 
    name: '神秘事务司帷幕', 
    id: 'the-veil',
    nameEn: 'The Veil', 
    image: getItemImage('the-veil'),
    type: '传奇物品', 
    desc: '魔法部神秘事务司死亡室中一个石拱门上悬挂的破旧帷幕——它是生与死之间的神秘边界。帷幕会轻轻飘动，仿佛有微风（但死亡室里没有风）。卢娜和哈利可以听到帷幕后面微弱的低语声——那是逝者的声音。小天狼星在决斗中被贝拉特里克斯的咒语击中后坠入帷幕，永远消失。这个古老的神秘装置是魔法世界中对死亡本质研究最深入的文物之一。', 
    destroyed: null 
  },
  { 
    emoji: '🧦', 
    name: '自由的衣物', 
    id: 'clothes-for-freedom',
    nameEn: 'Clothes for Freedom', 
    image: getItemImage('clothes-freedom'),
    type: '魔法道具', 
    desc: '在巫师法律中，主人递给家养小精灵一件衣物就意味着解放它——从此小精灵获得自由，不再受主人的约束。哈利把里德尔日记藏在袜子里递给卢修斯·马尔福，后者将袜子丢给了多比——多比因此获得了自由。赫敏一度痴迷于解放家养小精灵（S.P.E.W.运动），她织了无数顶小帽子藏在格兰芬多公共休息室里，导致其他小精灵不愿来打扫——只有多比不介意"免费收集帽子"。', 
    destroyed: null
  },
  
  {
    emoji: '📸',
    name: '科林·克里维的相机',
    id: 'colin-creevey',
    nameEn: "Colin Creevey's Camera",
    image: getItemImage('colin-camera'),
    type: '魔法道具',
    desc: '麻瓜相机，经过魔法改造后可以拍摄魔法照片——照片中的人物会移动。科林·克里维是霍格沃茨的"摄影爱好者"，总是带着相机到处拍摄哈利。在密室被打开期间，他试图拍下蛇怪却被石化（通过相机镜头间接看到）。这个相机代表了麻瓜科技与魔法的融合。',
    destroyed: null
  },
  {
    emoji: '🪨',
    name: '魔法石（贤者之石）',
    id: 'philosopher',
    nameEn: 'Philosopher\'s Stone',
    image: getItemImage('philosophers-stone'),
    type: '传奇物品',
    desc: '尼可·勒梅创造的传奇魔法石，可以实现两个奇迹：将任何金属变成纯金，以及制造长生不老药。这是唯一已知的永生方法。伏地魔在第一学年试图偷取魔法石重塑身体，但哈利保护了它。在故事结束时，勒梅决定销毁魔法石，与妻子一同接受自然死亡。',
    destroyed: '被尼可·勒梅销毁'
  },
  {
    emoji: '💎',
    name: '记忆瓶',
    id: 'memory-vials',
    nameEn: 'Memory Vials',
    image: getItemImage('memory-vials'),
    type: '魔法道具',
    desc: '储存记忆的小玻璃瓶，通常用于在冥想盆中回顾记忆。记忆以银色丝状物质的形式被抽出，可以储存在瓶中长期保存。邓布利多和斯内普都用记忆瓶保存了关键记忆，如斯内普临终前交给哈利的记忆揭示了整个真相。',
    destroyed: null
  },
  {
    emoji: '🎭',
    name: '消失柜',
    id: 'vanishing-cabinet',
    nameEn: 'Vanishing Cabinet',
    image: getItemImage('vanishing-cabinet'),
    type: '魔法道具',
    desc: '一对神奇的柜子，形成一个传送通道——进入其中一个柜子的人会从另一个柜子出来。霍格沃茨和博金-博克店各有一个。德拉科·马尔福花了一整年修复霍格沃茨的消失柜，最终让食死徒通过它入侵霍格沃茨，导致了邓布利多的死亡。弗雷德和乔治曾把蒙顿格斯塞进消失柜做恶作剧。',
    destroyed: '霍格沃茨的消失柜在战斗中被毁'
  },
  {
    emoji: '🧲',
    name: '门钥匙',
    id: 'portkey',
    nameEn: 'Portkey',
    image: getItemImage('portkey'),
    type: '魔法道具',
    desc: '被施了魔法的普通物品，可以将接触它的人瞬间传送到预定地点。通常在预定时间激活（如三强争霸赛杯），但也有可以随时激活的版本。门钥匙是巫师旅行的重要方式之一，特别是对于无法幻影移形的人。在"七个波特"行动中，门钥匙是转移哈利的重要工具。',
    destroyed: null
  },
  {
    emoji: '🗝️',
    name: '假挂坠盒',
    id: 'fake-locket',
    nameEn: 'Fake Locket',
    image: getItemImage('fake-locket'),
    type: '魔法道具',
    desc: '雷古勒斯·布莱克在洞穴中替换真魂器时留下的假挂坠盒，里面有一张署名R.A.B.的字条。这个假挂坠盒后来被蒙顿格斯偷走并卖给乌姆里奇，最终被哈利夺回。它的存在证明了雷古勒斯的英勇牺牲。',
    destroyed: null
  },

  // ===== 新增魔法物品 =====

  {
    emoji: '🔥',
    name: '火焰杯',
    id: 'goblet-of-fire',
    nameEn: 'Goblet of Fire',
    image: getItemImage('goblet-of-fire'),
    type: '传奇物品',
    desc: '一个粗糙的大型木质高脚杯，杯中不断跳动着蓝白色火焰。它是三强争霸赛的裁决者——参赛者将写有名字的纸条投入杯中，火焰杯会在万圣节之夜选出每校最合适的代表。火焰杯的选择具有魔法契约的约束力，一旦被选中就必须参赛。伏地魔的仆人克劳奇二世对火焰杯施了强力混淆咒，使其选出了第四名选手——哈利·波特。',
    destroyed: null
  },
  {
    emoji: '🪶',
    name: '血羽毛笔',
    id: 'black-quill-blood-quill',
    nameEn: 'Black Quill (Blood Quill)',
    image: getItemImage('blood-quill'),
    type: '黑暗物品',
    desc: '一种被归类为黑魔法的特殊羽毛笔——使用者书写时，笔迹会以使用者自己的鲜血为墨水，同时在手背上刻下书写的内容。乌姆里奇在霍格沃茨担任教授期间，用这支笔作为惩罚手段，强迫哈利反复书写"我不可以说谎"（I must not tell lies），直到字迹永久烙印在他的手背上。这是乌姆里奇施虐的标志性工具。',
    destroyed: null
  },
  {
    emoji: '📰',
    name: '预言家日报',
    id: 'the-daily-prophet',
    nameEn: 'The Daily Prophet',
    image: getItemImage('daily-prophet'),
    type: '魔法道具',
    desc: '英国魔法界最主要的报纸，由猫头鹰每天早晨递送到订阅者手中。报纸上的照片会动——这是魔法世界报刊的标准特色。在伏地魔复活后，预言家日报被魔法部控制，成为抹黑哈利和邓布利多的宣传工具。记者丽塔·斯基特是该报最臭名昭著的专栏作家，她用自动速记羽毛笔撰写充满歪曲事实的耸人报道。',
    destroyed: null
  },
  {
    emoji: '🪶',
    name: '自动速记羽毛笔',
    id: 'quick-quotes-quill',
    nameEn: 'Quick-Quotes Quill',
    image: getItemImage('quick-quotes-quill'),
    type: '魔法道具',
    desc: '丽塔·斯基特的标志性工具——一支酸绿色的羽毛笔，能够自动将对话"润色"为耸人听闻的文字。它不是忠实记录原话，而是按照使用者的意图将平淡的事实加工成戏剧性的报道。斯基特用它写出了大量关于哈利的歪曲报道，包括三强争霸赛期间把哈利描绘成"泪眼汪汪的小男孩"。',
    destroyed: null
  },
  {
    emoji: '🐛',
    name: '阿尼马格斯形态',
    id: 'animagus-transformation',
    nameEn: 'Animagus Transformation',
    image: getItemImage('animagus'),
    type: '传奇物品',
    desc: '严格来说不是一个"物品"，而是一种极为高级的魔法能力——能够随意变成特定动物的巫师被称为阿尼马格斯。每个巫师只能变成一种与其性格匹配的动物。已知的阿尼马格斯包括：麦格教授（虎斑猫）、詹姆·波特（雄鹿"尖头叉子"）、小天狼星（大黑狗"大脚板"）、彼得·佩迪鲁（老鼠"虫尾巴"）和丽塔·斯基特（甲虫，未注册）。所有阿尼马格斯必须在魔法部注册，非法变形是严重罪行。',
    destroyed: null
  },
  {
    emoji: '🫗',
    name: '储思盆中的记忆',
    id: 'dumbledore',
    nameEn: 'Dumbledore\'s Collected Memories',
    type: '魔法道具',
    desc: '邓布利多花费多年收集的关于伏地魔过去的关键记忆合集。其中最重要的包括：鲍勃·欧格登拜访冈特家的记忆（揭示伏地魔的血统）、少年里德尔在孤儿院的记忆（展示他天生的黑暗面）、赫普兹巴·史密斯向里德尔展示金杯和挂坠盒的记忆（魂器线索）、以及被篡改的斯拉格霍恩记忆——真实版本揭示了里德尔询问七个魂器的可能性。这些记忆是理解和最终打败伏地魔的关键拼图。',
    destroyed: null
  },
  {
    emoji: '📓',
    name: '半血王子的高级魔药学课本',
    id: 'advanced-potion-making-half-blood-prince',
    nameEn: 'Advanced Potion-Making (Half-Blood Prince\'s Copy)',
    image: getItemImage('half-blood-princes-book'),
    type: '魔法道具',
    desc: '一本破旧的二手《高级魔药学》课本，页边写满了注释、改良配方和自创咒语。"半血王子"的真实身份是年少时的西弗勒斯·斯内普——他的母亲艾琳·普林斯是纯血统，父亲是麻瓜。哈利在六年级使用这本课本，凭借其中的改良配方在魔药课上大放异彩。然而课本中也记载了危险的黑咒"神锋无影"（Sectumsempra），哈利用它误伤了德拉科。',
    destroyed: null
  },
  {
    emoji: '🪄',
    name: '哈利的魔杖',
    id: 'harry',
    nameEn: 'Harry\'s Wand',
    image: getItemImage('harrys-wand'),
    type: '魔法道具',
    desc: '冬青木杖身，11英寸，凤凰尾羽杖芯——这根羽毛来自邓布利多的凤凰福克斯，而福克斯只给过两根羽毛，另一根就在伏地魔的魔杖中。这种"孪生杖芯"的联系导致两根魔杖无法正常对抗彼此（闪回咒现象）。哈利的魔杖在戈德里克山谷被赫敏的炸碎咒误伤断裂，后来用老魔杖修复。奥利凡德称这根魔杖"不同寻常"。',
    destroyed: '在戈德里克山谷被损坏，后用老魔杖修复'
  },
  {
    emoji: '🪄',
    name: '伏地魔的魔杖',
    id: 'voldemort',
    nameEn: 'Voldemort\'s Wand',
    image: getItemImage('voldemorts-wand'),
    type: '黑暗物品',
    desc: '紫杉木杖身，13.5英寸，凤凰尾羽杖芯。与哈利的魔杖共享同一只凤凰（福克斯）的羽毛。这根魔杖施出了杀害詹姆和莉莉·波特的索命咒，也是伏地魔恐怖统治的象征。由于孪生杖芯的限制，伏地魔在墓地决斗中无法用它打败哈利，之后他不惜一切代价寻找老魔杖来解决这个问题。',
    destroyed: null
  },
  {
    emoji: '🗞️',
    name: '唱唱反调',
    id: 'the-quibbler',
    nameEn: 'The Quibbler',
    image: getItemImage('the-quibbler'),
    type: '魔法道具',
    desc: '卢娜·洛夫古德的父亲谢诺菲留斯·洛夫古德编辑出版的另类杂志。内容通常充满荒诞不经的阴谋论和虚构生物（如弯角鼾兽、纳尔吉虫等）。然而当主流媒体预言家日报被控制时，唱唱反调成为了唯一敢刊登真相的媒体——它发表了哈利关于伏地魔复活的独家专访，在魔法世界引起巨大反响。',
    destroyed: null
  },
  {
    emoji: '📿',
    name: '蛋白石项链',
    id: 'opal-necklace',
    nameEn: 'Opal Necklace',
    image: getItemImage('opal-necklace'),
    type: '黑暗物品',
    desc: '博金-博克店出售的一条被诅咒的蛋白石项链——据说它已经夺去了十九个麻瓜的生命。被诅咒的人触碰它会陷入极度痛苦直至死亡。德拉科·马尔福在六年级将它交给被夺魂咒控制的凯蒂·贝尔，试图以此刺杀邓布利多。凯蒂不慎触碰到项链后被升上空中、痛苦尖叫，在圣芒戈住了数月才康复。',
    destroyed: null
  },
  {
    emoji: '🍷',
    name: '有毒的蜂蜜酒',
    id: 'poisoned-mead',
    nameEn: 'Poisoned Mead',
    image: getItemImage('poisoned-mead'),
    type: '黑暗物品',
    desc: '德拉科·马尔福暗杀邓布利多的第二次尝试——他在蜂蜜酒中下毒，原计划让斯拉格霍恩将酒作为圣诞礼物送给邓布利多。但斯拉格霍恩私自留下了酒，后来在自己办公室倒给罗恩喝。罗恩中毒倒地抽搐，哈利情急之下用毛粪石塞进罗恩嘴里救了他一命。这是半血王子课本中记载的急救知识。',
    destroyed: null
  },
  {
    emoji: '🔔',
    name: '窥镜',
    id: 'sneakoscope',
    nameEn: 'Sneakoscope',
    image: getItemImage('sneakoscope'),
    type: '魔法道具',
    desc: '一种黑魔法探测器，外形像小型玻璃陀螺。当不可信的人在附近时，它会发光、旋转并发出尖啸声。罗恩在三年级从埃及给哈利买了一个作为生日礼物。它在霍格沃茨特快列车上不断作响——因为虫尾巴（彼得·佩迪鲁化身的斑斑）就在旁边。在寻找魂器的旅途中，赫敏将窥镜作为安全警报使用。',
    destroyed: null
  },
  {
    emoji: '🌌',
    name: '隐敌镜',
    id: 'foe-glass',
    nameEn: 'Foe-Glass',
    image: getItemImage('foe-glass'),
    type: '魔法道具',
    desc: '一面特殊的镜子，能显示持有者敌人的模糊影像——敌人越接近，影像越清晰。假穆迪（克劳奇二世）的办公室里有一面隐敌镜。当邓布利多、麦格教授和斯内普冲进来揭穿他时，镜子里三人的影像从模糊变得清晰无比——那是克劳奇二世最后看到的"清晰的敌人"。',
    destroyed: null
  },
  {
    emoji: '🪺',
    name: '金蛋',
    id: 'golden-egg',
    nameEn: 'Golden Egg',
    image: getItemImage('golden-egg'),
    type: '魔法道具',
    desc: '三强争霸赛第一个任务的奖品——选手必须从龙巢中夺取的金蛋。打开后会发出刺耳的尖叫声（人鱼语），只有在水下才能听清其中的谜语。谜语暗示了第二个任务的内容：选手需要在黑湖中一小时内找回被人鱼看管的最珍爱之人。塞德里克提示哈利去魁地奇场的级长浴室听蛋的线索。',
    destroyed: null
  },
  {
    emoji: '🏠',
    name: '有求必应室',
    id: 'room-of-requirement',
    nameEn: 'Room of Requirement',
    image: getItemImage('room-of-requirement'),
    type: '传奇物品',
    desc: '霍格沃茨中最神奇的秘密房间——它只会在有人真正需要它时出现，而且会变成那个人需要的任何样子。在走廊中来回走三趟，心中想着需要什么，门就会出现。邓布利多军在这里秘密训练，纳威在七年级将它变成了反抗军的庇护所，伏地魔在这里藏匿了拉文克劳的冠冕。厉火在这个房间中释放，烧毁了无数世代学生藏匿的物品。',
    destroyed: '被厉火严重损坏'
  },
  {
    emoji: '🦴',
    name: '伏地魔重生仪式',
    id: 'voldemort',
    nameEn: 'Voldemort\'s Rebirth Ritual',
    type: '黑暗物品',
    desc: '伏地魔在小汉格顿墓地使用的黑暗复活仪式，需要三种关键材料："父亲的骨——无意奉献"（老汤姆·里德尔的骸骨）、"仆人的肉——自愿牺牲"（虫尾巴切下自己的右手）、"敌人的血——强行夺取"（哈利的血）。大锅中翻腾的药剂和这三种成分结合后，伏地魔重获肉体。用哈利的血重生这一决定后来成为他自己的败因——莉莉的牺牲保护也被植入了伏地魔体内。',
    destroyed: null
  },
  {
    emoji: '🪬',
    name: '护身符和防护装置',
    id: 'protective-enchantments',
    nameEn: 'Protective Enchantments',
    image: getItemImage('protective-enchantments'),
    type: '魔法道具',
    desc: '巫师用于保护特定区域的一系列魔法。包括：赤胆忠心咒（将秘密隐藏在保密人灵魂中）、幻身咒、麻瓜驱逐咒、反幻影移形魔法等。波特家的藏身处由赤胆忠心咒保护（保密人从小天狼星换成了虫尾巴，导致悲剧）。霍格沃茨拥有史上最强大的防护魔法——在最后的大战中，麦格教授等人用石头守卫咒唤醒了城堡中所有石像参战。三人组逃亡期间也每天在营地周围施加多层防护。',
    destroyed: null
  },
  {
    emoji: '🧤',
    name: '虫尾巴的银手',
    id: 'wormtail',
    nameEn: 'Wormtail\'s Silver Hand',
    type: '黑暗物品',
    desc: '伏地魔赐给彼得·佩迪鲁（虫尾巴）的一只银色魔法手——替代他在复活仪式中自愿献出的右手。这只银手力大无穷，但暗藏杀机：当虫尾巴在马尔福庄园地牢中对哈利产生了一丝犹豫和同情时，银手立刻反过来掐住了虫尾巴自己的喉咙并将其勒死。这是伏地魔的保险措施——他对背叛零容忍。邓布利多早已预见到这只手终将杀死虫尾巴。',
    destroyed: null
  },
  {
    emoji: '🦅',
    name: '福克斯',
    id: 'fawkes',
    nameEn: 'Fawkes',
    image: getItemImage('fawkes'),
    type: '传奇物品',
    desc: '邓布利多的凤凰宠物——一只华丽的金红色鸟，拥有多种强大的魔法能力：凤凰之泪可以治愈任何伤口、凤凰能够搬运极重的物品、凤凰歌声能鼓舞正义者的勇气。福克斯在密室中啄瞎了蛇怪的眼睛保护哈利，用眼泪治愈了哈利被蛇怪毒牙刺伤的伤口。他的尾羽是哈利和伏地魔魔杖的杖芯。邓布利多死后，福克斯唱完挽歌便飞走了，再也没有回来。',
    destroyed: null
  },
  {
    emoji: '🏰',
    name: '霍格沃茨石像守卫',
    id: 'hogwarts-suits-of-armour-&-statues',
    nameEn: 'Hogwarts Suits of Armour & Statues',
    image: getItemImage('hogwarts-statues'),
    type: '魔法道具',
    desc: '分布在霍格沃茨走廊和大厅中的数十套铠甲和石像。在霍格沃茨大战中，麦格教授用"飞来飞去"和"活力退散"等咒语将它们唤醒参战——石头骑士们从基座上跳下来，冲向城堡前方组成防线迎战伏地魔的大军。麦格教授激活它们时说："我一直都想用那个咒语。"这是霍格沃茨防御体系中最壮观的一环。',
    destroyed: '多数在霍格沃茨大战中被摧毁'
  },
  {
    emoji: '🧩',
    name: '三头犬路威',
    id: 'fluffy',
    nameEn: 'Fluffy',
    image: getItemImage('fluffy'),
    type: '魔法道具',
    desc: '海格从一个希腊人手中买来的巨大三头犬，用来守卫通往魔法石的活板门入口。路威非常凶猛，但有一个致命弱点——只要听到音乐就会立刻睡着。在海格一次喝醉后把这个秘密告诉了伪装成陌生人的奇洛，导致魔法石的防御被突破。哈利、罗恩和赫敏第一次进入三楼禁止走廊时险些被路威咬死。',
    destroyed: null
  },
]

export default magicItems
