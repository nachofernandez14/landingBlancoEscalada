import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/home'
import Cabañas from './views/cabañas'
import Galeria from './views/galeria'
import Actividades from './views/actividades'
import WhatsAppButton from './components/WhatsAppButton.tsx'
import Footer from './components/Footer.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import './app.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cabanas" element={<Cabañas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/actividades" element={<Actividades />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </Router>
  )
}

export default App
