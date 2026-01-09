import { useState } from 'react';
import Navbar from '../components/Navbar';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './galeria.css';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  category: string;
}

const Galeria = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todas');

  // Todas las imágenes organizadas por categoría
  const mediaItems: MediaItem[] = [
    // Cabañas Cabernet
    ...Array.from({ length: 14 }, (_, i) => {
      const files = [
        'cabanaCarbernet.jpg', 'cabanaCarbernet1.png', 'cabanaCarbernet_baño.jpg',
        'cabanaCarbernet_baño1.jpg', 'cabanaCarbernet_baño2.jpg', 'cabanaCarbernet_baño3.jpg',
        'cabanaCarbernet_cocina.jpg', 'cabanaCarbernet_cocina1.jpg', 'cabanaCarbernet_comedor.png',
        'cabanaCarbernet_dormitorio.jpg', 'cabanaCarbernet_dormitorio1.jpg', 'cabanaCarbernet_dormitorio2.jpg',
        'cabanaCarbernet_salida.jpg', 'cabanaCarbernet_salida1.jpg'
      ];
      return {
        type: 'image' as const,
        src: `/img/cabanaCabernnet/${files[i]}`,
        category: 'cabañas'
      };
    }),
    
    // Cabañas Chardonnay
    ...Array.from({ length: 15 }, (_, i) => {
      const files = [
        'cabanaChardonnay.jpg', 'cabanaChardonnay_baño.jpg', 'cabanaChardonnay_baño1.jpg',
        'cabanaChardonnay_baño2.jpg', 'cabanaChardonnay_cocina.jpg', 'cabanaChardonnay_comedor.jpg',
        'cabanaChardonnay_comedor1.jpg', 'cabanaChardonnay_dormitorio.jpg', 'cabanaChardonnay_dormitorio2.png',
        'cabanaChardonnay_salida.jpg', 'cabanaChardonnay_salida2.jpg', 'cabanaChardonnay_salida3.jpg',
        'cabanaChardonnay_salida4.jpg', 'cabanaChardonnay_salida5.jpg', 'cabanaChardonnay_salida6.jpg'
      ];
      return {
        type: 'image' as const,
        src: `/img/cabanaChardonnay/${files[i]}`,
        category: 'cabañas'
      };
    }),

    // Montaña y Río (solo números que existen)
    ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39]
      .map(num => ({
        type: 'image' as const,
        src: `/img/montanaYrio/${num}.jpg`,
        category: 'naturaleza'
      })),

    // Videos de cabañas
    ...['v1.mov', 'v2.mov', 'v3.mov', 'v4.mov', 'v5.mp4', 'v6.mp4', 'v7.mp4'].map(video => ({
      type: 'video' as const,
      src: `/videos/cabañas/${video}`,
      category: 'cabañas'
    })),

    // Videos de parquizado
    ...['v5.mp4'].map(video => ({
      type: 'video' as const,
      src: `/videos/parquizado/${video}`,
      category: 'naturaleza'
    })),

    // Videos de piscina
    ...['v4.mp4'].map(video => ({
      type: 'video' as const,
      src: `/videos/piscina/${video}`,
      category: 'naturaleza'
    })),

    
  ];

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'cabañas', label: 'Cabañas' },
    { id: 'naturaleza', label: 'Naturaleza' }
  ];

  const filteredMedia = activeCategory === 'todas' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedMedia(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const goToPrevious = () => {
    if (selectedMedia !== null) {
      setSelectedMedia(selectedMedia === 0 ? filteredMedia.length - 1 : selectedMedia - 1);
    }
  };

  const goToNext = () => {
    if (selectedMedia !== null) {
      setSelectedMedia(selectedMedia === filteredMedia.length - 1 ? 0 : selectedMedia + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <div className="galeria-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="galeria-hero">
        <div className="galeria-hero-content">
          <h1 className="galeria-hero-title fade-in-up">Galería</h1>
          <p className="galeria-hero-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
            Descubre la belleza de nuestras cabañas y entorno natural
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-filter fade-in-up">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredMedia.map((item, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt={`Galería ${index + 1}`} className="gallery-image" />
                ) : (
                  <div className="gallery-video-preview">
                    <video src={item.src} className="gallery-video" />
                    <div className="video-overlay">
                      <Play className="play-icon" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedMedia !== null && (
        <div 
          className="lightbox" 
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="lightbox-close" onClick={closeLightbox}>
            <X />
          </button>
          
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
            <ChevronLeft />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {filteredMedia[selectedMedia].type === 'image' ? (
              <img 
                src={filteredMedia[selectedMedia].src} 
                alt={`Imagen ${selectedMedia + 1}`}
                className="lightbox-image"
              />
            ) : (
              <video 
                src={filteredMedia[selectedMedia].src}
                controls
                autoPlay
                className="lightbox-video"
              />
            )}
          </div>
          
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            <ChevronRight />
          </button>

          <div className="lightbox-counter">
            {selectedMedia + 1} / {filteredMedia.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
