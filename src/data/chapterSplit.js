// 英文分章纯逻辑（与 Vite ?raw 解耦，便于单元测试）
// 支持的章节头格式：
// 1. CHAPTER ONE\nTITLE          (Book1: 标准大写)
// 2. 　　CHAPTER\tTWo\n　　TITLE    (Book2: 全角空格+TAB, 数词大小写混合)
// 3. 　　CHAPTER ONE\nTITLE        (Book3: 全角空格前缀)
// 4. 　　CHAPTER ONE - TITLE        (Book4: 同行标题带破折号)
// 5. - CHAPTER ONE -\nTITLE          (Book5: 破折号包裹)
// 6. Chapter 1: Title               (Book6: 数字+冒号+同行标题)
// 7. Chapter One\nTitle             (Book7: 首字母大写)
// 另：无编号的 Epilogue / Prologue 也单独成章（如 Book7 末尾的 Epilogue）

// 将单个 CHAPTER 匹配转换为 split 记录，并解析同行标题
function buildEnSplit(m) {
  let rest = m[2].trim().replace(/-\s*$/, '').trim()
  let chapterNum = ''
  let sameLineTitle = ''

  // Book6 格式: "1: The Other Minister"
  const colonMatch = rest.match(/^(\d+)\s*[:：]\s*(.+)/)
  // Book4 格式: "ONE - THE RIDDLE HOUSE" / "THIRTY-SEVEN - THE BEGINNING"
  const dashMatch = rest.match(/^([A-Z][A-Z-]+)\s+[-–—]\s+([A-Z].+)/)

  if (colonMatch) {
    chapterNum = colonMatch[1].trim()
    sameLineTitle = colonMatch[2].trim()
  } else if (dashMatch) {
    chapterNum = dashMatch[1].trim()
    sameLineTitle = dashMatch[2].trim()
  } else {
    chapterNum = rest
  }

  return {
    index: m.index,
    raw: m[0],
    sameLineTitle: sameLineTitle.length > 0 && sameLineTitle.length < 80 ? sameLineTitle : '',
  }
}

// 从章节正文起始处提取标题行。
// 跳过孤立的噪声短行（如单个字符 "I"、空行），再取第一个"像标题"的行。
function extractEnTitle(content) {
  let search = content
  let guard = 0
  while (guard++ < 6) {
    const nl = search.indexOf('\n')
    if (nl <= 0) break
    const candidate = search.slice(0, nl).trim()
    // 标题行判定：长度 3~79，全大写或首字母大写，且不以句末标点结尾
    if (
      candidate.length >= 3 &&
      candidate.length < 80 &&
      (candidate === candidate.toUpperCase() || /^[A-Z]/.test(candidate)) &&
      !/[.,;:!?]["')\]]$/.test(candidate)
    ) {
      return { title: candidate, content: search.slice(nl).trim() }
    }
    // 否则视为噪声行（如 "I"），跳过继续向下寻找真正的标题
    search = search.slice(nl + 1).replace(/^\s+/, '')
  }
  return { title: '', content }
}

export function splitEnChapters(text, cnNames = []) {
  // 注意：正则区分大小写（CHAPTER/Chapter 首字母大写），
  // 避免把正文里全小写的 "chapter ..." 误判为章节头。
  const chapterRegex = /(?:^|\n)[^\S\n]*-?[^\S\n]*(CHAPTER|Chapter)[^\S\n]+(.+?)\r?\n/g
  const splits = []
  let m

  while ((m = chapterRegex.exec(text)) !== null) {
    splits.push(buildEnSplit(m))
  }

  // 处理无编号的 Epilogue / Prologue（如 Book7 末尾的 Epilogue）
  const extraRegex = /(?:^|\n)[^\S\n]*(EPILOGUE|Epilogue|PROLOGUE|Prologue)[^\S\n]*\r?\n/g
  while ((m = extraRegex.exec(text)) !== null) {
    const idx = m.index
    // 避免与已收集的章节头重叠
    if (splits.some((s) => idx >= s.index && idx < s.index + s.raw.length)) continue
    splits.push({ index: idx, raw: m[0], sameLineTitle: '' })
  }

  splits.sort((a, b) => a.index - b.index)

  const chapters = []
  for (let i = 0; i < splits.length; i++) {
    const start = splits[i].index + splits[i].raw.length
    const end = i + 1 < splits.length ? splits[i + 1].index : text.length
    let content = text.slice(start, end).trim()

    let engTitle = splits[i].sameLineTitle || ''
    if (!engTitle) {
      const t = extractEnTitle(content)
      engTitle = t.title
      content = t.content
    }

    chapters.push({
      number: i + 1,
      title: engTitle || `Chapter ${i + 1}`,
      titleCn: cnNames[i] || `第${i + 1}章`,
      content,
    })
  }

  return chapters
}
