import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <StrictMode>

           <GoogleOAuthProvider clientId="868584179202-9ge6g4nq1jr5c8ssvg79ibns5fidqj7o.apps.googleusercontent.com">
               <App /> 
           </GoogleOAuthProvider>

  </StrictMode>,
)
