import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChronoProvider } from './context/ChronoContext.jsx'

import './styles/main.css'
import "./styles/fonts.css"
import "./styles/toolkit.css"

createRoot(document.getElementById('root')).render(

  <ChronoProvider>
    <App />
  </ChronoProvider>

)
