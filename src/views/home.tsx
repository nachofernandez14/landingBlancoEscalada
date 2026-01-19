import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import Navbar from '../components/Navbar';
import PromoButton from '../components/PromoButton';
import './home.css';
import SplitText from '../components/SplitText';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Hero {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  slides: string[];
}

interface Review {
  name: string;
  avatar: string;
  stars: number;
  text: string;
  date: string;
  relativeTime?: string;
  authorUrl?: string;
}

interface GoogleReviewsResponse {
  placeName: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const navigate = useNavigate();

  // Fetch Hero data
  const { data: hero, isLoading: heroLoading } = useQuery<Hero>({
    queryKey: ['hero'],
    queryFn: async () => {
      const response = await api.get('/hero');
      return response.data;
    }
  });

  // Fetch Reviews data from Google
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery<GoogleReviewsResponse>({
    queryKey: ['google-reviews'],
    queryFn: async () => {
      const response = await api.get('/google-reviews');
      return response.data;
    }
  });

  const reviews = reviewsData?.reviews || [];
  const heroImages = hero?.slides || [];

  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (heroLoading || reviewsLoading) {
    return (
      <div className="home">
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
            <p style={{ marginTop: '1rem', color: '#666' }}>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />

      {/* Hero Carousel Full Width */}
      <section className="hero" id="inicio">
        <div className="carousel">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${API_URL}${img})` }}
            />
          ))}
          <div className="carousel-overlay">
            <div className="hero-content">
              <h1 className="hero-title">{hero?.title || 'Blancos Sueños de Encalada'}</h1>
              <p className="hero-subtitle">
                {hero?.subtitle || 'Tu refugio en la montaña'}
              </p>
              <p className="hero-description">
                {hero?.description || 'Desconéctate del mundo y reconéctate contigo mismo en nuestras cabañas junto al río, rodeadas de montañas y naturaleza pura.'}
              </p>
              <button className="cta-button" onClick={() => navigate('/cabanas')}>
                Descubre nuestras cabañas
              </button>
              
            </div>
          </div>
          <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
          <button className="carousel-btn next" onClick={nextSlide}>›</button>
          <div className="carousel-dots">
            {heroImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Descripción del Establecimiento */}
      <section className="description-section">
        <div className="container">
          <div className="description-content">
            <SplitText 
              text="Blancos Sueños de Escalada"
              tag="h2"
              className="description-title"
              splitType="chars"
              delay={40}
              duration={0.8}
            />
            
            <div className="description-features">
              <div className="feature-item">
                <img src="/img/icons/mountain.png" alt="Montaña" className="feature-icon" />
                <p className="feature-label">Precordillera de Los Andes</p>
              </div>
              <div className="feature-item">
                <img src="/img/icons/river.png" alt="Río" className="feature-icon" />
                <p className="feature-label">Río Mendoza</p>
              </div>
              <div className="feature-item">
                <img src="/img/icons/city.png" alt="Ciudad" className="feature-icon" />
                <p className="feature-label">26 km de Mendoza</p>
              </div>
            </div>

            <p className="description-text fade-in-up">
              Descubrí una escapada única en <strong>Las Compuertas, Luján de Cuyo</strong>, La Cuna Del 
              Malbec, rodeada por la Precordillera de Los Andes y el Río Mendoza, a solo 26 km 
              de la ciudad de Mendoza. Nuestras cabañas combinan descanso y naturaleza con 
              propuestas de aventura y actividades al aire libre como caminatas, paseos junto al 
              río y experiencias en contacto con el paisaje mendocino.
            </p>
            <p className="description-text fade-in-up" style={{animationDelay: '0.2s'}}>
              Un lugar ideal para familias, parejas y encuentros de mujeres que buscan compartir 
              momentos especiales, relajarse y reconectar en un entorno natural, seguro y lleno 
              de energía.
            </p>
          </div>
        </div>
      </section>

      {/* Reseñas de Google */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Reseñas de Google</h2>
          <div className="reviews-carousel">
            <button className="review-btn prev" onClick={prevReview}>‹</button>
            
            <div className="reviews-slider">
              {reviews.map((review, index) => {
                return (
                  <div
                    key={index}
                    className={`review-card ${index === currentReview ? 'active' : ''} ${
                      index === (currentReview + 1) % reviews.length ? 'next' : ''
                    } ${
                      index === (currentReview - 1 + reviews.length) % reviews.length ? 'prev' : ''
                    }`}
                  >
                    <div className="review-header">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="review-avatar-img"
                        onError={(e) => {
                          // Fallback a iniciales si la imagen falla
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const initials = review.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2);
                          target.parentElement!.innerHTML = `<div class="review-avatar">${initials}</div>`;
                        }}
                      />
                      <div className="review-info">
                        <p className="review-name">
                          {review.authorUrl ? (
                            <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                              {review.name}
                            </a>
                          ) : review.name}
                        </p>
                        <div className="review-stars">{'★'.repeat(review.stars)}</div>
                      </div>
                    </div>
                    <p className="review-text">"{review.text}"</p>
                    <p className="review-date">
                      {review.relativeTime || review.date}
                      {reviewsData && (
                        <span style={{ marginLeft: '8px', fontSize: '0.85em', opacity: 0.7 }}>
                          • Vía Google
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <button className="review-btn next" onClick={nextReview}>›</button>
          </div>
          
          <div className="review-dots">
            {reviews.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentReview ? 'active' : ''}`}
                onClick={() => setCurrentReview(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación Google Maps */}
      <section className="location-section">
        <div className="container">
          <h2 className="section-title">Encontranos</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3977.4515770012026!2d-69.03243008169376!3d-33.04001476911882!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967de763a2a6b95d%3A0x78d605704f0fa872!2sCaba%C3%B1as%20Blancos%20Sue%C3%B1os%20De%20Encalada!5e0!3m2!1ses-419!2sus!4v1767622422602!5m2!1ses-419!2sus"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      
      <PromoButton />
    </div>
  );
};

export default Home;