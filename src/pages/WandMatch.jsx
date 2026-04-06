import { useState } from 'react'
import { Link } from 'react-router-dom'
import { wandQuestions, wandWoodResults, wandCoreResults, wandLengths } from '../data/wand'
import useDocumentHead from '../hooks/useDocumentHead'

export default function WandMatch() {
  useDocumentHead({
    title: '🪄 魔杖匹配',
    titleEn: 'Wand Match Quiz — The Wand Chooses the Wizard',
    description: '走进奥利凡德魔杖店，通过八道问题找到属于你的命定之杖。魔杖选择巫师！',
    descriptionEn: "Visit Ollivander's Wand Shop — answer 8 questions to find your destined wand. The wand chooses the wizard!",
    keywords: '魔杖匹配,奥利凡德,凤凰羽毛,独角兽毛,龙心弦,哈利波特',
    keywordsEn: "wand quiz,Ollivander's,Phoenix feather,Unicorn hair,Dragon heartstring,Harry Potter wand",
  })

  const [currentQ, setCurrentQ] = useState(0)
  const [woodScores, setWoodScores] = useState({})
  const [coreScores, setCoreScores] = useState({})
  const [result, setResult] = useState(null)
  const [started, setStarted] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showForging, setShowForging] = useState(false)

  const handleStart = () => {
    setStarted(true)
    setCurrentQ(0)
    setWoodScores({})
    setCoreScores({})
    setResult(null)
    setShowForging(false)
  }

  const handleAnswer = (option) => {
    setSelectedOption(option)
    const newWoodScores = { ...woodScores }
    const newCoreScores = { ...coreScores }
    newWoodScores[option.wood] = (newWoodScores[option.wood] || 0) + option.points
    newCoreScores[option.core] = (newCoreScores[option.core] || 0) + option.points

    setTimeout(() => {
      setWoodScores(newWoodScores)
      setCoreScores(newCoreScores)
      setSelectedOption(null)

      if (currentQ + 1 >= wandQuestions.length) {
        const topWood = Object.entries(newWoodScores).sort((a, b) => b[1] - a[1])[0][0]
        const topCore = Object.entries(newCoreScores).sort((a, b) => b[1] - a[1])[0][0]
        const totalScore = Object.values(newWoodScores).reduce((a, b) => a + b, 0)
        let length
        if (totalScore <= 10) length = 'short'
        else if (totalScore <= 16) length = 'medium'
        else if (totalScore <= 22) length = 'long'
        else length = 'extra'
        const flexOptions = ['坚硬', '微弹', '合理柔韧', '相当有弹性', '极度柔韧']
        const flexIdx = Math.abs(totalScore % 5)
        const flexibility = flexOptions[flexIdx]

        setShowForging(true)
        setTimeout(() => {
          setResult({
            wood: wandWoodResults[topWood],
            core: wandCoreResults[topCore],
            length: wandLengths[length],
            flexibility,
            woodScores: newWoodScores,
            coreScores: newCoreScores,
          })
          setShowForging(false)
        }, 2500)
      } else {
        setCurrentQ(currentQ + 1)
      }
    }, 600)
  }

  const handleRestart = () => {
    setStarted(false)
    setResult(null)
    setCurrentQ(0)
    setWoodScores({})
    setCoreScores({})
    setShowForging(false)
  }

  // 锻造动画
  if (showForging) {
    return (
      <div className="container fade-in">
        <div className="wand-forge-wrapper">
          <div className="wand-forge-icon">🪄</div>
          <h2 className="wand-forge-title">奥利凡德先生正在为你匹配魔杖...</h2>
          <p className="wand-forge-text">"记住，是魔杖选择巫师，而不是巫师选择魔杖。"</p>
        </div>
      </div>
    )
  }

  // 开始界面
  if (!started) {
    return (
      <div className="container fade-in">
        <div className="wand-start-center">
          <div className="wand-big-emoji">🪄</div>
          <h1 className="page-title" style={{ marginBottom: '8px' }}>魔杖匹配</h1>
          <p className="page-subtitle" style={{ marginBottom: '40px' }}>
            "魔杖选择巫师" — 奥利凡德先生
          </p>

          <div className="wand-intro-box">
            <p className="wand-intro-text">
              欢迎来到奥利凡德魔杖店 — 自公元前 382 年起制造精良魔杖。
              每根魔杖都由独特的木材与杖芯组合而成，没有两根完全相同的魔杖。
            </p>
            <p className="wand-intro-text-last">
              回答以下 <strong style={{ color: 'var(--color-gold)' }}>8 道</strong> 问题，
              让奥利凡德先生为你找到那根命中注定的魔杖。放松心灵，让魔法引导你...
            </p>
          </div>

          {/* 杖芯预览 */}
          <div className="wand-core-grid">
            {Object.entries(wandCoreResults).map(([key, core]) => (
              <div key={key} className="wand-core-card">
                <div className="wand-core-emoji">{core.emoji}</div>
                <div className="wand-core-name">{core.name}</div>
                <div className="wand-core-trait">{core.trait}</div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-large" onClick={handleStart}
            style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
            🏪 走进奥利凡德魔杖店
          </button>
        </div>
      </div>
    )
  }

  // 结果界面
  if (result) {
    const { wood, core, length, flexibility } = result

    return (
      <div className="container fade-in">
        <div className="wand-start-center" style={{ padding: '32px 0' }}>
          <div className="wand-result-reveal">奥利凡德先生微笑着递给你一根魔杖...</div>
          <div className="wand-result-emoji">🪄</div>
          <h1 className="wand-result-title">{wood.name} + {core.name}</h1>
          <div className="wand-result-subtitle">{wood.nameEn} & {core.nameEn}</div>
          <div className="wand-result-specs">{length.range} · {flexibility}</div>

          {/* 魔杖总览卡片 */}
          <div className="wand-overview-card">
            <div className="wand-overview-grid">
              <div>
                <div className="wand-overview-label">木材</div>
                <div className="wand-overview-value">{wood.emoji} {wood.name}</div>
                <div className="wand-overview-extra">特质：{wood.trait}</div>
              </div>
              <div>
                <div className="wand-overview-label">杖芯</div>
                <div className="wand-overview-value">{core.emoji} {core.name}</div>
                <div className="wand-overview-extra">特质：{core.trait}</div>
              </div>
              <div>
                <div className="wand-overview-label">长度</div>
                <div className="wand-overview-value">{length.range}</div>
                <div className="wand-overview-extra">{length.desc}</div>
              </div>
              <div>
                <div className="wand-overview-label">柔韧度</div>
                <div className="wand-overview-value">{flexibility}</div>
                <div className="wand-overview-extra">{length.trait}</div>
              </div>
            </div>
          </div>

          {/* 木材详情 */}
          <div className="wand-detail-card">
            <div className="wand-detail-heading">{wood.emoji} 关于{wood.name}</div>
            <p className="wand-detail-desc">{wood.description}</p>
            <div className="wand-detail-famous">🌟 著名持有者：{wood.famousOwner}</div>
            <div className="wand-detail-symbolism">"{wood.symbolism}"</div>
          </div>

          {/* 杖芯详情 */}
          <div className="wand-detail-card">
            <div className="wand-detail-heading">{core.emoji} 关于{core.name}</div>
            <p className="wand-detail-desc">{core.description}</p>
            <div className="wand-core-stats-grid">
              <div className="wand-core-stat-item">
                <div className="wand-core-stat-label">优势</div>
                <div className="wand-core-stat-value">{core.power}</div>
              </div>
              <div className="wand-core-stat-item">
                <div className="wand-core-stat-label">注意</div>
                <div className="wand-core-stat-value">{core.weakness}</div>
              </div>
            </div>
          </div>

          {/* 奥利凡德寄语 */}
          <div className="wand-quote-box">
            <p className="wand-quote-text">
              "我很好奇你的魔杖将来会做出什么伟大的事来……
              毕竟，{wood.name}与{core.name}的组合实在不同寻常。
              好好对待它，它会对你忠诚的。"
              <br />
              <span className="wand-quote-author">— 盖瑞克·奥利凡德</span>
            </p>
          </div>

          <div className="wand-actions">
            <button className="btn btn-outline btn-large" onClick={handleRestart}>
              🔄 重新匹配
            </button>
            <Link to="/interactive/patronus" className="btn btn-primary btn-large" style={{ textDecoration: 'none' }}>
              🦌 去召唤守护神
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 问题界面
  const question = wandQuestions[currentQ]
  const progress = (currentQ / wandQuestions.length) * 100

  return (
    <div className="container fade-in">
      <div className="sorting-quiz">
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--color-gold), #f0d78c)',
          }} />
        </div>
        <div className="quiz-counter" style={{ color: 'rgba(212, 168, 67, 0.7)' }}>
          🪄 问题 {currentQ + 1} / {wandQuestions.length}
        </div>

        <div className="quiz-question">
          <div className="quiz-hat">🪄</div>
          <h2 className="quiz-question-text">{question.question}</h2>
        </div>

        <div className="quiz-options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={`quiz-option ${selectedOption === opt ? 'selected' : ''}`}
              onClick={() => !selectedOption && handleAnswer(opt)}
              disabled={!!selectedOption}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
