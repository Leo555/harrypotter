// 英文分章逻辑测试（纯 node，不依赖 Vite）
// 验证：
//  1. 7 本书英文章节数 == 中文章节数（中英文对齐）
//  2. Bug A：Book7 正文里全小写的 "chapter ..." 不再被误切成章节
//  3. Bug B：Book2 第2章标题为 DOBBY'S WARNING（而非孤立单字符 "I"）
//  4. 每章标题非空、非单字符噪声
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { splitEnChapters } from '../src/data/chapterSplit.js'
import { chapterNames } from '../src/data/bookLoader.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const booksDir = join(root, 'books')

const enFiles = {
  1: 'Book1-Harry_Potter_and_the_Sorcerers_Stone.txt',
  2: 'Book2-Harry_Potter_and_the_Chamber_of_Secrets.txt',
  3: 'Book3-Harry_Potter_and_the_Prisoner_of_Azkaban.txt',
  4: 'Book4-Harry_Potter_and_the_Goblet_of_Fire.txt',
  5: 'Book5-Harry_Potter_and_the_Order_of_the_Phoenix.txt',
  6: 'Book6-Harry_Potter_and_the_Half_Blood_Prince.txt',
  7: 'Book7-Harry_Potter_and_the_Deathly_Hallows.txt',
}
const cnFiles = {
  1: 'Book1-哈利·波特与魔法石.txt',
  2: 'Book2-哈利·波特与密室.txt',
  3: 'Book3-哈利·波特与阿兹卡班的囚徒.txt',
  4: 'Book4-哈利·波特与火焰杯.txt',
  5: 'Book5-哈利·波特与凤凰社.txt',
  6: 'Book6-哈利·波特与混血王子.txt',
  7: 'Book7-哈利·波特与死亡圣器.txt',
}

// 与 bookLoader 中文逻辑一致的粗略计数器，用于章节数对齐校验
function countCnChapters(text) {
  const re = /(?:^|\n)(第[一二三四五六七八九十百零\d]+章[\s　]+.+|尾声[\s　]+.+)\n/g
  let n = 0
  while (re.exec(text) !== null) n++
  return n
}

let failures = 0
function assert(cond, msg) {
  if (cond) {
    console.log('  PASS:', msg)
  } else {
    console.error('  FAIL:', msg)
    failures++
  }
}

// Bug B 专项：Book2 第2章标题
{
  const text = readFileSync(join(booksDir, enFiles[2]), 'utf8')
  const ch = splitEnChapters(text, chapterNames[2] || [])
  assert(ch.length === (chapterNames[2] || []).length, `Book2 英文章节数(${ch.length}) == 中文(${(chapterNames[2] || []).length})`)
  assert(ch[1] && ch[1].title === "DOBBY'S WARNING", `Book2 第2章标题应为 DOBBY'S WARNING，实际: "${ch[1] && ch[1].title}"`)
}

// Bug A 专项：Book7 不被正文误切，且 Epilogue 独立成章
{
  const text = readFileSync(join(booksDir, enFiles[7]), 'utf8')
  const ch = splitEnChapters(text, chapterNames[7] || [])
  const cnCount = countCnChapters(readFileSync(join(booksDir, cnFiles[7]), 'utf8'))
  assert(ch.length === cnCount, `Book7 英文(${ch.length}) == 中文(${cnCount})`)
  assert(ch.length === 37, `Book7 英文应为 37 章，实际 ${ch.length}`)
  const last = ch[ch.length - 1]
  assert(/nineteen years later/i.test(last.title), `Book7 末章应为 Epilogue，实际: "${last.title}"`)
  assert(!/^chapter (sixteen|on)/i.test(ch.map((c) => c.title).join('\n')), 'Book7 不应出现被正文误切的章节标题')
}

// 全量对齐 + 标题健全性
for (let b = 1; b <= 7; b++) {
  const enText = readFileSync(join(booksDir, enFiles[b]), 'utf8')
  const cnText = readFileSync(join(booksDir, cnFiles[b]), 'utf8')
  const ch = splitEnChapters(enText, chapterNames[b] || [])
  const cnCount = countCnChapters(cnText)
  console.log(`Book${b}: 英文 ${ch.length} 章 / 中文 ${cnCount} 章`)
  assert(ch.length === cnCount, `Book${b} 英文章节数(${ch.length}) == 中文章节数(${cnCount})`)

  for (const c of ch) {
    if (!c.title || c.title.length < 2) {
      assert(false, `Book${b} 第${c.number}章 标题异常: "${c.title}"`)
    }
    if (c.content.length === 0) {
      assert(false, `Book${b} 第${c.number}章 正文为空`)
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} 个断言失败`)
  process.exit(1)
} else {
  console.log('\n全部通过 ✓')
}
