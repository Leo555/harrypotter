import { useState } from 'react'
import { sortingQuestions, houseResults } from '../data/sorting'
import useDocumentHead from '../hooks/useDocumentHead'

export default function SortingHat() {
  useDocumentHead({
    title: '🎩 分院帽测试',
    description: '霍格沃茨分院帽测试 — 回答十道问题，发现你属于格兰芬多、斯莱特林、拉文克劳还是赫奇帕奇。',
    keywords: '分院帽测试,霍格沃茨学院,格兰芬多,斯莱特林,拉文克劳,赫奇帕奇',
  })

  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState({ gryffindor: 0, ravenclaw: 0, hufflepuff: 0, slytherin: 0 })
  const [result, setResult] = useState(null)
  const [started, setStarted] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleStart = () => {
    setStarted(true)
    setCurrentQ(0)
    setScores({ gryffindor: 0, ravenclaw: 0, hufflepuff: 0, slytherin: 0 })
    setResult(null)
  }

  const handleAnswer = (option) => {
    setSelectedOption(option)
    const newScores = { ...scores }
    newScores[option.house] += option.points

    setTimeout(() => {
      setScores(newScores)
      setSelectedOption(null)

      if (currentQ + 1 >= sortingQuestions.length) {
        // 计算结果
        const maxHouse = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        setResult(houseResults[maxHouse])
      } else {
        setCurrentQ(currentQ + 1)
      }
    }, 600)
  }

  const handleRestart = () => {
    setStarted(false)
    setResult(null)
    setCurrentQ(0)
    setScores({ gryffindor: 0, ravenclaw: 0, hufflepuff: 0, slytherin: 0 })
  }

  // 开始界面
  if (!started) {
    return (
      <div className="container fade-in">
        <div className="sorting-intro">
          <div className="sorting-hat-icon">🎩</div>
          <h1 className="page-title">霍格沃茨分院帽测试</h1>
          <p className="page-subtitle">回答十道问题，让分院帽为你选择最适合的学院</p>

          <div className="sorting-houses-preview">
            {Object.entries(houseResults).map(([key, house]) => (
              <div key={key} className="house-preview" style={{ borderColor: house.color }}>
                <span className="house-preview-emoji">{house.emoji}</span>
                <span className="house-preview-name">{house.name}</span>
                <span className="house-preview-trait">{house.trait}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-large" onClick={handleStart}>
            🎩 戴上分院帽
          </button>
        </div>
      </div>
    )
  }

  // 结果界面
  if (result) {
    return (
      <div className="container fade-in">
        <div className="sorting-result">
          <div className="result-announce">分院帽的决定是...</div>
          <div className="result-house-emoji">{result.emoji}</div>
          <h1 className="result-house-name" style={{ color: result.lightColor || result.color }}>
            {result.name}！
          </h1>
          <div className="result-house-en">{result.nameEn}</div>

          <div className="result-description">
            <p>{result.description}</p>
          </div>

          <div className="result-details">
            <div className="result-detail-item">
              <span className="result-detail-label">创始人</span>
              <span className="result-detail-value">{result.founder}</span>
            </div>
            <div className="result-detail-item">
              <span className="result-detail-label">元素</span>
              <span className="result-detail-value">{result.element}</span>
            </div>
            <div className="result-detail-item">
              <span className="result-detail-label">代表动物</span>
              <span className="result-detail-value">{result.animal}</span>
            </div>
            <div className="result-detail-item">
              <span className="result-detail-label">公共休息室</span>
              <span className="result-detail-value">{result.commonRoom}</span>
            </div>
            <div className="result-detail-item">
              <span className="result-detail-label">学院幽灵</span>
              <span className="result-detail-value">{result.ghost}</span>
            </div>
            <div className="result-detail-item">
              <span className="result-detail-label">代表色</span>
              <span className="result-detail-value">{result.colors.join('与')}</span>
            </div>
          </div>

          <div className="result-famous">
            <h3>著名校友</h3>
            <div className="famous-members">
              {result.famousMembers.map((m, i) => (
                <span key={i} className="famous-member-tag">{m}</span>
              ))}
            </div>
          </div>

          <div className="result-scores">
            <h3>你的各学院匹配度</h3>
            <div className="score-bars">
              {Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([house, score]) => {
                const h = houseResults[house]
                const maxScore = sortingQuestions.length * 3
                const pct = Math.round((score / maxScore) * 100)
                return (
                  <div key={house} className="score-bar-item">
                    <div className="score-bar-label">
                      <span>{h.emoji} {h.name}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="score-bar-bg">
                      <div className="score-bar-fill" style={{ width: `${pct}%`, background: h.color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button className="btn btn-outline btn-large" onClick={handleRestart}>
            🔄 重新测试
          </button>
        </div>
      </div>
    )
  }

  // 问题界面
  const question = sortingQuestions[currentQ]
  const progress = ((currentQ) / sortingQuestions.length) * 100

  return (
    <div className="container fade-in">
      <div className="sorting-quiz">
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-counter">
          问题 {currentQ + 1} / {sortingQuestions.length}
        </div>

        <div className="quiz-question">
          <div className="quiz-hat">🎩</div>
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
