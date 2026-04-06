import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'
import StatsPanel from '../components/StatsPanel'

const magicItems = [
  { emoji: '📔', name: '汤姆·里德尔的日记', nameEn: "Tom Riddle's Diary", type: '魂器', desc: '伏地魔创造的第一个魂器，记录着年少时代的里德尔。日记中潜藏着16岁汤姆·里德尔的灵魂碎片，它曾控制金妮·韦斯莱打开密室释放蛇怪。哈利在密室中用蛇怪的毒牙将其刺穿摧毁——这是第一个被摧毁的魂器。', destroyed: '蛇怪毒牙（哈利·波特）' },
  { emoji: '💍', name: '马沃罗·冈特的戒指', nameEn: "Marvolo Gaunt's Ring", type: '魂器/圣器', desc: '冈特家族的传家宝，镶有佩弗利尔家族的标记（实为复活石）。伏地魔杀害父亲后将其制成魂器。邓布利多在冈特旧宅找到并用格兰芬多之剑摧毁它，但戒指上的致命诅咒使他的手变黑枯萎，只剩一年寿命。', destroyed: '格兰芬多之剑（邓布利多）' },
  { emoji: '🏆', name: '赫奇帕奇的金杯', nameEn: "Hufflepuff's Cup", type: '魂器', desc: '赫尔加·赫奇帕奇的遗物，一个小型金杯，具有特殊魔法属性。伏地魔杀害赫普兹巴·史密斯后偷走了它，存放在贝拉特里克斯·莱斯特兰奇在古灵阁的高安全等级金库中。', destroyed: '蛇怪毒牙（赫敏·格兰杰）' },
  { emoji: '👑', name: '拉文克劳的冠冕', nameEn: "Ravenclaw's Diadem", type: '魂器', desc: '罗伊纳·拉文克劳的冠冕，据说能增强佩戴者的智慧，上面刻着"超凡的智慧是人类最大的财富"。失踪数百年后被伏地魔找到并制成魂器，藏于霍格沃茨有求必应室。', destroyed: '厉火（文森特·克拉布意外释放）' },
  { emoji: '🐍', name: '斯莱特林的挂坠盒', nameEn: "Slytherin's Locket", type: '魂器', desc: '萨拉查·斯莱特林的遗物。R.A.B（雷古勒斯·布莱克）牺牲自己从洞穴中取出并替换了假货。真正的挂坠盒辗转到了蒙顿格斯手中，后被乌姆里奇获得。三人组潜入魔法部将其取回，罗恩用格兰芬多之剑将其摧毁。', destroyed: '格兰芬多之剑（罗恩·韦斯莱）' },
  { emoji: '⚡', name: '哈利·波特（活魂器）', nameEn: 'Harry Potter (Living Horcrux)', type: '魂器', desc: '伏地魔无意中创造的第七个魂器。1981年当索命咒反弹时，伏地魔不稳定的灵魂碎片嵌入了婴儿哈利体内。这赋予了哈利蛇佬腔能力和与伏地魔的精神连接。哈利在禁林中坦然赴死，伏地魔的索命咒只摧毁了魂器碎片。', destroyed: '阿瓦达索命咒（伏地魔本人，误杀自己的魂器）' },
  { emoji: '🐍', name: '娜吉尼', nameEn: 'Nagini', type: '魂器', desc: '伏地魔的蛇宠和最后一个有意创造的魂器。娜吉尼实际上是一个被血咒诅咒、永久变成蛇的女人（马尔迪克图斯）。她执行了伏地魔的多个命令，包括杀害斯内普。', destroyed: '格兰芬多之剑（纳威·隆巴顿）' },
  { emoji: '🪄', name: '老魔杖（接骨木魔杖）', nameEn: 'The Elder Wand', type: '死亡圣器', desc: '三件死亡圣器中最强大的一件，据说由死亡本身所造。这根魔杖的忠诚只属于打败其前任主人的巫师。从安提俄克·佩弗利尔到格林德沃到邓布利多，直到德拉科缴了邓布利多的械，再到哈利缴了德拉科的械——最终老魔杖效忠于哈利。', destroyed: null },
  { emoji: '🧥', name: '隐形衣', nameEn: 'Cloak of Invisibility', type: '死亡圣器', desc: '三件死亡圣器之一，由最小的佩弗利尔兄弟伊格诺图斯获得，此后在波特家族世代相传。与普通隐形衣不同，它永不褪色、永不失效，甚至连死亡都无法透过它。邓布利多曾借用研究后归还给哈利。', destroyed: null },
  { emoji: '💎', name: '复活石', nameEn: 'Resurrection Stone', type: '死亡圣器', desc: '三件死亡圣器之一，能召唤已逝之人的灵魂影像（非真正复活）。它被镶在冈特戒指中，后被邓布利多取出。哈利在走向禁林面对伏地魔时转动复活石，见到了父母、小天狼星和卢平的灵魂陪伴他走完最后的路。', destroyed: null },
  { emoji: '🗺️', name: '活点地图', nameEn: "Marauder's Map", type: '魔法道具', desc: '由掠夺者（尖头叉子詹姆、大脚板小天狼星、月亮脸卢平、虫尾巴彼得）在学生时代创造。激活咒语"我庄严宣誓我绝不干好事"，关闭咒语"恶作剧完成"。能实时显示霍格沃茨内所有人的位置，无论其使用隐形衣还是复方汤剂。', destroyed: null },
  { emoji: '⏰', name: '时间转换器', nameEn: 'Time-Turner', type: '魔法道具', desc: '沙漏形魔法装置，每转一圈可以回到一小时前。赫敏在三年级获得许可使用它来上额外课程，后来用它帮助拯救了小天狼星和巴克比克。魔法部神秘事务司存有大量时间转换器，在五年级的战斗中全部被毁。', destroyed: null },
  { emoji: '🪞', name: '厄里斯魔镜', nameEn: 'Mirror of Erised', type: '魔法道具', desc: '能显示观看者内心最深切渴望的魔镜。镜框上刻着"Erised stra ehru oyt ube cafru oyt on wohsi"（倒写的"I show not your face but your heart\'s desire"）。邓布利多在镜中看到自己的家人团聚，哈利看到了父母。', destroyed: null },
  { emoji: '🗡️', name: '格兰芬多之剑', nameEn: 'Sword of Gryffindor', type: '传奇物品', desc: '由妖精工匠格里菲克用精灵银打造，它会在真正的格兰芬多人有需要时出现。剑会吸收让它变强的物质——哈利用它杀死蛇怪后，剑浸透了蛇怪毒液，因此能够摧毁魂器。它先后被哈利、邓布利多、罗恩和纳威使用。', destroyed: null },
  { emoji: '🧹', name: '火弩箭', nameEn: 'Firebolt', type: '魔法道具', desc: '世界上最快的竞赛飞天扫帚，10秒内可加速到150英里/小时。由小天狼星作为圣诞礼物匿名送给哈利。曾被麦格教授没收检查是否被施了恶咒（让哈利和赫敏产生了短暂的矛盾）。在"七个波特"行动中被毁。', destroyed: null },
  { emoji: '📻', name: '波特守望', nameEn: 'Potterwatch', type: '魔法道具', desc: '第二次巫师战争期间由凤凰社成员运营的秘密广播节目。使用密码才能收听（如"疯眼汉"），由李·乔丹主持，弗雷德和乔治参与。节目为躲藏中的人提供真实的战争消息、失踪者名单和鼓舞士气的信息——在预言家日报被控制的黑暗时期，它是人们获得真相的唯一渠道。', destroyed: null },
  { emoji: '🔮', name: '预言球', nameEn: 'Prophecy Orb', type: '魔法道具', desc: '魔法部神秘事务司预言厅中保存的水晶球，记录了有关哈利和伏地魔的完整预言。只有预言涉及的当事人才能安全地取下它。伏地魔为了得到完整预言而引诱哈利前往神秘事务司，导致了那场改变了一切的战斗。预言球在混战中被打碎。', destroyed: '在神秘事务司之战中被打碎' },
  { emoji: '📜', name: '韦斯莱魔法把戏坊发明', nameEn: "Weasleys' Wizard Wheezes Products", type: '魔法道具', desc: '弗雷德和乔治·韦斯莱发明的一系列恶作剧和防护道具。速效翘课糖（流鼻血太妃糖、发烧软糖等）可以让学生快速"生病"翘课；伸缩耳用于偷听远处的对话；便携沼泽可以在任何地方制造一片真正的沼泽。战时他们还研发了盾帽和隐形斗篷等防护装备。', destroyed: null },
  { emoji: '🪙', name: '达力·韦斯莱假金加隆', nameEn: 'Dumbledore\'s Army Coins', type: '魔法道具', desc: '赫敏制作的联络金币，外观与普通金加隆完全相同，但边缘的数字会随着哈利的信号而变化发热。这是赫敏将变形咒应用于实物通讯的天才发明——灵感来自伏地魔的黑魔标记。DA的所有成员人手一枚，用于通知集会时间和地点。纳威在七年级用它召集DA成员参与霍格沃茨大战。', destroyed: null },
  { emoji: '🏆', name: '三强争霸赛杯', nameEn: 'Triwizard Cup', type: '魔法道具', desc: '三强争霸赛的最终奖杯，在第三项任务——迷宫中等待最先到达的选手。然而在1994年的比赛中，冒牌穆迪（克劳奇二世）将奖杯变成了门钥匙，将同时触碰到奖杯的哈利和塞德里克传送到小汉格顿墓地。塞德里克被虫尾巴杀害，伏地魔在这里重获肉体。', destroyed: null },
  { emoji: '💌', name: '吼叫信', nameEn: 'Howler', type: '魔法道具', desc: '一种特殊的巫师邮件，如果不及时打开会自动爆炸。打开后会以发信人的声音（放大数十倍）大声怒吼其中的内容。莫丽·韦斯莱在罗恩和哈利飞车去学校后寄了一封经典的吼叫信，在大厅里当着所有人的面怒吼，让罗恩恨不得钻到地缝里。', destroyed: null },
  { emoji: '🫙', name: '冥想盆', nameEn: 'Pensieve', type: '魔法道具', desc: '一个浅石盆，内含银色液体，可以储存和回顾记忆。将魔杖抵在太阳穴抽出银色丝状记忆放入盆中，然后可以进入记忆中身临其境地观看。邓布利多的冥想盆是他最重要的工具之一——哈利通过它了解了伏地魔的过去、斯内普的真相和关于魂器的关键情报。斯内普临终时将记忆交给哈利，正是通过冥想盆揭示了一切。', destroyed: null },
  { emoji: '🔥', name: '飞路粉', nameEn: 'Floo Powder', type: '魔法道具', desc: '一种闪闪发光的银色粉末，投入壁炉火焰中后可以实现瞬间传送（飞路网络）或头部通讯（只把头伸入火焰中与另一个壁炉对话）。使用时必须清晰地说出目的地名称——哈利第一次使用时把"对角巷"说成了"对角巷"的模糊发音，结果误入了翻倒巷的博金-博克店。小天狼星也通过飞路网络与哈利通讯。', destroyed: null },
  { emoji: '🕰️', name: '韦斯莱家的魔法钟', nameEn: 'Weasley Clock', type: '魔法道具', desc: '陋居中一面特殊的大钟，九根指针分别代表韦斯莱一家九口人。指针不是指向时间，而是指向家人的状态——"家中"、"上学"、"上班"、"旅途中"、"迷路"、"医院"、"监狱"，以及在战争时期经常指向的"性命垂危"。第二次巫师战争期间，所有指针都长期指向"性命垂危"。', destroyed: null },
  { emoji: '📗', name: '怪兽之书', nameEn: 'The Monster Book of Monsters', type: '魔法道具', desc: '海格为三年级奇兽饲育学选用的教材——一本会咬人的书。这本书有牙齿，如果不知道抚摸书脊来安抚它，它会疯狂地咬人和四处逃窜。对角巷丽痕书店的店员因为此书被咬得遍体鳞伤，不得不戴上厚手套才敢靠近。', destroyed: null },
  { emoji: '🔴', name: '记忆球', nameEn: 'Remembrall', type: '魔法道具', desc: '一个水晶球大小的玻璃球，内含白烟。当持有者忘记了某件事时，球内的烟雾会变成红色。纳威的祖母在一年级送了他一个，烟雾立刻变红——但纳威完全想不起自己忘了什么（其实是忘了穿长袍）。马尔福抢走记忆球，哈利飞上空中追回，被麦格教授看到后反而成为了格兰芬多魁地奇队的找球手。', destroyed: null },
  { emoji: '🪙', name: '妖精银', nameEn: 'Goblin Silver', type: '传奇物品', desc: '妖精工匠锻造的最珍贵金属——只吸收能让它变强的物质。格兰芬多之剑就是由妖精银制成的。妖精对金属制品有独特的观念：他们认为制造者才是物品的真正主人，出售给巫师的物品在买家死后应归还给妖精。这种观念差异造成了巫师与妖精之间持续数世纪的紧张关系。', destroyed: null },
  { emoji: '👜', name: '赫敏的串珠手包', nameEn: "Hermione's Beaded Bag", type: '魔法道具', desc: '赫敏用无痕伸展咒对一个小巧的串珠手包施咒，使其内部空间远大于外表。她在逃亡前将帐篷、衣服、书籍、魔药材料、复方汤剂等所有必需品装入其中。这个小手包成为了三人组在长达数月的流亡生活中的生命线——没有它，寻找和摧毁魂器的任务根本无法完成。', destroyed: null },
  { emoji: '🧹', name: '光轮2000', nameEn: 'Nimbus 2000', type: '魔法道具', desc: '哈利在霍格沃茨的第一把飞天扫帚，由麦格教授在一年级破格赠予（为了让他成为格兰芬多魁地奇队的找球手）。这在当时是最先进的竞赛扫帚——时速可达100英里。哈利骑着它赢得了多场魁地奇比赛。三年级时它在与赫奇帕奇的比赛中被打人柳砸成碎片。', destroyed: '打人柳' },
  { emoji: '🚗', name: '韦斯莱飞行汽车', nameEn: 'Weasley Flying Car', type: '魔法道具', desc: '亚瑟·韦斯莱秘密改装的一辆绿松石色福特安格利亚轿车——内部空间用魔法扩大，还能飞行和隐形。二年级开学时多比封锁了九又四分之三站台入口，罗恩和哈利不得不开着飞车去霍格沃茨，结果撞上了打人柳。汽车此后在禁林中变成了野生状态，偶尔在森林中游荡，后来在八眼蜘蛛巢穴中救了哈利和罗恩。', destroyed: null },
  { emoji: '🔮', name: '魔法部电话亭入口', nameEn: 'Ministry of Magic Visitor Entrance', type: '魔法道具', desc: '伦敦一个破旧的红色电话亭，是魔法部的来访者入口。拿起电话拨62442（拼写为MAGIC），会有一个女声询问来访目的，然后电话亭会像电梯一样沉入地下，将来访者送到魔法部大厅。在五年级哈利纪律审查会和七年级潜入魔法部盗取挂坠盒时都使用了这个入口。', destroyed: null },
  { emoji: '🌌', name: '代拉科特黑魔法探测器', nameEn: 'Dark Detectors', type: '魔法道具', desc: '一系列探测黑魔法和欺骗行为的魔法装置。包括：窥镜（当有不可信的人在附近时会发光旋转）、隐敌镜（显示敌人的影像）和熄灯器（可以吸收和释放光源，也可以引导持有者找到心之所念）。邓布利多把熄灯器遗赠给罗恩——它在关键时刻引导罗恩找到了哈利和赫敏，成为三人组重聚的关键。', destroyed: null },
  { emoji: '🧿', name: '黑魔标记', nameEn: 'Dark Mark', type: '黑暗物品', desc: '伏地魔在食死徒左前臂上烙下的标记——一颗骷髅头口中吐出一条蛇。伏地魔通过黑魔标记召唤食死徒：当他触碰任何食死徒的标记时，所有食死徒的标记都会灼痛发黑，指引他们幻影移形到主人身边。杀人后食死徒会用"尸骨再现"咒将黑魔标记投射到天空中作为恐怖象征。伏地魔死后标记逐渐褪色但永不完全消失。', destroyed: null },
  { emoji: '🪞', name: '双面镜', nameEn: 'Two-Way Mirror', type: '魔法道具', desc: '一对魔法镜子，持有者可以通过镜子实时见到和交谈对方——类似巫师世界的视频通话。小天狼星将其中一面送给哈利，自己保留另一面。哈利在小天狼星死后才打开礼物，追悔莫及——如果他早用镜子就不会被伏地魔用假象引诱到神秘事务司。后来阿不福思·邓布利多获得了小天狼星的那面，在危急时刻通过它派多比前来营救哈利。', destroyed: null },
  { emoji: '🍀', name: '福灵剂', nameEn: 'Felix Felicis', type: '魔法道具', desc: '也叫"液体幸运"——金色的魔药，饮用后会让人在一段时间内万事顺利、直觉敏锐。极其难以酿造，过量服用会导致鲁莽和过度自信。斯拉格霍恩在六年级的第一堂课上作为奖品送给了酿制出最好的生死水的学生——哈利（在半血王子课本的帮助下）赢得了它。哈利用福灵剂成功说服斯拉格霍恩交出关于魂器的真实记忆。', destroyed: null },
  { emoji: '🧪', name: '复方汤剂', nameEn: 'Polyjuice Potion', type: '魔法道具', desc: '一种高级魔药，饮用后可以在一小时内变成另一个人的样子（需要目标人物的头发或指甲等身体组织）。酿制需要整整一个月，材料包括蛞蝓角、鱼鳃草等罕见成分。赫敏在二年级就成功酿造了它（虽然她自己误用了猫毛变成了猫脸）。复方汤剂在系列中多次出现：克劳奇二世冒充穆迪、三人组潜入魔法部、"七个波特"行动等。', destroyed: null },
  { emoji: '👂', name: '伸缩耳', nameEn: 'Extendable Ears', type: '魔法道具', desc: '弗雷德和乔治·韦斯莱的发明——一种可以延伸的肉色绳状装置，一端放在耳边、另一端放到想偷听的地方。凤凰社成员们在格里莫广场12号开会时，韦斯莱家的孩子们就用伸缩耳偷听情报。莫丽·韦斯莱没收了好几副，但双胞胎总有更多。后来赫敏对它进行了改良，增加了更强的窃听能力。', destroyed: null },
  { emoji: '🤧', name: '速效翘课糖', nameEn: 'Skiving Snackboxes', type: '魔法道具', desc: '弗雷德和乔治的得意之作——一系列双头糖果，吃一头会立刻出现症状（流鼻血、发烧、呕吐等），吃另一头症状立即消失。包括流鼻血牛轧糖、发烧软糖、呕吐奶油等。在乌姆里奇统治霍格沃茨期间，这些糖果成为学生们对抗暴政的秘密武器——几乎所有人都用它翘掉了乌姆里奇的课。韦斯莱魔法把戏坊的畅销产品。', destroyed: null },
  { emoji: '🔦', name: '熄灯器', nameEn: 'Deluminator', type: '传奇物品', desc: '邓布利多发明的独特装置——外形类似打火机，可以吸收附近的光源并在需要时释放。但它最特殊的功能直到最后才揭示：当持有者的名字被某个重要的人提到时，熄灯器会发出引导之光，带领持有者找到那个人。邓布利多将它遗赠给罗恩——在罗恩因魂器影响离开后，正是赫敏提到了他的名字，熄灯器引导罗恩找到了哈利和赫敏，实现了三人组的重聚。', destroyed: null },
  { emoji: '🏍️', name: '小天狼星的飞行摩托车', nameEn: "Sirius Black's Flying Motorcycle", type: '魔法道具', desc: '小天狼星的标志性交通工具——一辆被施了飞行魔法的巨大黑色摩托车。1981年万圣节之夜，海格正是骑着这辆摩托车将婴儿哈利从戈德里克山谷的废墟中救出，送到女贞路4号。十六年后的"七个波特"行动中，海格再次驾驶这辆摩托车（由亚瑟·韦斯莱升级了龙火喷射等防御功能）载着真正的哈利突围。在空战中摩托车最终坠毁。', destroyed: '"七个波特"行动中坠毁' },
  { emoji: '🎩', name: '分院帽', nameEn: 'Sorting Hat', type: '传奇物品', desc: '戈德里克·格兰芬多的旧帽子，被四位创始人施了魔法使其拥有智慧和判断力。每年开学时它会为新生分配学院——它能读取佩戴者内心深处的品质和愿望。帽子尊重佩戴者的意愿——哈利恳求"不要斯莱特林"时它选择了格兰芬多。在危急时刻，真正的格兰芬多人可以从帽中抽出格兰芬多之剑。每年开学宴上分院帽还会唱一首自创歌曲，有时还会发出关于学院团结的警告。', destroyed: null },
  { emoji: '🚂', name: '霍格沃茨特快列车', nameEn: 'Hogwarts Express', type: '传奇物品', desc: '一列猩红色蒸汽火车，每年9月1日从伦敦国王十字车站九又四分之三站台出发，将学生们送往霍格沃茨。对每一个巫师来说，穿过九又四分之三站台的砖墙、第一次看到猩红色火车头的那一刻，是他们魔法人生的真正起点。车上有女巫推车售卖巧克力蛙、比比多味豆等零食。哈利与罗恩的友谊就始于霍格沃茨特快列车的车厢中。', destroyed: null },
  { emoji: '🌫️', name: '神秘事务司帷幕', nameEn: 'The Veil', type: '传奇物品', desc: '魔法部神秘事务司死亡室中一个石拱门上悬挂的破旧帷幕——它是生与死之间的神秘边界。帷幕会轻轻飘动，仿佛有微风（但死亡室里没有风）。卢娜和哈利可以听到帷幕后面微弱的低语声——那是逝者的声音。小天狼星在决斗中被贝拉特里克斯的咒语击中后坠入帷幕，永远消失。这个古老的神秘装置是魔法世界中对死亡本质研究最深入的文物之一。', destroyed: null },
  { emoji: '🧦', name: '自由的衣物', nameEn: 'Clothes for Freedom', type: '魔法道具', desc: '在巫师法律中，主人递给家养小精灵一件衣物就意味着解放它——从此小精灵获得自由，不再受主人的约束。哈利把里德尔日记藏在袜子里递给卢修斯·马尔福，后者将袜子丢给了多比——多比因此获得了自由。赫敏一度痴迷于解放家养小精灵（S.P.E.W.运动），她织了无数顶小帽子藏在格兰芬多公共休息室里，导致其他小精灵不愿来打扫——只有多比不介意"免费收集帽子"。', destroyed: null },
]

export default function MagicItems() {
  useDocumentHead({
    title: '⚗️ 魔法物品',
    titleEn: 'Magical Items — Legendary Artifacts Encyclopedia',
    description: '魔法世界传奇物品百科 — 死亡圣器、七大魂器、活点地图、格兰芬多之剑等经典物品详解。',
    descriptionEn: "Legendary magical items encyclopedia — the Deathly Hallows, Horcruxes, Marauder's Map, Sword of Gryffindor & more iconic artifacts.",
    keywords: '哈利波特魔法物品,死亡圣器,魂器,老魔杖,隐形衣,复活石,活点地图',
    keywordsEn: "Deathly Hallows,Horcruxes,Elder Wand,Invisibility Cloak,Resurrection Stone,Marauder's Map,Harry Potter items",
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const types = ['all', '魂器', '死亡圣器', '魔法道具', '传奇物品', '魂器/圣器', '黑暗物品']

  const filtered = magicItems.filter(item => {
    const matchesSearch = search === '' ||
      item.name.includes(search) ||
      item.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.includes(search)
    const matchesType = filter === 'all' || item.type === filter
    return matchesSearch && matchesType
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">⚗️ 魔法物品</h1>
      <p className="page-subtitle">从死亡圣器到活点地图，魔法世界中最传奇的物品</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录物品', value: `${magicItems.length} 件`, icon: '⚗️' },
        { label: '魂器', value: `${magicItems.filter(i => i.type === '魂器').length + 1} 件`, icon: '💀' },
        { label: '死亡圣器', value: '3 件', icon: '△' },
        { label: '传奇物品', value: `${magicItems.filter(i => i.type === '魔法道具' || i.type === '传奇物品').length} 件`, icon: '✨' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索物品名称..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {types.map(t => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t === 'all' ? '✨ 全部' : t === '魂器' ? '💀 魂器' : t === '死亡圣器' ? '△ 死亡圣器' : t === '魔法道具' ? '🔧 魔法道具' : t === '传奇物品' ? '⭐ 传奇物品' : t === '魂器/圣器' ? '💍 魂器/圣器' : '🧿 黑暗物品'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((item, i) => (
          <div key={i} className="magic-item-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
            <div className="spell-card-header">
              <span className="spell-icon">{item.emoji}</span>
              <div>
                <h3 className="spell-name">{item.name}</h3>
                <div className="spell-name-en">{item.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: item.type === '魂器' ? 'rgba(231,76,60,0.15)' :
                    item.type === '死亡圣器' ? 'rgba(155,89,182,0.15)' :
                    item.type === '魂器/圣器' ? 'rgba(243,156,18,0.15)' :
                    item.type === '黑暗物品' ? 'rgba(45,52,54,0.15)' : 'rgba(52,152,219,0.15)',
                  color: item.type === '魂器' ? '#e74c3c' :
                    item.type === '死亡圣器' ? '#9b59b6' :
                    item.type === '魂器/圣器' ? '#f39c12' :
                    item.type === '黑暗物品' ? '#636e72' : '#3498db',
                  borderColor: item.type === '魂器' ? 'rgba(231,76,60,0.3)' :
                    item.type === '死亡圣器' ? 'rgba(155,89,182,0.3)' :
                    item.type === '魂器/圣器' ? 'rgba(243,156,18,0.3)' :
                    item.type === '黑暗物品' ? 'rgba(45,52,54,0.3)' : 'rgba(52,152,219,0.3)',
                }}>
                  {item.type}
                </span>
              </div>
              <p className="spell-desc">{item.desc}</p>
              {item.destroyed && (
                <div style={{
                  marginTop: '8px',
                  padding: '4px 10px',
                  background: 'rgba(231,76,60,0.08)',
                  borderRadius: '8px',
                  fontSize: '0.7rem',
                  color: '#e74c3c',
                }}>
                  ⚔️ 摧毁方式：{item.destroyed}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的魔法物品...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>⚗️ 共收录 <strong>{magicItems.length}</strong> 件传奇魔法物品，含魂器摧毁方式等详细信息</p>
      </div>

      <WikiCrossLinks currentPath="/world/items" />
    </div>
  )
}
