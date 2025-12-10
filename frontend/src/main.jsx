import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Hero from './components/heroSection/Hero.jsx'
import ResumeUploadPage from './components/Pages/ResumeUploadPage.jsx'
import HomePage from './components/Pages/HomePage.jsx'
import AnalysisPage from './components/Pages/AnalysisPage.jsx'
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element:<Hero/>
//   },
//   {
//     path:'upload-resume',
//     element:<ResumeUploadPage />
//   },
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload-resume" element={<ResumeUploadPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        {/* <Route path="/feature/:featureId" element={<FeatureDetail />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        {/* fallback */}
        {/* <Route path="*" element={<LandingPage />} />  */}
      </Routes>
    </BrowserRouter>
    
    
  </StrictMode>,
)
