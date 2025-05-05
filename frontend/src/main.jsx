import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CallInSickScreen from './components/CallInSickScreen.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CallInSickScreen />
  </StrictMode>,
)
