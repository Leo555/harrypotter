/**
 * StatsPanel — 可复用统计面板组件
 * 消除了 9 个页面中重复的内联样式统计面板代码
 *
 * @param {Array} stats - 统计项数组 [{ label, value, icon }]
 * @param {boolean} compact - 是否使用紧凑变体（用于 ReaderShelf 等）
 */
export default function StatsPanel({ stats, compact = false }) {
  return (
    <div className={`stats-panel${compact ? ' stats-panel--compact' : ''}`}>
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-card__icon">{stat.icon}</div>
          <div className="stat-card__value">{stat.value}</div>
          <div className="stat-card__label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
