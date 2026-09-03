import { useCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const fullEndpoint = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { items, loading, error } = useCollection(fullEndpoint)

  return <section><div className="section-heading"><div><p className="eyebrow">Make today count</p><h1>Workouts</h1></div><span className="count-badge">{items.length} plans</span></div><div className="row g-3">{items.map((workout) => <div className="col-12 col-md-6" key={workout._id || workout.id}><article className="workout-card"><div className="workout-top"><span className="difficulty">{workout.difficulty || 'All levels'}</span><span>{workout.durationMinutes ?? '—'} min</span></div><h2>{workout.title || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for your next milestone.'}</p></article></div>)}{loading && <p className="empty-state">Loading workouts...</p>}{!loading && !error && items.length === 0 && <p className="empty-state">No workouts available yet.</p>}{error && <p className="empty-state text-danger">{error}</p>}</div></section>
}

export default Workouts