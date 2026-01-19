import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PromoButton.css';

const PromoButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);
  const navigate = useNavigate();

  const promos = [
    '¿Ya viste nuestras promociones? 🎁',
    '¡Tenemos ofertas especiales! 🌟',
    '¡Descuentos increíbles te esperan! 💝',
    '¡No te pierdas nuestras promos! 🎉'
  ];

  useEffect(() => {
    // Mostrar el popup ocasionalmente (entre 20-40 segundos después de cargar)
    const randomDelay = Math.random() * 20000 + 20000; // 20-40 segundos
    
    const timer = setTimeout(() => {
      setCurrentPromo(Math.floor(Math.random() * promos.length));
      setShowPopup(true);
      // Ocultar el popup después de 5 segundos
      setTimeout(() => setShowPopup(false), 5000);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate('/cabanas');
    // Esperar a que la navegación se complete y hacer scroll
    setTimeout(() => {
      const promosSection = document.getElementById('promociones');
      if (promosSection) {
        promosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="promo-float"
        aria-label="Ver promociones"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="promo-icon"
        >
          <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path d="M6 6h.008v.008H6V6z" />
        </svg>
        <span className="promo-badge">%</span>
      </button>
      
      {showPopup && (
        <div className="promo-popup">
          <p className="promo-popup-text">{promos[currentPromo]}</p>
        </div>
      )}
    </>
  );
};

export default PromoButton;
