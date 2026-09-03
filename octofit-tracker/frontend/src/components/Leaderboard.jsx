import { useCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const fullEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const { items, loading, error } = useCollection(fullEndpoint)
  const rankedItems = [...items].sort((left, right) => (left.rank ?? 999) - (right.rank ?? 999))

  return <section><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><span className="count-badge">{items.length} athletes</span></div><div className="leaderboard-list">{rankedItems.map((entry, index) => <div className="leader-row" key={entry._id || entry.id}><span className="rank">{entry.rank ?? index + 1}</span><div className="flex-grow-1"><strong>{entry.displayName || entry.username || entry.userId || 'Athlete'}</strong><small>{entry.points ?? 0} points earned</small></div><span className="score">{entry.points ?? 0}</span></div>)}{loading && <p className="empty-state">Loading leaderboard...</p>}{!loading && !error && items.length === 0 && <p className="empty-state">The leaderboard is waiting for its first score.</p>}{error && <p className="empty-state text-danger">{error}</p>}</div></section>
}

export default Leaderboard