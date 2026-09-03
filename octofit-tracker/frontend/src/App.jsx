import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header"><div className="brand"><img src={logo} alt="OctoFit" /><span>OctoFit <em>Tracker</em></span></div><span className="status-dot">Live workspace</span></header>
      <nav className="app-nav" aria-label="Primary navigation">{[['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts']].map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav>
      <main><Routes><Route path="/" element={<div className="welcome"><p className="eyebrow">Personal fitness, shared momentum</p><h1>Small steps.<br /><span>Strong circles.</span></h1><p className="lead">Track the work, find your team, and keep moving toward the next milestone.</p><div className="quick-links">{[['/activities', 'Log activity'], ['/workouts', 'Choose a workout'], ['/leaderboard', 'See the leaderboard']].map(([path, label]) => <NavLink className="quick-link" to={path} key={path}>{label}<span>→</span></NavLink>)}</div></div>} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      <footer>OctoFit Tracker <span>Build consistency together.</span></footer>
    </div>
  )
}

export default App
