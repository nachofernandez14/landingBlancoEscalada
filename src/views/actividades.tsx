import Navbar from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Footprints, Waves, Ship, CircleDot, Fish, Milestone, Wine, UtensilsCrossed, Mountain, Droplets, Squirrel, Building2, Coffee, PersonStanding, Flower2, Palette, Sparkles, Scissors, Hand } from 'lucide-react';
import './actividades.css';

interface Activity {
  _id: string;
  name: string;
  icon: string;
  category: 'activity' | 'excursion' | 'entreNosotras';
  description?: string;
  url?: string;
  active: boolean;
  order: number;
}

const Actividades = () => {
  // Fetch activities from API
  const { data: allActivities = [], isLoading } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await api.get('/activities');
      return response.data;
    }
  });

  // Filter by category
  const activities = allActivities.filter(a => a.category === 'activity' && a.active);
  const excursions = allActivities.filter(a => a.category === 'excursion' && a.active);
  const entreNosotrasOfferings = allActivities.filter(a => a.category === 'entreNosotras' && a.active);

  // Debug
  console.log('Total activities from API:', allActivities.length);
  console.log('Filtered - activities:', activities.length, 'excursions:', excursions.length, 'entreNosotras:', entreNosotrasOfferings.length);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    Footprints,
    Waves,
    Ship,
    CircleDot,
    Fish,
    Milestone,
    Wine,
    UtensilsCrossed,
    Mountain,
    Droplets,
    Squirrel,
    Building2,
    Coffee,
    PersonStanding,
    Flower2,
    Palette,
    Sparkles,
    Scissors,
    Hand
  };

  if (isLoading) {
    return (
      <div className="actividades-page">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #8B4513',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '1rem', color: '#666' }}>Cargando actividades...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="actividades-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="actividades-hero">
        <div className="actividades-hero-content">
          <h1 className="actividades-hero-title fade-in-up">Actividades y Experiencias</h1>
          <p className="actividades-hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
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
            {activities.map((activity, index) => {
              const IconComponent = iconMap[activity.icon];
              
              return (
                <div 
                  key={activity._id} 
                  className="activity-card fade-in-up" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {IconComponent && <IconComponent className="activity-icon" strokeWidth={2} />}
                  <h3 className="activity-name">{activity.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Excursions Section */}
      <section className="excursions-section">
        <div className="container">
          <h2 className="excursions-title fade-in-up">Excursiones Cercanas</h2>
          <div className="excursions-grid">
            {excursions.map((excursion, index) => {
              const IconComponent = iconMap[excursion.icon];
              
              return (
                <a
                  key={excursion._id}
                  href={excursion.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="excursion-card fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {IconComponent && <IconComponent className="excursion-icon" strokeWidth={2} />}
                  <h3 className="excursion-name">{excursion.name}</h3>
                </a>
              );
            })}
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

          <div className="entre-nosotras-video fade-in-up" style={{animationDelay: '0.35s'}}>
            <video controls>
              <source src="/videos/cabañas/v1.mov" type="video/quicktime" />
              <source src="/videos/cabañas/v1.mov" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

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
            {entreNosotrasOfferings.map((offering, index) => {
              const IconComponent = iconMap[offering.icon];
              
              return (
                <div 
                  key={offering._id} 
                  className="offering-item fade-in-up" 
                  style={{animationDelay: `${0.6 + index * 0.05}s`}}
                >
                  {IconComponent && <IconComponent className="offering-icon" strokeWidth={2} />}
                  <p className="offering-name">{offering.name}</p>
                </div>
              );
            })}
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
