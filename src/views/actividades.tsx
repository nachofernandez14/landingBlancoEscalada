import Navbar from '../components/Navbar';
import './actividades.css';

const Actividades = () => {
  const activities = [
    { name: 'Caminatas por senderos', icon: '🥾' },
    { name: 'Bajada al Río Mendoza', icon: '🌊' },
    { name: 'Rafting', icon: '🚣' },
    { name: 'Kayak', icon: '🛶' },
    { name: 'Pesca', icon: '🎣' },
    { name: 'Cabalgatas', icon: '🐴' },
    { name: 'Bodegas y Enoturismo', icon: '🍷' },
    { name: 'Gastronomía local', icon: '🍽️' }
  ];

  const excursions = [
    { name: 'Potrerillos', url: 'https://www.google.com/search?q=Potrerillos+Mendoza', icon: '🏔️' },
    { name: 'Cacheuta', url: 'https://www.google.com/search?q=Cacheuta+Mendoza', icon: '♨️' },
    { name: 'Uspallata', url: 'https://www.google.com/search?q=Uspallata+Mendoza', icon: '🏜️' },
    { name: 'Villavicencio', url: 'https://www.google.com/search?q=Villavicencio+Mendoza', icon: '⛰️' },
    { name: 'Ciudad de Mendoza', url: 'https://www.google.com/search?q=Ciudad+de+Mendoza', icon: '🏙️' }
  ];

  const entreNosotrasOfferings = [
    { name: 'Desayuno casero', icon: '☕' },
    { name: 'Yoga y meditación', icon: '🧘‍♀️' },
    { name: 'Senderismo', icon: '🥾' },
    { name: 'Talleres holísticos', icon: '🌿' },
    { name: 'Talleres creativos', icon: '🎨' },
    { name: 'Retiros temáticos', icon: '🌸' },
    { name: 'Pedicure y Manicure', icon: '💅' },
    { name: 'Masajes', icon: '💆‍♀️' },
    { name: 'Depilación', icon: '✨' }
  ];

  return (
    <div className="actividades-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="actividades-hero">
        <div className="actividades-hero-content">
          <h1 className="actividades-hero-title fade-in-up">Actividades y Experiencias</h1>
          <p className="actividades-hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
            Descubre todo lo que Luján de Cuyo tiene para ofrecerte
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-content fade-in-up">
          <p className="intro-text">
            Luján de Cuyo es una de las zonas más representativas de Mendoza, que logra combinar 
            la tranquilidad de la naturaleza y la aventura en un solo lugar.
          </p>
        </div>
      </section>

      {/* Activities Section */}
      <section className="activities-section">
        <div className="container">
          <h2 className="activities-title fade-in-up">Información Turística y Actividades</h2>
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="activity-card fade-in-up" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="activity-icon">{activity.icon}</div>
                <h3 className="activity-name">{activity.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excursions Section */}
      <section className="excursions-section">
        <div className="container">
          <h2 className="excursions-title fade-in-up">Excursiones Cercanas</h2>
          <div className="excursions-grid">
            {excursions.map((excursion, index) => (
              <a
                key={index}
                href={excursion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="excursion-card fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="excursion-icon">{excursion.icon}</div>
                <h3 className="excursion-name">{excursion.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Entre Nosotras Section */}
      <section className="entre-nosotras-section">
        <div className="entre-nosotras-content">
          <h2 className="entre-nosotras-title fade-in-up">"Entre Nosotras"</h2>
          <p className="entre-nosotras-subtitle fade-in-up" style={{animationDelay: '0.1s'}}>
            Encuentros de Bienestar Femenino
          </p>
          
          <p className="entre-nosotras-description fade-in-up" style={{animationDelay: '0.2s'}}>
            Te invitamos a vivir encuentros de Bienestar Femenino en un entorno único de montaña y río, 
            donde la naturaleza acompaña cada experiencia. Un espacio para pausar, respirar, reconectar 
            con tu cuerpo y compartir con otras mujeres desde la calma, el cuidado y la energía del paisaje.
          </p>

          <p className="entre-nosotras-description fade-in-up" style={{animationDelay: '0.3s'}}>
            Caminatas conscientes, momentos de silencio, charlas, movimiento y conexión, rodeadas de la 
            fuerza de la precordillera y la serenidad del agua, las cuales nos invitan a soltar, sanar, 
            y recordar nuestra esencia. Un encuentro para volver a vos, nutrirte y disfrutar.
          </p>

          <div className="entre-nosotras-highlight fade-in-up" style={{animationDelay: '0.4s'}}>
            <p>
              Estos encuentros pueden realizarse con tu grupo de mujeres o de manera individual con otras 
              mujeres, que quizás no sean de tu círculo cercano pero con las cuales te vas a sentir identificada.
            </p>
            <p>
              Estos encuentros son un espacio vivo y compartido. Cada encuentro es distinto, cada encuentro 
              puede adaptarse a cada grupo específico, habrá distintas propuestas disponibles, cada grupo o 
              cada una podrá elegir libremente cómo participar, cada mujer es bienvenida a participar a su 
              ritmo, cada grupo podrá elegir y proponer aquello que necesite.
            </p>
          </div>

          <h3 className="offerings-title fade-in-up" style={{animationDelay: '0.5s'}}>
            Lo que ofrecemos
          </h3>

          <div className="offerings-grid">
            {entreNosotrasOfferings.map((offering, index) => (
              <div 
                key={index} 
                className="offering-item fade-in-up" 
                style={{animationDelay: `${0.6 + index * 0.05}s`}}
              >
                <div className="offering-icon">{offering.icon}</div>
                <p className="offering-name">{offering.name}</p>
              </div>
            ))}
          </div>

          <div className="entre-nosotras-cta fade-in-up" style={{animationDelay: '1.2s'}}>
            <a 
              href={`https://wa.me/5492613001298?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre los encuentros "Entre Nosotras". ¿Podrían brindarme más información?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="entre-nosotras-button"
            >
              Consultar sobre Entre Nosotras
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Actividades;
