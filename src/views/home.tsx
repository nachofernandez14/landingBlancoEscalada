import React from 'react';
import '../app.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Blanco Escalada</h1>
            <p className="hero-subtitle">
              Tu refugio en la montaña. Donde la naturaleza se encuentra con el descanso.
            </p>
            <p className="hero-description">
              Desconéctate del mundo y reconéctate contigo mismo en nuestras cabañas 
              junto al río, rodeadas de montañas y naturaleza pura.
            </p>
            <button className="cta-button">Descubre nuestras cabañas</button>
          </div>
        </div>
      </section>

      {/* Experiencia Section */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">Una Experiencia Auténtica</h2>
          <p className="section-description">
            En Blanco Escalada te ofrecemos mucho más que un lugar para descansar. 
            Cada momento está diseñado para que vivas la montaña en su forma más pura.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏔️</div>
              <h3 className="feature-title">Naturaleza Pura</h3>
              <p className="feature-text">
                Rodeado de montañas y senderos para explorar
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌊</div>
              <h3 className="feature-title">Junto al Río</h3>
              <p className="feature-text">
                El sonido del agua acompañará tu descanso
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛏️</div>
              <h3 className="feature-title">Comodidad Total</h3>
              <p className="feature-text">
                Cabañas equipadas con todo lo que necesitas
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">Bienestar</h3>
              <p className="feature-text">
                Espacios pensados para tu paz y renovación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Preview */}
      <section className="gallery-preview">
        <div className="gallery-grid">
          <div className="gallery-item gallery-item-large">
            <div className="gallery-placeholder">
              <span>Montaña al atardecer</span>
            </div>
          </div>
          <div className="gallery-item">
            <div className="gallery-placeholder">
              <span>Cabaña</span>
            </div>
          </div>
          <div className="gallery-item">
            <div className="gallery-placeholder">
              <span>Río</span>
            </div>
          </div>
          <div className="gallery-item">
            <div className="gallery-placeholder">
              <span>Interior</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Experiencias que Inspiran</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Un lugar mágico para desconectar. Las cabañas son hermosas y la vista 
                a las montañas es simplemente espectacular. Volveremos sin dudas."
              </p>
              <p className="testimonial-author">— María & Carlos</p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Perfecto para familias. Nuestros hijos disfrutaron del río y nosotros 
                del descanso. La atención fue excepcional."
              </p>
              <p className="testimonial-author">— Familia González</p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "El retiro de mujeres fue una experiencia transformadora. El entorno 
                natural y la paz del lugar crearon el ambiente perfecto."
              </p>
              <p className="testimonial-author">— Andrea L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="container">
          <h2 className="section-title">Cómo Llegar</h2>
          <p className="section-description">
            Ubicados en el corazón de la montaña, a solo unos kilómetros de la ciudad.
          </p>
          
          <div className="location-content">
            <div className="map-placeholder">
              <div className="map-container">
                <p>📍 Mapa de ubicación</p>
                <p className="map-note">Integración con Google Maps</p>
              </div>
            </div>
            
            <div className="location-info">
              <h3 className="location-title">Información de Acceso</h3>
              <ul className="location-list">
                <li>🚗 Acceso por ruta pavimentada</li>
                <li>⏱️ A 45 minutos de la ciudad</li>
                <li>🅿️ Estacionamiento disponible</li>
                <li>📶 Señal de celular disponible</li>
              </ul>
              <button className="secondary-button">Ver direcciones completas</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Listo para tu Escapada?</h2>
          <p className="cta-text">
            Reserva ahora y vive la experiencia Blanco Escalada
          </p>
          <button className="cta-button-large">Consultar Disponibilidad</button>
        </div>
      </section>
    </div>
  );
};

export default Home;