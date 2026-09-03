import { useCollection } from '../api.js'

const ENDPOINT = '/api/teams/'

function Teams() {
  const { items, loading, error } = useCollection(ENDPOINT)

  return <section><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{items.length} teams</span></div><div className="row g-3">{items.map((team) => <div className="col-12 col-md-6" key={team._id || team.id}><article className="team-card"><div className="team-mark">{(team.name || 'T').charAt(0).toUpperCase()}</div><div><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'Ready for a new challenge.'}</p><small>{Array.isArray(team.members) ? `${team.members.length} members` : 'Members welcome'}</small></div></article></div>)}{loading && <p className="empty-state">Loading teams...</p>}{!loading && !error && items.length === 0 && <p className="empty-state">No teams created yet.</p>}{error && <p className="empty-state text-danger">{error}</p>}</div></section>
}

export default Teams