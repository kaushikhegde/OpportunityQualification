import { Link } from 'react-router-dom'
import { IconBell } from './icons.jsx'

// Sidebar-free shell: a slim top app bar with the brand (links home) and the
// notification bell, then the page title / breadcrumb and content.
export default function Layout({ title, breadcrumb, children }) {
  return (
    <div className="app-plain">
      <header className="appbar">
        <Link to="/" className="brand-inline" aria-label="Scyne Pursuits home">
          <span className="brand-name">scyne<span className="bars">‖</span></span>
          <span className="brand-sub">Pursuits</span>
        </Link>
        <button className="bell" aria-label="Notifications">
          <IconBell />
        </button>
      </header>

      <main className="page">
        <div className="page-head">
          <h1>{title}</h1>
          {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}
        </div>
        <div className="content">{children}</div>
      </main>
    </div>
  )
}
