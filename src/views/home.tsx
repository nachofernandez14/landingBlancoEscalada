import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PromoButton from '../components/PromoButton';
import './home.css';
import SplitText from '../components/SplitText';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const navigate = useNavigate();

  const heroImages = [
    '/img/piscina/26.jpg',
    '/img/piscina/46.jpg',
    '/img/nieve/nieve1.jpg',
    '/img/montanaYrio/1.jpg',
    '/img/montanaYrio/4.jpg',
    '/img/parquizado/6.jpg',
    '/img/parquizado/11.jpg',
    '/img/piscina/8.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const reviews = [
    {
      name: 'María González',
      avatar: 'MG',
      stars: 5,
      text: 'Excelente lugar para desconectar y disfrutar de la naturaleza. Las cabañas son muy cómodas y la vista es espectacular. El río está a pocos pasos y la atención es impecable. Muy recomendable para familias.',
      date: 'Hace 2 semanas'
    },
    {
      name: 'Juan Rodríguez',
      avatar: 'JR',
      stars: 5,
      text: 'Hermoso lugar, ideal para pasar unos días en familia. Las cabañas tienen todo lo necesario, muy limpias y bien equipadas. El entorno natural es increíble. Sin duda volveremos.',
      date: 'Hace 1 mes'
    },
    {
      name: 'Laura Sánchez',
      avatar: 'LS',
      stars: 5,
      text: 'Lugar perfecto para desconectar. Las vistas son maravillosas, el río es precioso y las montañas te dejan sin palabras. Las cabañas son acogedoras y la paz que se respira es única. Totalmente recomendable.',
      date: 'Hace 3 semanas'
    },
    {
      name: 'Carlos Fernández',
      avatar: 'CF',
      stars: 5,
      text: 'Una experiencia inolvidable. El contacto con la naturaleza es total. Las instalaciones son excelentes y el trato muy cálido. Ideal para escaparse del ruido de la ciudad.',
      date: 'Hace 1 semana'
    },
    {
      name: 'Ana María López',
      avatar: 'AL',
      stars: 5,
      text: 'Simplemente maravilloso. La ubicación es privilegiada, rodeado de montañas y con el río a metros. Las cabañas son hermosas y súper equipadas. Un lugar para volver una y otra vez.',
      date: 'Hace 2 meses'
    },
    {
      name: 'Roberto Silva',
      avatar: 'RS',
      stars: 5,
      text: 'Perfecto para desconectar y reconectar con la naturaleza. La tranquilidad del lugar es incomparable. Las cabañas tienen todo lo necesario y más. La atención de los dueños es excelente.',
      date: 'Hace 3 semanas'
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="carousel-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Blancos Sueños de Encalada</h1>
              <p className="hero-subtitle">
                Tu refugio en la montaña
              </p>
              <p className="hero-description">
                Desconéctate del mundo y reconéctate contigo mismo en nuestras cabañas 
                junto al río, rodeadas de montañas y naturaleza pura.
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
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`review-card ${index === currentReview ? 'active' : ''} ${
                    index === (currentReview + 1) % reviews.length ? 'next' : ''
                  } ${
                    index === (currentReview - 1 + reviews.length) % reviews.length ? 'prev' : ''
                  }`}
                >
                  <div className="review-header">
                    <div className="review-avatar">{review.avatar}</div>
                    <div className="review-info">
                      <p className="review-name">{review.name}</p>
                      <div className="review-stars">{'★'.repeat(review.stars)}</div>
                    </div>
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <p className="review-date">{review.date}</p>
                </div>
              ))}
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