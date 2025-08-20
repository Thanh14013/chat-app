import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ChatContext } from './context/ChatContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> 
      <ChatContext>
        <App />
      </ChatContext>
    </AuthProvider>
  </BrowserRouter>
)
