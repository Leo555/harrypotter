<p align="center">
  <img src="https://img.shields.io/badge/⚡-哈利波特的魔法世界-d4a843?style=for-the-badge&labelColor=0d0d1f" alt="哈利波特的魔法世界" />
</p>

<h1 align="center">🧙‍♂️ 哈利波特的魔法世界</h1>
<h3 align="center">Harry Potter's Wizarding World</h3>

<p align="center">
  <strong>中文互联网最全面的哈利波特百科全书网站</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite" alt="Vite 5" />
  <img src="https://img.shields.io/badge/React_Router-6.26-ca4245?style=flat-square&logo=reactrouter" alt="React Router 6" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

<p align="center">
  探索魔法世界的每一个角落 — 原著 · 电影 · 人物 · 咒语 · 互动测试
</p>

---

## ✨ 功能特性

| 模块 | 说明 |
|------|------|
| 📚 **原著百科** | 7 部小说完整百科：故事梗概、章节目录、经典名句、关键事件、魔法物品 |
| 🎬 **电影百科** | 8 部电影详细资料：导演、时长、票房、演员表、幕后花絮、经典台词 |
| 🧙 **人物百科** | 50+ 核心人物档案：出生日期、血统、魔杖、守护神、人生轨迹、关系网络 |
| ✨ **咒语大全** | 魔法世界经典咒语收录，支持搜索 & 分类筛选（防御/黑魔法/实用/特殊） |
| 📰 **预言家日报** | 哈利波特最新资讯：影视动态、主题乐园、游戏、活动新闻 |
| 📖 **隐秘故事集** | J.K.罗琳的番外传说：Pottermore Presents 系列、人物背景、魔法世界设定 |
| 🎩 **分院帽测试** | 完整互动测试：10 道题目，四学院匹配度计算，详细学院结果展示 |
| 🦌 **守护神测试** | 即将上线：发现属于你的守护神 |
| 🪄 **魔杖匹配** | 即将上线：找到你的命定之杖 |
| ⏳ **魔法时间线** | 1926-2017 魔法世界百年大事记，融合人物轨迹与世界事件 |

## 🛠️ 技术栈

- **前端框架**：React 18.3 + JSX
- **构建工具**：Vite 5.4
- **路由方案**：React Router 6.26
- **样式方案**：纯 CSS（深色魔法主题 + 四学院配色体系）
- **字体**：Cinzel（英文标题衬线字体）+ Noto Serif SC（中文衬线字体）
- **部署**：纯静态前端，无需后端服务

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0
- **npm** >= 9.0

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/Leo555/harrypotter.git
cd harrypotter

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

### 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新，端口 3000） |
| `npm run build` | 构建生产版本（输出至 `dist/`） |
| `npm run preview` | 预览生产构建结果 |

## 📁 项目结构

```
harrypotter/
├── index.html                 # 入口 HTML
├── package.json               # 项目配置 & 依赖
├── vite.config.js             # Vite 构建配置
├── books/                     # 7 部原著英文全文（TXT，共 ~6.2MB）
│   ├── Book1-..._Sorcerers_Stone.txt
│   ├── ...
│   └── Book7-..._Deathly_Hallows.txt
└── src/
    ├── main.jsx               # 应用入口
    ├── App.jsx                # 路由配置（BrowserRouter）
    ├── components/            # 公共组件
    │   ├── Header.jsx         # 顶部导航栏（响应式 + 下拉菜单）
    │   ├── Footer.jsx         # 页脚
    │   └── ScrollToTop.jsx    # 路由切换自动滚顶
    ├── data/                  # 静态数据源
    │   ├── books.js           # 7 部原著数据
    │   ├── characters.js      # 人物 + 学院 + 新闻
    │   ├── movies.js          # 8 部电影数据
    │   ├── spells.js          # 咒语大全
    │   ├── sorting.js         # 分院帽测试题库
    │   └── extraStories.js    # 番外故事集
    ├── pages/                 # 页面组件（15 个）
    │   ├── Home.jsx           # 首页
    │   ├── Books.jsx          # 原著列表
    │   ├── BookDetail.jsx     # 原著详情
    │   ├── Movies.jsx         # 电影列表
    │   ├── MovieDetail.jsx    # 电影详情
    │   ├── Characters.jsx     # 人物列表
    │   ├── CharacterDetail.jsx # 人物详情
    │   ├── Spells.jsx         # 咒语大全
    │   ├── News.jsx           # 新闻列表
    │   ├── NewsDetail.jsx     # 新闻详情
    │   ├── SortingHat.jsx     # 分院帽测试
    │   ├── Patronus.jsx       # 守护神测试
    │   ├── WandMatch.jsx      # 魔杖匹配
    │   ├── Timeline.jsx       # 魔法时间线
    │   └── ExtraStories.jsx   # 隐秘故事集
    └── styles/
        └── index.css          # 全局样式（~42KB）
```

## 🎨 设计风格

- **深色魔法主题**：午夜蓝背景 `#0d0d1f`，羊皮纸色文字 `#f5e6c8`，金色点缀 `#d4a843`
- **四学院配色**：🦁 格兰芬多红 · 🐍 斯莱特林绿 · 🦅 拉文克劳蓝 · 🦡 赫奇帕奇金
- **动画效果**：粒子飘浮、淡入过渡、logo 光环旋转、悬浮高亮
- **Emoji 图标**：全站使用 Emoji 作为图标，无外部图片依赖

## 📊 内容规模

| 内容 | 数量 |
|------|------|
| 原著小说 | 7 部（附完整英文全文） |
| 电影作品 | 8 部 |
| 人物档案 | 50+ 位 |
| 魔法咒语 | 100+ 条 |
| 番外故事 | 多部合集，含数十篇章节 |
| 分院帽测试题目 | 10 道 |

## 📜 数据来源与版权声明

本站为**粉丝创作项目**，所有哈利·波特相关内容的版权归 **J.K. Rowling** 及 **华纳兄弟** 所有。

数据来源包括：
- J.K. Rowling 的七部哈利·波特小说
- 八部哈利·波特系列电影
- Pottermore / Wizarding World 官方网站的公开内容
- 哈利·波特百科（Harry Potter Wiki）

本项目仅供学习和个人娱乐使用，不用于任何商业目的。

## 🤝 贡献指南

欢迎为本项目贡献代码或内容！

1. **Fork** 本仓库
2. 创建你的功能分支：`git checkout -b feature/amazing-feature`
3. 提交你的改动：`git commit -m 'Add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 **Pull Request**

### 贡献方向

- 🧙 补充更多人物档案与生平信息
- 🐉 开发魔法生物、魔法物品、地点百科模块
- 🦌 完成守护神测试与魔杖匹配互动功能
- 🎨 UI/UX 优化与响应式适配
- 🐛 Bug 修复与性能优化

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

## 💫 致谢

> *"在霍格沃茨，只要有人寻求帮助，帮助就会来到。"* — 阿不思·邓布利多

- 感谢 **J.K. Rowling** 创造了如此精彩的魔法世界
- 感谢 **React** 和 **Vite** 开源社区提供的优秀工具
- 感谢所有哈利波特粉丝社区的内容贡献者

---

<p align="center">
  <sub>⚡ Made with magic and ❤️ by Harry Potter fans</sub>
</p>
