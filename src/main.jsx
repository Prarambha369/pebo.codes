import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Base tokens + shared surface system first, so App.css (loaded via App.jsx)
// wins equal-specificity ties for element-specific overrides.
import './index.css'
import './styles/glass.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
