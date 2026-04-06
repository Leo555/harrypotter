// 全站搜索引擎 — 统一检索所有数据源
import { characters, houses } from '../data/characters'
import { getNewsSync } from '../data/news'
import books from '../data/books'
import movies from '../data/movies'
import { spells } from '../data/spells'
import potions from '../data/potions'
import { extraStories } from '../data/extraStories'

// 内联数据：生物、物品、地点（与页面组件保持一致的完整版描述，便于全文搜索）
const creatures = [
  { emoji: '🐉', name: '龙', nameEn: 'Dragon', desc: '最壮观的魔法生物之一，已知有十个品种，包括匈牙利树蜂龙、瑞典短鼻龙等。龙的心弦是三种魔杖芯之一，龙血有十二种已知用途（由邓布利多发现）。在三强争霸赛中，参赛者需要绕过龙来获取金蛋。', danger: '极危险', classification: 'XXXXX', habitat: '山地、荒野' },
  { emoji: '🦅', name: '鹰头马身有翼兽', nameEn: 'Hippogriff', desc: '马身鹰头的骄傲生物，接近时必须鞠躬表示尊重。巴克比克是最著名的鹰头马身有翼兽，曾被冤判死刑后被哈利和赫敏用时间转换器救出，此后成为小天狼星的坐骑。', danger: '危险', classification: 'XXX', habitat: '开阔草地' },
  { emoji: '🐦', name: '凤凰', nameEn: 'Phoenix', desc: '能够在火焰中重生的不朽之鸟。凤凰泪有强大的治愈能力，邓布利多的福克斯是最著名的凤凰。福克斯的两根尾羽分别成为哈利和伏地魔魔杖的芯，导致两根魔杖无法正面对决（闪回咒）。', danger: '有趣', classification: 'XXXX', habitat: '山峰高处' },
  { emoji: '🦄', name: '独角兽', nameEn: 'Unicorn', desc: '纯洁而美丽的生物，银色血液有延续生命的力量，但饮用者将从此被诅咒过着半死不活的生活。幼年独角兽是金色的，两岁时变为银色，四岁时变为纯白色。独角兽更亲近女性。', danger: '无害', classification: 'XXXX', habitat: '禁林深处' },
  { emoji: '🕷️', name: '八眼蜘蛛', nameEn: 'Acromantula', desc: '能说人话的巨型蜘蛛，体长可达15英尺。海格的宠物阿拉戈克就是一只八眼蜘蛛，在禁林深处建立了庞大的蛛群。它们极度惧怕蛇怪，这是它们唯一的天敌。', danger: '极危险', classification: 'XXXXX', habitat: '热带丛林、禁林' },
  { emoji: '👻', name: '摄魂怪', nameEn: 'Dementor', desc: '阿兹卡班的守卫，能吸取人类的快乐和希望。它们在靠近时会使周围变得冰冷、绝望。最可怕的攻击是"摄魂怪之吻"——直接吸取受害者的灵魂。唯一已知的防御方法是守护神咒。', danger: '极危险', classification: 'Non-being', habitat: '阿兹卡班' },
  { emoji: '🧝', name: '家养小精灵', nameEn: 'House-elf', desc: '服务于巫师家族的忠诚生物，拥有强大的魔法但受到奴役契约束缚。只有收到主人赠予的衣物才能获得自由。多比是最著名的家养小精灵，被哈利解放后成为自由精灵。赫敏创建了S.P.E.W（家养小精灵权益促进会）。', danger: '无害', classification: 'Being', habitat: '巫师宅邸' },
  { emoji: '🐍', name: '蛇怪', nameEn: 'Basilisk', desc: '蛇之王，由蛇佬腔使用者将蟾蜍蛋放在母鸡下面孵化而成。直视其眼睛会立即死亡，间接看到（如通过镜子或水面）则只会被石化。公鸡的啼鸣是它的致命弱点。密室中的蛇怪已存活近千年。', danger: '极危险', classification: 'XXXXX', habitat: '密室' },
  { emoji: '🐎', name: '夜骐', nameEn: 'Thestral', desc: '只有见证过死亡的人才能看到的骨瘦如柴的飞马。外表虽然可怕——黑色皮包骨，蝙蝠翅膀，白色无瞳眼睛——但性情温顺且极其聪明。霍格沃茨的马车就是由夜骐牵引的。哈利直到五年级才能看到它们。', danger: '危险', classification: 'XXXX', habitat: '禁林' },
  { emoji: '🧚', name: '康沃尔小仙子', nameEn: 'Cornish Pixie', desc: '蓝色的小型捣蛋精灵，身高约8英寸，非常吵闹且喜欢制造混乱。洛哈特在第一堂黑魔法防御术课上释放了一箱小仙子，结果完全无法控制。赫敏用冻结咒将它们制服。', danger: '烦人', classification: 'XXX', habitat: '康沃尔' },
  { emoji: '🐺', name: '狼人', nameEn: 'Werewolf', desc: '被狼人咬伤后受诅咒的巫师，在满月时会不受控制地变身为狼。芬里尔·格雷伯克是最臭名昭著的狼人，卢平教授是最著名的善良狼人。狼毒药剂可以让狼人在变身时保持理智。', danger: '极危险', classification: 'XXXXX', habitat: '各地' },
  { emoji: '🔥', name: '三头犬', nameEn: 'Fluffy (Three-Headed Dog)', desc: '海格的宠物三头犬路威，负责看守通往魔法石的活板门。它唯一的弱点是音乐——听到音乐就会沉沉睡去。海格从一个希腊人手里买下了它。', danger: '极危险', classification: 'XXXXX', habitat: '霍格沃茨（曾经）' },
  { emoji: '🦎', name: '火螃蟹', nameEn: 'Fire Crab', desc: '外形像一只巨大的乌龟，背壳镶满宝石。当受到威胁时，火螃蟹会从身体后部喷射火焰进行防御。它的壳常被非法用来制作坩埚，在黑市上价值不菲。海格在奇兽饲育学课上曾展示过这种生物。', danger: '危险', classification: 'XXX', habitat: '斐济沿海' },
  { emoji: '🐸', name: '曼德拉草', nameEn: 'Mandrake', desc: '外形像一个丑陋的婴儿与植物的混合体。成年曼德拉草的叫声可以杀死听到的人，幼年的叫声只会使人昏迷。曼德拉草是恢复被石化者的关键药材。二年级时斯普劳特教授让学生们种植和照料曼德拉草——纳威听到它的尖叫后直接昏倒了。', danger: '危险', classification: 'XXX', habitat: '温室栽培' },
  { emoji: '🌊', name: '人鱼', nameEn: 'Merpeople', desc: '居住在霍格沃茨湖底的水生智慧种族，拥有自己的语言和社会结构。他们的歌声在水中优美动听，但在空气中听起来像刺耳的尖叫。在三强争霸赛的第二项任务中，选手需要潜入湖底从人鱼手中解救人质。人鱼以长矛和石器为武器，不受魔法部管辖。', danger: '危险', classification: 'XXXX', habitat: '霍格沃茨湖' },
  { emoji: '🔮', name: '半人马', nameEn: 'Centaur', desc: '上半身为人、下半身为马的智慧生物，精通星象学和占卜术。霍格沃茨禁林中生活着一群半人马——弗伦泽因为背人类（哈利）而被族群放逐，后在霍格沃茨担任占卜课教授。半人马非常骄傲，不愿被归类为"生物"，自认为是"存在"。', danger: '危险', classification: 'XXXX', habitat: '禁林' },
  { emoji: '🪲', name: '嗅嗅', nameEn: 'Niffler', desc: '外形像鸭嘴兽的小型生物，长着黑色绒毛和扁平的嘴巴，对一切闪亮的东西有着不可抗拒的执念。它们的肚子上有一个神奇的袋子（像无底洞一样），能装下远超体型的财宝。在《神奇动物在哪里》中，纽特·斯卡曼德的嗅嗅多次因偷闪亮物品惹麻烦。', danger: '无害', classification: 'XXX', habitat: '英国各地' },
  { emoji: '🐦‍🔥', name: '雷鸟', nameEn: 'Thunderbird', desc: '北美洲的巨型魔法鸟类，能在飞行时制造风暴。雷鸟的尾羽是极为强力的魔杖核心材料，伊尔弗莫尼魔法学校的四大学院之一就以雷鸟命名。弗兰克是纽特·斯卡曼德营救过的一只雷鸟，最终被放归亚利桑那沙漠。', danger: '危险', classification: 'XXXX', habitat: '北美荒野' },
  { emoji: '🐉', name: '角尾龙', nameEn: 'Hungarian Horntail', desc: '最危险的龙种之一，也是已知所有龙中最凶猛的。匈牙利树蜂龙拥有铜色的角、蝙蝠般的翅膀和带刺的尾巴，能喷出50英尺远的火焰。哈利在三强争霸赛第一项任务中面对的就是一头匈牙利树蜂龙——他用飞行技巧和召唤来的火弩箭与其周旋。', danger: '极危险', classification: 'XXXXX', habitat: '匈牙利山地' },
]

const magicItems = [
  { emoji: '📔', name: '汤姆·里德尔的日记', nameEn: "Tom Riddle's Diary", type: '魂器', desc: '伏地魔创造的第一个魂器，记录着年少时代的里德尔。日记中潜藏着16岁汤姆·里德尔的灵魂碎片，它曾控制金妮·韦斯莱打开密室释放蛇怪。哈利在密室中用蛇怪的毒牙将其刺穿摧毁——这是第一个被摧毁的魂器。' },
  { emoji: '💍', name: '马沃罗·冈特的戒指', nameEn: "Marvolo Gaunt's Ring", type: '魂器/圣器', desc: '冈特家族的传家宝，镶有佩弗利尔家族的标记（实为复活石）。伏地魔杀害父亲后将其制成魂器。邓布利多在冈特旧宅找到并用格兰芬多之剑摧毁它，但戒指上的致命诅咒使他的手变黑枯萎，只剩一年寿命。' },
  { emoji: '🏆', name: '赫奇帕奇的金杯', nameEn: "Hufflepuff's Cup", type: '魂器', desc: '赫尔加·赫奇帕奇的遗物，一个小型金杯，具有特殊魔法属性。伏地魔杀害赫普兹巴·史密斯后偷走了它，存放在贝拉特里克斯·莱斯特兰奇在古灵阁的高安全等级金库中。' },
  { emoji: '👑', name: '拉文克劳的冠冕', nameEn: "Ravenclaw's Diadem", type: '魂器', desc: '罗伊纳·拉文克劳的冠冕，据说能增强佩戴者的智慧，上面刻着"超凡的智慧是人类最大的财富"。失踪数百年后被伏地魔找到并制成魂器，藏于霍格沃茨有求必应室。' },
  { emoji: '🐍', name: '斯莱特林的挂坠盒', nameEn: "Slytherin's Locket", type: '魂器', desc: '萨拉查·斯莱特林的遗物。R.A.B（雷古勒斯·布莱克）牺牲自己从洞穴中取出并替换了假货。真正的挂坠盒辗转到了蒙顿格斯手中，后被乌姆里奇获得。三人组潜入魔法部将其取回，罗恩用格兰芬多之剑将其摧毁。' },
  { emoji: '⚡', name: '哈利·波特（活魂器）', nameEn: 'Harry Potter (Living Horcrux)', type: '魂器', desc: '伏地魔无意中创造的第七个魂器。1981年当索命咒反弹时，伏地魔不稳定的灵魂碎片嵌入了婴儿哈利体内。这赋予了哈利蛇佬腔能力和与伏地魔的精神连接。哈利在禁林中坦然赴死，伏地魔的索命咒只摧毁了魂器碎片。' },
  { emoji: '🐍', name: '娜吉尼', nameEn: 'Nagini', type: '魂器', desc: '伏地魔的蛇宠和最后一个有意创造的魂器。娜吉尼实际上是一个被血咒诅咒、永久变成蛇的女人（马尔迪克图斯）。她执行了伏地魔的多个命令，包括杀害斯内普。' },
  { emoji: '🪄', name: '老魔杖（接骨木魔杖）', nameEn: 'The Elder Wand', type: '死亡圣器', desc: '三件死亡圣器中最强大的一件，据说由死亡本身所造。这根魔杖的忠诚只属于打败其前任主人的巫师。从安提俄克·佩弗利尔到格林德沃到邓布利多，直到德拉科缴了邓布利多的械，再到哈利缴了德拉科的械——最终老魔杖效忠于哈利。' },
  { emoji: '🧥', name: '隐形衣', nameEn: 'Cloak of Invisibility', type: '死亡圣器', desc: '三件死亡圣器之一，由最小的佩弗利尔兄弟伊格诺图斯获得，此后在波特家族世代相传。与普通隐形衣不同，它永不褪色、永不失效，甚至连死亡都无法透过它。邓布利多曾借用研究后归还给哈利。' },
  { emoji: '💎', name: '复活石', nameEn: 'Resurrection Stone', type: '死亡圣器', desc: '三件死亡圣器之一，能召唤已逝之人的灵魂影像（非真正复活）。它被镶在冈特戒指中，后被邓布利多取出。哈利在走向禁林面对伏地魔时转动复活石，见到了父母、小天狼星和卢平的灵魂陪伴他走完最后的路。' },
  { emoji: '🗺️', name: '活点地图', nameEn: "Marauder's Map", type: '魔法道具', desc: '由掠夺者（尖头叉子詹姆、大脚板小天狼星、月亮脸卢平、虫尾巴彼得）在学生时代创造。激活咒语"我庄严宣誓我绝不干好事"，关闭咒语"恶作剧完成"。能实时显示霍格沃茨内所有人的位置，无论其使用隐形衣还是复方汤剂。' },
  { emoji: '⏰', name: '时间转换器', nameEn: 'Time-Turner', type: '魔法道具', desc: '沙漏形魔法装置，每转一圈可以回到一小时前。赫敏在三年级获得许可使用它来上额外课程，后来用它帮助拯救了小天狼星和巴克比克。魔法部神秘事务司存有大量时间转换器，在五年级的战斗中全部被毁。' },
  { emoji: '🪞', name: '厄里斯魔镜', nameEn: 'Mirror of Erised', type: '魔法道具', desc: '能显示观看者内心最深切渴望的魔镜。镜框上刻着"Erised stra ehru oyt ube cafru oyt on wohsi"（倒写的"I show not your face but your heart\'s desire"）。邓布利多在镜中看到自己的家人团聚，哈利看到了父母。' },
  { emoji: '🗡️', name: '格兰芬多之剑', nameEn: 'Sword of Gryffindor', type: '传奇物品', desc: '由妖精工匠格里菲克用精灵银打造，它会在真正的格兰芬多人有需要时出现。剑会吸收让它变强的物质——哈利用它杀死蛇怪后，剑浸透了蛇怪毒液，因此能够摧毁魂器。它先后被哈利、邓布利多、罗恩和纳威使用。' },
  { emoji: '🧹', name: '火弩箭', nameEn: 'Firebolt', type: '魔法道具', desc: '世界上最快的竞赛飞天扫帚，10秒内可加速到150英里/小时。由小天狼星作为圣诞礼物匿名送给哈利。曾被麦格教授没收检查是否被施了恶咒（让哈利和赫敏产生了短暂的矛盾）。在"七个波特"行动中被毁。' },
  { emoji: '📻', name: '波特守望', nameEn: 'Potterwatch', type: '魔法道具', desc: '第二次巫师战争期间由凤凰社成员运营的秘密广播节目。使用密码才能收听（如"疯眼汉"），由李·乔丹主持，弗雷德和乔治参与。节目为躲藏中的人提供真实的战争消息、失踪者名单和鼓舞士气的信息——在预言家日报被控制的黑暗时期，它是人们获得真相的唯一渠道。' },
  { emoji: '🔮', name: '预言球', nameEn: 'Prophecy Orb', type: '魔法道具', desc: '魔法部神秘事务司预言厅中保存的水晶球，记录了有关哈利和伏地魔的完整预言。只有预言涉及的当事人才能安全地取下它。伏地魔为了得到完整预言而引诱哈利前往神秘事务司，导致了那场改变了一切的战斗。预言球在混战中被打碎。' },
  { emoji: '📜', name: '韦斯莱魔法把戏坊发明', nameEn: "Weasleys' Wizard Wheezes Products", type: '魔法道具', desc: '弗雷德和乔治·韦斯莱发明的一系列恶作剧和防护道具。速效翘课糖（流鼻血太妃糖、发烧软糖等）可以让学生快速"生病"翘课；伸缩耳用于偷听远处的对话；便携沼泽可以在任何地方制造一片真正的沼泽。战时他们还研发了盾帽和隐形斗篷等防护装备。' },
  { emoji: '🪙', name: 'DA联络金币', nameEn: "Dumbledore's Army Coins", type: '魔法道具', desc: '赫敏制作的联络金币，外观与普通金加隆完全相同，但边缘的数字会随着哈利的信号而变化发热。这是赫敏将变形咒应用于实物通讯的天才发明——灵感来自伏地魔的黑魔标记。DA的所有成员人手一枚，用于通知集会时间和地点。纳威在七年级用它召集DA成员参与霍格沃茨大战。' },
  { emoji: '🏆', name: '三强争霸赛杯', nameEn: 'Triwizard Cup', type: '魔法道具', desc: '三强争霸赛的最终奖杯，在第三项任务——迷宫中等待最先到达的选手。然而在1994年的比赛中，冒牌穆迪（克劳奇二世）将奖杯变成了门钥匙，将同时触碰到奖杯的哈利和塞德里克传送到小汉格顿墓地。塞德里克被虫尾巴杀害，伏地魔在这里重获肉体。' },
  { emoji: '💌', name: '吼叫信', nameEn: 'Howler', type: '魔法道具', desc: '一种特殊的巫师邮件，如果不及时打开会自动爆炸。打开后会以发信人的声音（放大数十倍）大声怒吼其中的内容。莫丽·韦斯莱在罗恩和哈利飞车去学校后寄了一封经典的吼叫信，在大厅里当着所有人的面怒吼，让罗恩恨不得钻到地缝里。' },
]

const places = [
  { emoji: '🏰', name: '霍格沃茨魔法学校', nameEn: 'Hogwarts School', location: '苏格兰高地', type: '学校', desc: '全世界最著名的魔法学校，约于公元990年由戈德里克·格兰芬多、赫尔加·赫奇帕奇、罗伊纳·拉文克劳和萨拉查·斯莱特林四人共同创建。城堡拥有142道楼梯（其中有些会移动）、无数密室和秘道。对麻瓜来说，它看起来只是一片危险的废墟和"禁止入内"的标志。七楼的有求必应室会根据需求变化形态。' },
  { emoji: '🏘️', name: '对角巷', nameEn: 'Diagon Alley', location: '伦敦', type: '商业区', desc: '英国巫师界的商业中心，隐藏在破釜酒吧后面的砖墙之后。用魔杖按特定顺序敲击砖块即可进入。这里有奥利凡德魔杖店（创立于公元前382年）、古灵阁巫师银行、丽痕书店、韦斯莱魔法把戏坊、品质魁地奇用品商店、摩金夫人长袍专卖店等。' },
  { emoji: '🏦', name: '古灵阁巫师银行', nameEn: 'Gringotts', location: '对角巷', type: '银行', desc: '由妖精经营的巫师银行，白色大理石建筑矗立在对角巷最高处。入口处刻有警告诗："来此寻宝者，请你三思而后行。贪得无厌的人，将得到应有的报应。"地下金库由地下矿车连接，高安全等级金库有龙看守。哈利一行曾骑龙逃离古灵阁。' },
  { emoji: '🏚️', name: '翻倒巷', nameEn: 'Knockturn Alley', location: '伦敦', type: '商业区', desc: '对角巷旁的一条阴暗小巷，专售黑魔法物品和可疑商品。博金-博克商店是这里最著名的店铺，年轻时代的伏地魔曾在此工作。消失柜的另一半就在博金-博克店中，德拉科利用它让食死徒入侵霍格沃茨。' },
  { emoji: '🚂', name: '九又四分之三站台', nameEn: 'Platform 9¾', location: '伦敦国王十字车站', type: '交通枢纽', desc: '隐藏在9号和10号站台之间的魔法站台，是霍格沃茨特快列车的始发站。巫师需要直接穿过两站台之间的隔墙才能到达（最好跑着穿过去）。红色的霍格沃茨特快列车每年9月1日上午11点准时发车。多比曾封锁了入口阻止哈利和罗恩。' },
  { emoji: '🏠', name: '陋居', nameEn: 'The Burrow', location: '英格兰德文郡奥特里圣卡奇波尔', type: '住宅', desc: '韦斯莱家族的住所，一栋由魔法支撑的歪歪斜斜的多层建筑。每层好像都是后来加建的，充满了温暖和混乱。厨房有一个神奇的时钟，指针指向家庭成员而非数字。这里的花园里有地精出没。对哈利来说，这是他第一个真正有家的感觉的地方。' },
  { emoji: '🏢', name: '魔法部', nameEn: 'Ministry of Magic', location: '伦敦地下', type: '政府机构', desc: '英国魔法界的政府机关，位于伦敦地下。访客入口是一个旧电话亭，拨打62442（MAGIC）即可进入。大厅中央有一座"魔法即是力量"的喷泉（后被重建）。内部设有魔法法律执行司、神秘事务司（预言厅所在地）、魔法游戏和运动司等部门。' },
  { emoji: '⛓️', name: '阿兹卡班', nameEn: 'Azkaban', location: '北海小岛', type: '监狱', desc: '巫师世界最恐怖的监狱，位于北海中一座冰冷荒凉的小岛上。原由摄魂怪看守，囚犯在其中会丧失一切快乐的记忆，许多人因此发疯。小天狼星是已知第一个越狱成功者（靠阿尼马格斯形态）。伏地魔掌权后释放了大量食死徒囚犯。' },
  { emoji: '🏡', name: '格里莫广场12号', nameEn: '12 Grimmauld Place', location: '伦敦', type: '住宅/总部', desc: '布莱克家族的祖宅，被忠诚赤胆咒保护，只有知道具体地址的人才能看到这栋房子（它会在11号和13号之间挤出来）。后成为凤凰社总部。房内有布莱克夫人永远尖叫的画像、家养小精灵克利切、以及一棵记录血统的家族树挂毯。' },
  { emoji: '🌳', name: '禁林', nameEn: 'Forbidden Forest', location: '霍格沃茨校园', type: '森林', desc: '霍格沃茨校园边的广袤危险森林，栖息着独角兽、半人马（弗伦泽和群落）、八眼蜘蛛（阿拉戈克的后代）、夜骐等神奇生物。学生被严禁进入，但哈利几乎每年都会踏足。这里也是哈利最后走向"赴死"的地方。' },
  { emoji: '🏘️', name: '霍格莫德村', nameEn: 'Hogsmeade', location: '苏格兰', type: '村庄', desc: '英国唯一一个纯巫师居住的村庄，三年级以上学生在周末可以凭许可证前往。著名地点包括三把扫帚酒吧（罗斯默塔夫人经营）、猪头酒吧（邓布利多的弟弟阿不福思经营）、蜂蜜公爵糖果店、佐科恶作剧商店和尖叫棚屋。' },
  { emoji: '🌿', name: '戈德里克山谷', nameEn: "Godric's Hollow", location: '英格兰西部', type: '村庄', desc: '格兰芬多和邓布利多家族的故乡，也是波特一家最后的住所。1981年万圣节之夜，伏地魔在此杀害了詹姆和莉莉·波特。波特家的废墟被保留为纪念碑，村中广场有波特一家三口的雕像。教堂墓地中有肯德拉和阿利安娜·邓布利多的墓碑。' },
  { emoji: '🏥', name: '圣芒戈魔法伤病医院', nameEn: "St Mungo's Hospital", location: '伦敦', type: '医疗机构', desc: '英国魔法世界的主要医院，隐藏在伦敦一家废弃的百货公司——珀斯和道恩精品百货——后面。访客需要对着橱窗里的人体模型说明来意才能进入。医院分为多个科室：魔咒损伤科、魔法生物伤害科、魔药和植物中毒科等。纳威的父母弗兰克和爱丽丝·隆巴顿就长期住在这里的永久损伤科。' },
  { emoji: '🗼', name: '布斯巴顿魔法学院', nameEn: 'Beauxbatons Academy', location: '法国（比利牛斯山脉）', type: '学校', desc: '法国顶级魔法学校，位于比利牛斯山脉中一座华丽的宫殿里。布斯巴顿以其优雅精致著称，学生乘坐由阿布拉克萨斯飞马拉的巨大马车来往。芙蓉·德拉库尔就来自这所学校。校长是女巨人血统的奥林佩·马克西姆夫人，身材几乎和海格一样高大。' },
  { emoji: '⛵', name: '德姆斯特朗学院', nameEn: 'Durmstrang Institute', location: '北欧（具体位置保密）', type: '学校', desc: '北欧著名魔法学校，以教授黑魔法（而非仅仅防御黑魔法）而闻名。学校的位置是严格保密的——学生被禁止告诉任何人学校在哪里。维克多·克鲁姆是德姆斯特朗最著名的学生，前校长卡卡洛夫曾是食死徒。格林德沃也曾在这里就读。' },
  { emoji: '🏖️', name: '贝壳小屋', nameEn: 'Shell Cottage', location: '康沃尔海岸', type: '住宅', desc: '比尔·韦斯莱和芙蓉·德拉库尔的海边小屋，成为了三人组在逃亡途中最重要的避难所。多比在从马尔福庄园营救哈利等人后就死在了这里的花园中。哈利在这里亲手为多比挖掘了坟墓——"这里安葬着多比，一个自由的精灵。"贝壳小屋也是他们策划闯入古灵阁的据点。' },
  { emoji: '🏚️', name: '尖叫棚屋', nameEn: 'Shrieking Shack', location: '霍格莫德', type: '建筑', desc: '被认为是全英国闹鬼最凶的建筑，实际上是邓布利多为卢平建造的变身安全屋。每月满月时卢平穿过打人柳下的秘密通道来到这里变身，痛苦的嚎叫声让居民们以为这里有凶恶的幽灵。这里是哈利第一次见到小天狼星和真相大白的地方，也是斯内普最后被蛇妖娜吉尼杀害的地点。' },
  { emoji: '🕸️', name: '马尔福庄园', nameEn: 'Malfoy Manor', location: '英格兰威尔特郡', type: '住宅', desc: '马尔福家族的豪华庄园，在第二次巫师战争中被伏地魔征用为食死徒总部。地下室关押过奥利凡德先生、卢娜·洛夫古德和拉环等人。赫敏在这里被贝拉特里克斯严刑拷打，多比在营救行动中从这里带走了所有人，但自己被贝拉特里克斯的银刀击中身亡。' },
  { emoji: '🌑', name: '洞穴（魂器藏匿处）', nameEn: 'The Cave', location: '英格兰海岸', type: '秘密地点', desc: '伏地魔在童年时发现的海边洞穴，后来被他用来藏匿斯莱特林的挂坠盒魂器。洞穴入口需要用血才能打开，里面是一个巨大的地下湖，中央小岛上有一个石盆盛满了致命的翠绿色药水。邓布利多必须喝下所有药水才能取出（假的）魂器——这些药水让他重历了最痛苦的记忆，极度虚弱。' },
]

// 搜索分类定义
const CATEGORIES = {
  characters: { label: '🧙 人物', path: id => `/characters/${id}` },
  books: { label: '📚 书籍', path: id => `/books/${id}` },
  movies: { label: '🎬 电影', path: id => `/movies/${id}` },
  spells: { label: '✨ 咒语', path: () => '/world/spells' },
  creatures: { label: '🐉 生物', path: () => '/world/creatures' },
  items: { label: '⚗️ 物品', path: () => '/world/items' },
  places: { label: '🗺️ 地点', path: () => '/world/places' },
  potions: { label: '🧪 魔药', path: () => '/world/potions' },
  news: { label: '📰 新闻', path: id => `/news/${id}` },
  stories: { label: '📖 故事', path: () => '/extra-stories' },
}

/**
 * 全站联合搜索
 * @param {string} query - 搜索关键词
 * @returns {Object} 按分类分组的搜索结果
 */
export function searchAll(query) {
  if (!query || query.trim().length === 0) return {}

  const q = query.trim().toLowerCase()
  const results = {}

  // 1. 搜索人物
  const characterResults = characters.filter(c =>
    c.name.includes(q) ||
    c.nameEn.toLowerCase().includes(q) ||
    c.description?.toLowerCase().includes(q) ||
    c.occupation?.includes(q) ||
    c.house?.includes(q) ||
    c.actor?.includes(q) ||
    c.actorEn?.toLowerCase().includes(q) ||
    c.skills?.some(s => s.includes(q))
  ).map(c => ({
    id: c.id,
    title: c.name,
    subtitle: c.nameEn,
    desc: c.description,
    icon: c.avatar,
    path: CATEGORIES.characters.path(c.id),
    tags: [c.occupation, houses[c.house]?.name].filter(Boolean),
  }))
  if (characterResults.length) results.characters = characterResults

  // 2. 搜索书籍
  const bookResults = books.filter(b =>
    b.title.includes(q) ||
    b.titleEn.toLowerCase().includes(q) ||
    b.summary?.toLowerCase().includes(q) ||
    b.themes?.some(t => t.includes(q)) ||
    b.chapters?.some(ch => ch.includes(q))
  ).map(b => ({
    id: b.id,
    title: b.title,
    subtitle: b.titleEn,
    desc: b.summary,
    icon: b.cover,
    path: CATEGORIES.books.path(b.id),
    tags: [`${b.year}年`, `第${b.number}部`],
  }))
  if (bookResults.length) results.books = bookResults

  // 3. 搜索电影
  const movieResults = movies.filter(m =>
    m.title.includes(q) ||
    m.titleEn.toLowerCase().includes(q) ||
    m.summary?.toLowerCase().includes(q) ||
    m.director?.includes(q) ||
    m.directorEn?.toLowerCase().includes(q) ||
    m.cast?.some(c => c.actor.includes(q) || c.role.includes(q) || c.actorEn.toLowerCase().includes(q))
  ).map(m => ({
    id: m.id,
    title: m.title,
    subtitle: m.titleEn,
    desc: m.summary,
    icon: '🎬',
    path: CATEGORIES.movies.path(m.id),
    tags: [`${m.year}年`, m.director],
  }))
  if (movieResults.length) results.movies = movieResults

  // 4. 搜索咒语
  const spellResults = spells.filter(s =>
    s.name.includes(q) ||
    s.nameEn.toLowerCase().includes(q) ||
    s.effect?.includes(q) ||
    s.description?.toLowerCase().includes(q) ||
    s.category?.includes(q)
  ).map(s => ({
    id: s.id,
    title: s.name,
    subtitle: s.nameEn,
    desc: s.effect,
    icon: s.icon,
    path: CATEGORIES.spells.path(),
    tags: [s.type, s.category],
  }))
  if (spellResults.length) results.spells = spellResults

  // 5. 搜索生物
  const creatureResults = creatures.filter(c =>
    c.name.includes(q) ||
    c.nameEn.toLowerCase().includes(q) ||
    c.desc?.toLowerCase().includes(q) ||
    c.danger?.includes(q) ||
    c.habitat?.includes(q)
  ).map(c => ({
    id: c.nameEn,
    title: c.name,
    subtitle: c.nameEn,
    desc: c.desc,
    icon: c.emoji,
    path: CATEGORIES.creatures.path(),
    tags: [c.danger, `分级 ${c.classification}`],
  }))
  if (creatureResults.length) results.creatures = creatureResults

  // 6. 搜索物品
  const itemResults = magicItems.filter(i =>
    i.name.includes(q) ||
    i.nameEn.toLowerCase().includes(q) ||
    i.desc?.toLowerCase().includes(q) ||
    i.type?.includes(q)
  ).map(i => ({
    id: i.nameEn,
    title: i.name,
    subtitle: i.nameEn,
    desc: i.desc,
    icon: i.emoji,
    path: CATEGORIES.items.path(),
    tags: [i.type],
  }))
  if (itemResults.length) results.items = itemResults

  // 7. 搜索地点
  const placeResults = places.filter(p =>
    p.name.includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.desc?.toLowerCase().includes(q) ||
    p.location?.includes(q) ||
    p.type?.includes(q)
  ).map(p => ({
    id: p.nameEn,
    title: p.name,
    subtitle: p.nameEn,
    desc: p.desc,
    icon: p.emoji,
    path: CATEGORIES.places.path(),
    tags: [p.type, `📍 ${p.location}`],
  }))
  if (placeResults.length) results.places = placeResults

  // 8. 搜索魔药
  const potionResults = potions.filter(p =>
    p.name.includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.effect?.includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    p.difficulty?.includes(q)
  ).map(p => ({
    id: p.id,
    title: p.name,
    subtitle: p.nameEn,
    desc: p.effect,
    icon: p.icon,
    path: CATEGORIES.potions.path(),
    tags: [p.difficulty, p.brewTime],
  }))
  if (potionResults.length) results.potions = potionResults

  // 9. 搜索新闻（从动态缓存获取）
  const newsData = getNewsSync()
  const newsResults = newsData.filter(n =>
    n.title.includes(q) ||
    n.summary?.includes(q) ||
    n.content?.toLowerCase().includes(q) ||
    n.category?.includes(q)
  ).map(n => ({
    id: n.id,
    title: n.title,
    subtitle: n.category,
    desc: n.summary,
    icon: n.image,
    path: CATEGORIES.news.path(n.id),
    tags: [n.category, n.date],
  }))
  if (newsResults.length) results.news = newsResults

  // 10. 搜索隐秘故事集
  const storyResults = extraStories.filter(s =>
    s.title.includes(q) ||
    s.titleEn?.toLowerCase().includes(q) ||
    s.description?.toLowerCase().includes(q) ||
    s.category?.includes(q) ||
    s.chapters?.some(ch => ch.title.includes(q) || ch.titleEn?.toLowerCase().includes(q))
  ).map(s => ({
    id: s.id,
    title: s.title,
    subtitle: s.titleEn,
    desc: s.description,
    icon: s.icon,
    path: CATEGORIES.stories.path(),
    tags: [s.category, s.collection],
  }))
  if (storyResults.length) results.stories = storyResults

  return results
}

/**
 * 获取搜索结果总数
 */
export function getResultCount(results) {
  return Object.values(results).reduce((sum, arr) => sum + arr.length, 0)
}

/**
 * 高亮文本中的关键词
 */
export function highlightText(text, query) {
  if (!text || !query) return text
  const q = query.trim()
  if (!q) return text
  // 转义正则特殊字符
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.split(regex)
}

export { CATEGORIES }
