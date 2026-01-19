import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import { ChefHat, Wifi, Flame, Waves, Trees, Bed, Clock, Gift, ThumbsUp, Smartphone, Flower, PartyPopper, Sparkles, Droplet } from 'lucide-react';
import api from '../services/api';
import './cabañas.css';

interface Amenity {
  name: string;
  icon: string;
}

interface Cabana {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: Amenity[];
  images: string[];
  mainImage: string;
  price: number;
  priceWeekend: number;
  active: boolean;
  order: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Cabañas = () => {
  const { data: cabanas = [], isLoading } = useQuery<Cabana[]>({
    queryKey: ['cabanas'],
    queryFn: async () => {
      const response = await api.get('/cabanas');
      return response.data;
    }
  });

  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  const nextImage = (cabanaId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [cabanaId]: ((prev[cabanaId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (cabanaId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [cabanaId]: ((prev[cabanaId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  if (isLoading) {
    return (
      <div className="cabanas-page">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cabanas-page">
      <Navbar />
      
      <section className="cabanas-hero">
        <div className="cabanas-hero-content">
          <h1 className="cabanas-hero-title fade-in-up">Nuestras Cabañas</h1>
          <p className="cabanas-hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
            Tres opciones únicas para tu estadía perfecta en la montaña
          </p>
        </div>
      </section>

      <section className="cabanas-section">
        <div className="container">
          <div className="cabanas-grid">
            {cabanas.map((cabana) => (
              <div key={cabana._id} className="cabin-card fade-in-up">
                <div className="cabin-image-container">
                  <img 
                    src={`${API_URL}${cabana.images[(currentImageIndex[cabana._id] || 0)]}`}
                    alt={`Cabaña ${cabana.name}`}
                    className="cabin-image"
                  />
                  <div className="cabin-image-controls">
                    <button 
                      className="cabin-image-btn prev"
                      onClick={() => prevImage(cabana._id, cabana.images.length)}
                    >
                      ‹
                    </button>
                    <button 
                      className="cabin-image-btn next"
                      onClick={() => nextImage(cabana._id, cabana.images.length)}
                    >
                      ›
                    </button>
                  </div>
                  <div className="cabin-image-dots">
                    {cabana.images.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === (currentImageIndex[cabana._id] || 0) ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(prev => ({...prev, [cabana._id]: index}))}
                      />
                    ))}
                  </div>
                </div>

                <div className="cabin-content">
                  <h2 className="cabin-title">Cabaña {cabana.name}</h2>
                  <p className="cabin-bedrooms">{cabana.bedrooms} {cabana.bedrooms === 1 ? 'Dormitorio' : 'Dormitorios'}</p>
                  <p className="cabin-description">{cabana.shortDescription}</p>
                  
                  <div className="cabin-info">
                    <span>{cabana.capacity} personas</span>
                    <span>{cabana.bathrooms} {cabana.bathrooms === 1 ? 'baño' : 'baños'}</span>
                  </div>

                  <a 
                    href={`https://wa.me/5492613001298?text=${encodeURIComponent(`¡Hola! Me interesa conocer más sobre Blancos Sueños de Escalada.\n\nQuisiera consultar disponibilidad para la Cabaña ${cabana.name}.\n\n¿Podrían brindarme más información?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cabin-cta"
                  >
                    Consultar Disponibilidad
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="services-section">
        <div className="container">
          <h2 className="services-title fade-in-up">Lo Que Ofrecemos</h2>
          <div className="services-grid">
            <div className="service-item fade-in-up">
              <ChefHat className="service-icon" strokeWidth={2} />
              <p className="service-label">Cocina equipada</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.05s'}}>
              <Wifi className="service-icon" strokeWidth={2} />
              <p className="service-label">WIFI satelital</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.1s'}}>
              <svg className="service-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M17 2L12 7L7 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="service-label">TV (streaming)</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.15s'}}>
              <Flame className="service-icon" strokeWidth={2} />
              <p className="service-label">Galería con churrasquera</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.2s'}}>
              <svg className="service-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="service-label">Cochera techada</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.25s'}}>
              <Droplet className="service-icon" strokeWidth={2} />
              <p className="service-label">Piscina</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.3s'}}>
              <Trees className="service-icon" strokeWidth={2} />
              <p className="service-label">Parquizado</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.35s'}}>
              <svg className="service-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p className="service-label">Información Turística</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.4s'}}>
              <Waves className="service-icon" strokeWidth={2} />
              <p className="service-label">Bajada al Río Mendoza</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.45s'}}>
              <Bed className="service-icon" strokeWidth={2} />
              <p className="service-label">Ropa de cama</p>
            </div>

            <div className="service-item fade-in-up" style={{animationDelay: '0.5s'}}>
              <svg className="service-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p className="service-label">Atención personalizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promociones */}
      <section id="promociones" className="promotions-section">
        <div className="container">
          <h2 className="promotions-title fade-in-up">Promociones</h2>
          
          <div className="promotions-grid">
            <div className="promotion-card fade-in-up">
              <h3 className="promotion-subtitle">Beneficios Especiales</h3>
              <ul className="promotion-list">
                <li className="promotion-item">
                  <Clock className="promotion-icon" strokeWidth={2} />
                  <span className="promotion-text"><strong>Cliente frecuente:</strong> 5ta visita gratis</span>
                </li>
                <li className="promotion-item">
                  <Gift className="promotion-icon" strokeWidth={2} />
                  <span className="promotion-text"><strong>Más de 2 visitas en el año:</strong> Participás por una estadía gratis a pasar el día en nuestras cabañas</span>
                </li>
                <li className="promotion-item">
                  <ThumbsUp className="promotion-icon" strokeWidth={2} />
                  <span className="promotion-text"><strong>Recomendaciones:</strong> 15% de descuento en tu próxima visita</span>
                </li>
                <li className="promotion-item">
                  <Smartphone className="promotion-icon" strokeWidth={2} />
                  <span className="promotion-text"><strong>Compartir tu experiencia en redes:</strong> 10% de descuento en tu próxima visita</span>
                </li>
                <li className="promotion-item">
                  <Flower className="promotion-icon" strokeWidth={2} />
                  <span className="promotion-text"><strong>Encuentros de Mujeres "Entre Nosotras":</strong> Participá con tu grupo por una estadía a pasar el día en nuestras cabañas</span>
                </li>
              </ul>
            </div>

            <div className="promotion-card fade-in-up" style={{animationDelay: '0.15s'}}>
              <h3 className="promotion-subtitle">Descuentos para Estadías</h3>
              <div className="season-promotion">
                <h4 className="season-title">Temporada Baja</h4>
                <ul className="promotion-list">
                  <li className="promotion-item">
                    <PartyPopper className="promotion-icon" strokeWidth={2} />
                    <span className="promotion-text"><strong>Noche extra de regalo</strong> quedándote 2 días</span>
                  </li>
                  <li className="promotion-item">
                    <Sparkles className="promotion-icon" strokeWidth={2} />
                    <span className="promotion-text"><strong>Fin de semana completo:</strong> Pagás sólo 1 día</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="promotion-cta-container fade-in-up" style={{animationDelay: '0.3s'}}>
            <a 
              href={`https://wa.me/5492613001298?text=${encodeURIComponent('¡Hola! Me interesan las promociones de Blancos Sueños de Escalada. ¿Podrían darme más información?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="promotion-cta"
            >
              Consultar Promociones
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cabañas;
