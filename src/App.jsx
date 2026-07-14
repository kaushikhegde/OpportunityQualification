import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OpportunityProvider } from './store/OpportunityContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Workspace from './pages/Workspace.jsx'

export default function App() {
  return (
    <OpportunityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qualifications" element={<Dashboard />} />
          <Route path="/qualification/:id" element={<Workspace />} />
          {/* legacy paths */}
          <Route path="/opportunities" element={<Navigate to="/qualifications" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </OpportunityProvider>
  )
}
