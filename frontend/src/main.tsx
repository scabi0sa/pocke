import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AddBtn from './AddBtn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AddBtn />
  </StrictMode>,
)
