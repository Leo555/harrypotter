import { useState } from 'react'
import { Link } from 'react-router-dom'
import { patronusQuestions, patronusResults } from '../data/patronus'
import useDocumentHead from '../hooks/useDocumentHead'

export default function Patronus() {
  useDocumentHead({
    title: '🦌 守护神测试',
    description: '呼神护卫！通过十道灵魂深处的问题，发现属于你的守护神形态。每个巫师的守护神都独一无二。',
    keywords: '守护神测试,Patronus,Expecto Patronum,呼神护卫,哈利波特',
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
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>✨🪄✨</div>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            color: '#c0c0c0',
            fontSize: '1.6rem',
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(192, 192, 192, 0.5)',
          }}>
            Expecto Patronum!
          </h2>
          <p style={{
            color: 'rgba(192, 192, 192, 0.8)',
            fontSize: '1rem',
            lineHeight: 1.8,
          }}>
            银色的迷雾正在凝聚... 你的守护神正在成形...
          </p>
          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.7; }
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
          <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🦌</div>
          <h1 className="page-title" style={{ marginBottom: '8px' }}>守护神测试</h1>
          <p className="page-subtitle" style={{ marginBottom: '40px' }}>
            Expecto Patronum — 发现属于你的守护神
          </p>

          <div style={{
            maxWidth: '640px',
            margin: '0 auto 40px',
            padding: '32px 28px',
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.6), rgba(20, 20, 50, 0.8))',
            borderRadius: '16px',
            border: '1px solid rgba(192, 192, 192, 0.2)',
          }}>
            <p style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.9,
              fontSize: '0.95rem',
              marginBottom: '20px',
            }}>
              守护神咒（Expecto Patronum）是最强大的防御魔法之一。
              每个巫师的守护神都独一无二，它的形态反映了施咒者最深层的内心特质。
            </p>
            <p style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.9,
              fontSize: '0.95rem',
              margin: 0,
            }}>
              回答以下 <strong style={{ color: 'var(--color-gold)' }}>10 道</strong> 灵魂深处的问题，
              让魔法帮你找到命中注定的守护神。集中注意力，回忆你最快乐的记忆...
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            maxWidth: '640px',
            margin: '0 auto 40px',
          }}>
            {Object.entries(traitLabels).map(([key, t]) => (
              <div key={key} style={{
                padding: '14px 12px',
                background: 'rgba(192, 192, 192, 0.06)',
                borderRadius: '10px',
                border: '1px solid rgba(192, 192, 192, 0.12)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{t.emoji}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: 600 }}>{t.name}</div>
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
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(192, 192, 192, 0.6)',
            marginBottom: '12px',
            letterSpacing: '2px',
          }}>
            你的守护神已经现身...
          </div>

          <div style={{
            fontSize: '6rem',
            marginBottom: '16px',
            filter: 'drop-shadow(0 0 30px rgba(192, 192, 192, 0.4))',
          }}>
            {patronus.emoji}
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '2.2rem',
            color: '#e0e0e0',
            marginBottom: '4px',
            textShadow: '0 0 20px rgba(192, 192, 192, 0.3)',
          }}>
            {patronus.name}
          </h1>
          <div style={{
            fontSize: '1rem',
            color: 'rgba(192, 192, 192, 0.6)',
            fontFamily: "'Cinzel', serif",
            marginBottom: '28px',
          }}>
            {patronus.nameEn}
          </div>

          <div style={{
            maxWidth: '600px',
            margin: '0 auto 32px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.08), rgba(192, 192, 192, 0.03))',
            borderRadius: '14px',
            border: '1px solid rgba(192, 192, 192, 0.15)',
          }}>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', margin: 0 }}>
              {patronus.description}
            </p>
          </div>

          {/* 守护神属性 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            maxWidth: '600px',
            margin: '0 auto 28px',
          }}>
            {[
              { label: '元素', value: patronus.element },
              { label: '稀有度', value: patronus.rarity },
              { label: '力量', value: patronus.power },
              { label: '著名施术者', value: patronus.famous },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '14px',
                background: 'rgba(192, 192, 192, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(192, 192, 192, 0.1)',
              }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(192, 192, 192, 0.5)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-text)', fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* 特质标签 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '28px',
          }}>
            {patronus.traits.map((t, i) => (
              <span key={i} style={{
                padding: '6px 16px',
                background: 'rgba(192, 192, 192, 0.1)',
                border: '1px solid rgba(192, 192, 192, 0.2)',
                borderRadius: '20px',
                fontSize: '0.82rem',
                color: '#c0c0c0',
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* 守护神传说 */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 32px',
            padding: '20px 24px',
            background: 'rgba(212, 168, 67, 0.06)',
            borderRadius: '12px',
            border: '1px solid rgba(212, 168, 67, 0.15)',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', marginBottom: '8px', fontWeight: 600 }}>
              📜 守护神传说
            </div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.88rem', margin: 0 }}>
              {patronus.lore}
            </p>
          </div>

          {/* 灵魂特质分析 */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 36px',
          }}>
            <h3 style={{
              fontSize: '1rem',
              color: 'var(--color-text)',
              marginBottom: '16px',
              fontWeight: 600,
            }}>
              ✨ 你的灵魂特质分析
            </h3>
            {sortedTraits.map(([trait, score]) => {
              const t = traitLabels[trait]
              const pct = Math.round((score / maxScore) * 100)
              return (
                <div key={trait} style={{ marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>
                      {t.emoji} {t.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{pct}%</span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${t.color}, rgba(192, 192, 192, 0.6))`,
                      borderRadius: '4px',
                      transition: 'width 1s ease-out',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
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
          <div className="quiz-hat" style={{ filter: 'grayscale(0)' }}>🦌</div>
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
