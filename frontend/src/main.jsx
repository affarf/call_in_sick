import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import CallInSickScreen from './components/CallInSickScreen.jsx'
import LeaveOfAbsence from './components/LeaveOfAbsence.jsx'
import Resources from './components/Resources.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <Link className="navbar-brand" to="/">UW Housing</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Call in Sick</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leave">Leave of Absence</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/resources">Resources</Link></li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<CallInSickScreen />} />
          <Route path="/leave" element={<LeaveOfAbsence />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
