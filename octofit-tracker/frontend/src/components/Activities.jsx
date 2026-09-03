import { formatDate, useCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const fullEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const { items, loading, error } = useCollection(fullEndpoint)

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count-badge">{items.length} entries</span></div>
      <div className="table-shell"><table className="table align-middle mb-0"><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>{items.map((activity) => <tr key={activity._id || activity.id}><td className="fw-semibold">{activity.type || 'Activity'}</td><td>{activity.durationMinutes ?? '—'} min</td><td>{activity.points ?? 0}</td><td>{formatDate(activity.completedAt)}</td></tr>)}</tbody></table>{loading && <p className="empty-state">Loading activities...</p>}{!loading && !error && items.length === 0 && <p className="empty-state">No activities logged yet.</p>}{error && <p className="empty-state text-danger">{error}</p>}</div>
    </section>
  )
}

export default Activities