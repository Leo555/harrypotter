# 🧙‍♂️ 哈利波特百科全书网站 — 任务清单

> **愿景**：打造中文互联网最权威、最全面、最美观的哈利波特百科全书网站。

---

## Phase 0：项目基础设施

- [x] **TASK 0**：创建项目 README.md ✅ 2025-04-05

## Phase 1：核心框架升级

- [x] 项目分析与规划
- [x] **TASK 1**：重构网站导航和路由结构 ✅ 2025-04-05
- [x] **TASK 2**：重构首页（Home） ✅ 2025-04-05
- [x] **TASK 3**：SEO 基础设施 ✅ 2025-04-05

## Phase 2：百科内容建设

- [x] **TASK 4**：原著百科模块（7本书数据 + 列表页 + 详情页） ✅ 2025-04-05
- [x] **TASK 5**：电影百科模块（8部电影数据 + 列表页 + 详情页） ✅ 2025-04-05
- [x] **TASK 6**：人物百科大升级 ✅ 2025-04-05
  - [x] TASK 6a：为每位人物撰写详细生平介绍 ✅ 2025-04-05
  - [x] TASK 6b：人物剧照画廊（主要演员 ≥10 张，重要配角 ≥6 张，其他 ≥3 张） ✅ 2025-04-05
  - [x] TASK 6c：人物详情页 UI 升级（传记区 + 演员区 + 剧照画廊） ✅ 2025-04-05

## Phase 3：魔法世界与互动

- [x] **TASK 7**：魔法世界百科（咒语 / 生物 / 物品 / 地点 / 魔药） ✅ 2025-04-05
- [x] **TASK 8**：互动专区（分院帽测试 / 守护神测试 / 魔杖匹配） ✅ 2025-04-05
- [x] **TASK 9**：原著在线阅读器 ✅ 2025-04-05

## Phase 4：完善与优化

- [x] **TASK 10**：全站优化（响应式 / 性能 / 动画 / UI 精细打磨） ✅ 2025-04-05

## Phase 5：内容深度与互联

- [x] **TASK 11**：内容扩充（角色 10→21 / 咒语 15→26 / 魔药 10→17 / 生物 12→20 / 地点 12→20 / 物品 15→22） ✅ 2025-04-06
- [x] **TASK 12**：人物剧照画廊系统 ✅ 2025-04-06
  - [x] TASK 12a：为每位主要人物添加电影剧照画廊（使用渐变色+场景描述视觉方案，17个角色共96张场景） ✅ 2025-04-06
  - [x] TASK 12b：创建剧照画廊 UI 组件（灯箱浏览、前后导航、响应式网格、电影胶片边框效果） ✅ 2025-04-06
  - [x] TASK 12c：在人物详情页集成剧照画廊区域 ✅ 2025-04-06
- [x] **TASK 13**：全站超链接互联 ✅ 2025-04-06
  - [x] TASK 13a：电影演员表 → 人物详情页链接（站内互联） ✅ 2025-04-06
  - [x] TASK 13b：人物详情页演员信息 → IMDb / 豆瓣外链 ✅ 2025-04-06
  - [x] TASK 13c：新闻内容 → 关联电影/人物/书籍页面链接 + 来源外链 ✅ 2025-04-06
  - [x] TASK 13d：电影详情页 → 相关人物卡片展示 ✅ 2025-04-06
- [x] **TASK 14**：内容质量提升 ✅ 2025-04-06
  - [x] TASK 14a：新闻数据补充 source 外链字段 + relatedLinks 关联链接 ✅ 2025-04-06
  - [x] TASK 14b：电影演员表与人物数据 ID 关联映射（roleToCharacterId） ✅ 2025-04-06
  - [x] TASK 14c：全站交叉引用完善 ✅ 2025-04-06
    - 书籍详情 → 对应电影改编链接
    - 电影详情 → 相关人物百科卡片
    - 人物详情 → 出演电影列表
    - 5个百科列表页 → WikiCrossLinks 全站交叉导航组件（咒语/生物/魔药/地点/物品）
    - 新闻详情 → 关联内容链接 + 来源外链

---

## Phase 6：设计质量优化（顶级设计师 Review）

- [x] **TASK 15**：提取可复用 StatsPanel 组件 ✅ 2025-04-06
  - [x] TASK 15a：创建 `StatsPanel.jsx` 通用统计面板组件（含 compact 变体） ✅ 2025-04-06
  - [x] TASK 15b：为统计面板添加完整 CSS 类（`.stats-panel`, `.stat-card` 等） ✅ 2025-04-06
  - [x] TASK 15c：9 个页面统计面板内联样式 → StatsPanel 组件（Books / Movies / Characters / Spells / Creatures / MagicItems / Potions / Places / ReaderShelf） ✅ 2025-04-06
- [x] **TASK 16**：WikiCrossLinks 组件重构 ✅ 2025-04-06
  - [x] TASK 16a：全部内联样式迁移到 CSS 类（`.wiki-cross-links`, `.wiki-cross-link` 等） ✅ 2025-04-06
  - [x] TASK 16b：JS hover → CSS `:hover` 伪类 ✅ 2025-04-06
  - [x] TASK 16c：修复魔药路径 `/potions` → `/world/potions` ✅ 2025-04-06
  - [x] TASK 16d：去除重复"原著阅读"链接（与"原著百科"路径重复） ✅ 2025-04-06
- [x] **TASK 17**：JS hover 效果全站迁移到 CSS `:hover` ✅ 2025-04-06
  - [x] TASK 17a：创建通用 hover CSS 类（`.hover-lift`, `.hover-lift-sm`, `.hover-card-gold`, `.hover-tag-gold`, `.hover-link-underline`, `.hover-slide-right`, `.hover-lift-subtle`, `.hover-border-gold`, `.hover-bg-subtle` 等） ✅ 2025-04-06
  - [x] TASK 17b：10+ 文件 27+ 处 `onMouseEnter`/`onMouseLeave` → CSS 类替换 ✅ 2025-04-06
- [x] **TASK 18**：内联 grid 布局迁移到 CSS 类 ✅ 2025-04-06
  - [x] TASK 18a：创建通用 grid CSS 类（`.grid-auto-140/180/200/260/280/320`） ✅ 2025-04-06
  - [x] TASK 18b：Home / CharacterDetail / MovieDetail / BookDetail / ReaderShelf 内联 grid → CSS 类 ✅ 2025-04-06
- [x] **TASK 19**：角色头像通用样式 ✅ 2025-04-06
  - [x] TASK 19a：创建 `.char-avatar-circle` CSS 类 ✅ 2025-04-06
  - [x] TASK 19b：MovieDetail / Home / BookDetail 内联头像样式 → CSS 类 ✅ 2025-04-06
- [x] **TASK 20**：语义化 CSS 类名修复 ✅ 2025-04-06
  - [x] TASK 20a：为 Creatures / MagicItems / Places / Potions 创建独立语义类名（`.creature-card`, `.magic-item-card`, `.place-card`, `.potion-card`） ✅ 2025-04-06
  - [x] TASK 20b：4 个百科页面 `spell-card` → 语义类名替换 ✅ 2025-04-06

---

> 完成规则：每完成一个 TASK，将 `[ ]` 改为 `[x]` 并标注完成日期。
>
> *"在霍格沃茨，只要有人寻求帮助，帮助就会来到。" — 阿不思·邓布利多*
