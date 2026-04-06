import { useState } from 'react'
import { Link } from 'react-router-dom'
import { patronusQuestions, patronusResults } from '../data/patronus'
import useDocumentHead from '../hooks/useDocumentHead'

export default function Patronus() {
  useDocumentHead({
    title: '🦌 守护神测试',
    titleEn: 'Patronus Quiz — Discover Your Patronus Form',
    description: '呼神护卫！通过十道灵魂深处的问题，发现属于你的守护神形态。每个巫师的守护神都独一无二。',
    descriptionEn: "Expecto Patronum! Answer 10 soul-searching questions to discover your unique Patronus form. Every witch and wizard's Patronus is one of a kind.",
    keywords: '守护神测试,Patronus,Expecto Patronum,呼神护卫,哈利波特',
    keywordsEn: 'Patronus quiz,Expecto Patronum,Patronus test,Harry Potter Patronus,discover your Patronus',
  })

  const [currentQ, setCurrentQ] = useState(0)
  const [traitScores, setTraitScores] = useState({ brave: 0, wise: 0, gentle: 0, free: 0, cunning: 0 })
  const [result, setResult] = useState(null)
  const [started, setStarted] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showMist, setShowMist] = useState(false)

  const handleStart = () => {
    setStarted(true)
    setCurrentQ(0)
    setTraitScores({ brave: 0, wise: 0, gentle: 0, free: 0, cunning: 0 })
    setResult(null)
    setShowMist(false)
  }

  const handleAnswer = (option) => {
    setSelectedOption(option)
    const newScores = { ...traitScores }
    newScores[option.trait] += option.points

    setTimeout(() => {
      setTraitScores(newScores)
      setSelectedOption(null)

      if (currentQ + 1 >= patronusQuestions.length) {
        // 计算结果：找到得分最高的特质
        const sortedTraits = Object.entries(newScores).sort((a, b) => b[1] - a[1])
        const topTrait = sortedTraits[0][0]
        const candidates = patronusResults[topTrait]
        // 根据总分高低选择第一个或第二个守护神
        const totalScore = Object.values(newScores).reduce((a, b) => a + b, 0)
        const selectedIdx = totalScore % 2 === 0 ? 0 : 1
        const patronus = candidates[selectedIdx] || candidates[0]

        setShowMist(true)
        setTimeout(() => {
          setResult({ patronus, scores: newScores })
          setShowMist(false)
        }, 2000)
      } else {
        setCurrentQ(currentQ + 1)
      }
    }, 600)
  }

  const handleRestart = () => {
    setStarted(false)
    setResult(null)
    setCurrentQ(0)
    setTraitScores({ brave: 0, wise: 0, gentle: 0, free: 0, cunning: 0 })
    setShowMist(false)
  }

  const traitLabels = {
    brave: { name: '勇气', color: '#ae0001', emoji: '🔥' },
    wise: { name: '智慧', color: '#222f5b', emoji: '📚' },
    gentle: { name: '温柔', color: '#5b8c5a', emoji: '💚' },
    free: { name: '自由', color: '#6a5acd', emoji: '🌬️' },
    cunning: { name: '机敏', color: '#1a472a', emoji: '🦊' },
  }

  // 银色迷雾 — 等待守护神出现
  if (showMist) {
    return (
      <div className="container fade-in">
        <div className="patronus-mist-wrapper">
          <div className="patronus-mist-icon">✨🪄✨</div>
          <h2 className="patronus-mist-title">Expecto Patronum!</h2>
          <p className="patronus-mist-text">银色的迷雾正在凝聚... 你的守护神正在成形...</p>
        </div>
      </div>
    )
  }

  // 开始界面
  if (!started) {
    return (
      <div className="container fade-in">
        <div className="patronus-start-center">
          <div className="patronus-big-emoji">🦌</div>
          <h1 className="page-title" style={{ marginBottom: '8px' }}>守护神测试</h1>
          <p className="page-subtitle" style={{ marginBottom: '40px' }}>
            Expecto Patronum — 发现属于你的守护神
          </p>

          <div className="patronus-intro-box">
            <p className="patronus-intro-text">
              守护神咒（Expecto Patronum）是最强大的防御魔法之一。
              每个巫师的守护神都独一无二，它的形态反映了施咒者最深层的内心特质。
            </p>
            <p className="patronus-intro-text-last">
              回答以下 <strong style={{ color: 'var(--color-gold)' }}>10 道</strong> 灵魂深处的问题，
              让魔法帮你找到命中注定的守护神。集中注意力，回忆你最快乐的记忆...
            </p>
          </div>

          <div className="patronus-trait-grid">
            {Object.entries(traitLabels).map(([key, t]) => (
              <div key={key} className="patronus-trait-card">
                <div className="patronus-trait-emoji">{t.emoji}</div>
                <div className="patronus-trait-name">{t.name}</div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-large" onClick={handleStart}
            style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
            🪄 开始召唤守护神
          </button>
        </div>
      </div>
    )
  }

  // 结果界面
  if (result) {
    const { patronus, scores } = result
    const maxScore = patronusQuestions.length * 3
    const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1])

    return (
      <div className="container fade-in">
        <div className="patronus-start-center" style={{ padding: '32px 0' }}>
          <div className="patronus-result-reveal">你的守护神已经现身...</div>
          <div className="patronus-result-emoji">{patronus.emoji}</div>
          <h1 className="patronus-result-name">{patronus.name}</h1>
          <div className="patronus-result-name-en">{patronus.nameEn}</div>

          <div className="patronus-desc-box">
            <p className="patronus-desc-text">{patronus.description}</p>
          </div>

          {/* 守护神属性 */}
          <div className="patronus-attr-grid">
            {[
              { label: '元素', value: patronus.element },
              { label: '稀有度', value: patronus.rarity },
              { label: '力量', value: patronus.power },
              { label: '著名施术者', value: patronus.famous },
            ].map((item, i) => (
              <div key={i} className="patronus-attr-card">
                <div className="patronus-attr-label">{item.label}</div>
                <div className="patronus-attr-value">{item.value}</div>
              </div>
            ))}
          </div>

          {/* 特质标签 */}
          <div className="patronus-tags">
            {patronus.traits.map((t, i) => (
              <span key={i} className="patronus-tag">{t}</span>
            ))}
          </div>

          {/* 守护神传说 */}
          <div className="patronus-lore-box">
            <div className="patronus-lore-title">📜 守护神传说</div>
            <p className="patronus-lore-text">{patronus.lore}</p>
          </div>

          {/* 灵魂特质分析 */}
          <div className="patronus-analysis-wrapper">
            <h3 className="patronus-analysis-title">✨ 你的灵魂特质分析</h3>
            {sortedTraits.map(([trait, score]) => {
              const t = traitLabels[trait]
              const pct = Math.round((score / maxScore) * 100)
              return (
                <div key={trait} className="patronus-bar-row">
                  <div className="patronus-bar-header">
                    <span className="patronus-bar-label">{t.emoji} {t.name}</span>
                    <span className="patronus-bar-pct">{pct}%</span>
                  </div>
                  <div className="patronus-bar-track">
                    <div className="patronus-bar-fill" style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${t.color}, rgba(192, 192, 192, 0.6))`,
                    }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="patronus-actions">
            <button className="btn btn-outline btn-large" onClick={handleRestart}>
              🔄 重新测试
            </button>
            <Link to="/interactive/wand" className="btn btn-primary btn-large" style={{ textDecoration: 'none' }}>
              🪄 去匹配魔杖
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 问题界面
  const question = patronusQuestions[currentQ]
  const progress = (currentQ / patronusQuestions.length) * 100

  return (
    <div className="container fade-in">
      <div className="sorting-quiz">
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #c0c0c0, #e8e8e8)',
          }} />
        </div>
        <div className="quiz-counter" style={{ color: 'rgba(192, 192, 192, 0.7)' }}>
          ✨ 问题 {currentQ + 1} / {patronusQuestions.length}
        </div>

        <div className="quiz-question">
          <div className="quiz-hat">🦌</div>
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
