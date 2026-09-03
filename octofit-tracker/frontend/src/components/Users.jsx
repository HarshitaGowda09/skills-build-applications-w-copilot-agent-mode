import { useCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const ENDPOINT = '/api/users/'
const fullEndpoint = `${API_BASE_URL}${ENDPOINT}`

function Users() {
  const { items, loading, error } = useCollection(fullEndpoint)

  return <section><div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Users</h1></div><span className="count-badge">{items.length} profiles</span></div><div className="user-grid">{items.map((user) => <article className="user-card" key={user._id || user.id}><div className="avatar">{(user.displayName || user.username || '?').charAt(0).toUpperCase()}</div><div><h2>{user.displayName || user.username || 'Unnamed user'}</h2><p>@{user.username || 'member'}</p><small>{user.email || 'Email not shared'}</small></div></article>)}{loading && <p className="empty-state">Loading users...</p>}{!loading && !error && items.length === 0 && <p className="empty-state">No user profiles yet.</p>}{error && <p className="empty-state text-danger">{error}</p>}</div></section>
}

export default Users