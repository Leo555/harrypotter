import { useState } from 'react'
import { Link } from 'react-router-dom'
import { wandQuestions, wandWoodResults, wandCoreResults, wandLengths } from '../data/wand'
import useDocumentHead from '../hooks/useDocumentHead'

export default function WandMatch() {
  useDocumentHead({
    title: '🪄 魔杖匹配',
    description: '走进奥利凡德魔杖店，通过八道问题找到属于你的命定之杖。魔杖选择巫师！',
    keywords: '魔杖匹配,奥利凡德,凤凰羽毛,独角兽毛,龙心弦,哈利波特',
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
        // 计算结果
        const topWood = Object.entries(newWoodScores).sort((a, b) => b[1] - a[1])[0][0]
        const topCore = Object.entries(newCoreScores).sort((a, b) => b[1] - a[1])[0][0]

        // 根据总分确定长度
        const totalScore = Object.values(newWoodScores).reduce((a, b) => a + b, 0)
        let length
        if (totalScore <= 10) length = 'short'
        else if (totalScore <= 16) length = 'medium'
        else if (totalScore <= 22) length = 'long'
        else length = 'extra'

        // 弹性系数（柔韧度）
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
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '24px',
            animation: 'wandForge 2s ease-in-out infinite',
          }}>🪄</div>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            color: 'var(--color-gold)',
            fontSize: '1.5rem',
            marginBottom: '16px',
          }}>
            奥利凡德先生正在为你匹配魔杖...
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
          }}>
            "记住，是魔杖选择巫师，而不是巫师选择魔杖。"
          </p>
          <style>{`
            @keyframes wandForge {
              0% { transform: rotate(0deg) scale(1); }
              25% { transform: rotate(-15deg) scale(1.1); }
              50% { transform: rotate(15deg) scale(1); }
              75% { transform: rotate(-5deg) scale(1.05); }
              100% { transform: rotate(0deg) scale(1); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  // 开始界面
  if (!started) {
    return (
      <div className="container fade-in">
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🪄</div>
          <h1 className="page-title" style={{ marginBottom: '8px' }}>魔杖匹配</h1>
          <p className="page-subtitle" style={{ marginBottom: '40px' }}>
            "魔杖选择巫师" — 奥利凡德先生
          </p>

          <div style={{
            maxWidth: '640px',
            margin: '0 auto 40px',
            padding: '32px 28px',
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.6), rgba(20, 20, 50, 0.8))',
            borderRadius: '16px',
            border: '1px solid rgba(212, 168, 67, 0.25)',
          }}>
            <p style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.9,
              fontSize: '0.95rem',
              marginBottom: '20px',
            }}>
              欢迎来到奥利凡德魔杖店 — 自公元前 382 年起制造精良魔杖。
              每根魔杖都由独特的木材与杖芯组合而成，没有两根完全相同的魔杖。
            </p>
            <p style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.9,
              fontSize: '0.95rem',
              margin: 0,
            }}>
              回答以下 <strong style={{ color: 'var(--color-gold)' }}>8 道</strong> 问题，
              让奥利凡德先生为你找到那根命中注定的魔杖。放松心灵，让魔法引导你...
            </p>
          </div>

          {/* 杖芯预览 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            maxWidth: '640px',
            margin: '0 auto 40px',
          }}>
            {Object.entries(wandCoreResults).map(([key, core]) => (
              <div key={key} style={{
                padding: '16px',
                background: 'rgba(212, 168, 67, 0.06)',
                borderRadius: '12px',
                border: '1px solid rgba(212, 168, 67, 0.15)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{core.emoji}</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9rem' }}>{core.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', marginTop: '4px' }}>{core.trait}</div>
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
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(212, 168, 67, 0.6)',
            marginBottom: '12px',
            letterSpacing: '2px',
          }}>
            奥利凡德先生微笑着递给你一根魔杖...
          </div>

          <div style={{
            fontSize: '5rem',
            marginBottom: '16px',
            filter: 'drop-shadow(0 0 20px rgba(212, 168, 67, 0.3))',
          }}>
            🪄
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.8rem',
            color: 'var(--color-gold)',
            marginBottom: '8px',
          }}>
            {wood.name} + {core.name}
          </h1>
          <div style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '8px',
          }}>
            {wood.nameEn} & {core.nameEn}
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: 'rgba(212, 168, 67, 0.7)',
            marginBottom: '32px',
          }}>
            {length.range} · {flexibility}
          </div>

          {/* 魔杖总览卡片 */}
          <div style={{
            maxWidth: '640px',
            margin: '0 auto 28px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.08), rgba(212, 168, 67, 0.02))',
            borderRadius: '16px',
            border: '1px solid rgba(212, 168, 67, 0.2)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              textAlign: 'left',
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(212, 168, 67, 0.6)', marginBottom: '4px' }}>木材</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', fontWeight: 600 }}>
                  {wood.emoji} {wood.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', marginTop: '2px' }}>特质：{wood.trait}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(212, 168, 67, 0.6)', marginBottom: '4px' }}>杖芯</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', fontWeight: 600 }}>
                  {core.emoji} {core.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', marginTop: '2px' }}>特质：{core.trait}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(212, 168, 67, 0.6)', marginBottom: '4px' }}>长度</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', fontWeight: 600 }}>{length.range}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', marginTop: '2px' }}>{length.desc}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(212, 168, 67, 0.6)', marginBottom: '4px' }}>柔韧度</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', fontWeight: 600 }}>{flexibility}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', marginTop: '2px' }}>{length.trait}</div>
              </div>
            </div>
          </div>

          {/* 木材详情 */}
          <div style={{
            maxWidth: '640px',
            margin: '0 auto 20px',
            padding: '22px 24px',
            background: 'rgba(30, 30, 60, 0.5)',
            borderRadius: '14px',
            border: '1px solid rgba(212, 168, 67, 0.12)',
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--color-gold)',
              marginBottom: '10px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              {wood.emoji} 关于{wood.name}
            </div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', margin: '0 0 12px' }}>
              {wood.description}
            </p>
            <div style={{ fontSize: '0.82rem', color: 'rgba(212, 168, 67, 0.7)' }}>
              🌟 著名持有者：{wood.famousOwner}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>
              "{wood.symbolism}"
            </div>
          </div>

          {/* 杖芯详情 */}
          <div style={{
            maxWidth: '640px',
            margin: '0 auto 20px',
            padding: '22px 24px',
            background: 'rgba(30, 30, 60, 0.5)',
            borderRadius: '14px',
            border: '1px solid rgba(212, 168, 67, 0.12)',
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--color-gold)',
              marginBottom: '10px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              {core.emoji} 关于{core.name}
            </div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', margin: '0 0 12px' }}>
              {core.description}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginTop: '8px',
            }}>
              <div style={{
                padding: '10px 14px',
                background: 'rgba(212, 168, 67, 0.06)',
                borderRadius: '8px',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(212, 168, 67, 0.5)', marginBottom: '2px' }}>优势</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text)' }}>{core.power}</div>
              </div>
              <div style={{
                padding: '10px 14px',
                background: 'rgba(212, 168, 67, 0.06)',
                borderRadius: '8px',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(212, 168, 67, 0.5)', marginBottom: '2px' }}>注意</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text)' }}>{core.weakness}</div>
              </div>
            </div>
          </div>

          {/* 奥利凡德寄语 */}
          <div style={{
            maxWidth: '640px',
            margin: '0 auto 36px',
            padding: '20px 24px',
            background: 'rgba(212, 168, 67, 0.05)',
            borderRadius: '12px',
            border: '1px dashed rgba(212, 168, 67, 0.2)',
          }}>
            <p style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.85,
              fontSize: '0.9rem',
              margin: 0,
              fontStyle: 'italic',
            }}>
              "我很好奇你的魔杖将来会做出什么伟大的事来……
              毕竟，{wood.name}与{core.name}的组合实在不同寻常。
              好好对待它，它会对你忠诚的。"
              <br />
              <span style={{ color: 'var(--color-gold)', fontSize: '0.82rem', fontStyle: 'normal' }}>
                — 盖瑞克·奥利凡德
              </span>
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
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
          <div className="quiz-hat" style={{ filter: 'grayscale(0)' }}>🪄</div>
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
