import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Establecer sección activa basada en la ruta
    if (location.pathname === '/') {
      setActiveSection('inicio');
    } else if (location.pathname === '/cabanas') {
      setActiveSection('cabanas');
    } else if (location.pathname === '/actividades') {
      setActiveSection('actividades');
    }

    // Observer para secciones en la página de inicio
    const handleScroll = () => {
      const sections = ['galeria', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div className="navbar-logo">
          <Link to="/">
            <img src="/img/logo/logo_transparente.png" alt="Blanco Escalada" />
          </Link>
        </div>
        
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={activeSection === 'inicio' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
          <li><Link to="/cabanas" className={activeSection === 'cabanas' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Cabañas</Link></li>
          <li><a href="#galeria" className={activeSection === 'galeria' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Galería</a></li>
          <li><Link to="/actividades" className={activeSection === 'actividades' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Actividades</Link></li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
