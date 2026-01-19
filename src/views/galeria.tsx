import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './galeria.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface MediaItem {
  _id: string;
  type: 'image' | 'video';
  src: string;
  category: 'todas' | 'cabañas' | 'naturaleza';
  title?: string;
  description?: string;
  active: boolean;
  order: number;
}

const Galeria = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todas');

  // Fetch gallery items from API
  const { data: allMediaItems = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await api.get('/gallery');
      return response.data;
    }
  });

  // Filter active items
  const mediaItems = allMediaItems.filter(item => item.active);

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

  if (isLoading) {
    return (
      <div className="galeria-page">
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
            <p style={{ marginTop: '1rem', color: '#666' }}>Cargando galería...</p>
          </div>
        </div>
      </div>
    );
  }

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
                key={item._id} 
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                {item.type === 'image' ? (
                  <img src={`${API_URL}${item.src}`} alt={item.title || `Galería ${index + 1}`} className="gallery-image" />
                ) : (
                  <div className="gallery-video-preview">
                    <video src={`${API_URL}${item.src}`} className="gallery-video" />
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
                src={`${API_URL}${filteredMedia[selectedMedia].src}`} 
                alt={filteredMedia[selectedMedia].title || `Imagen ${selectedMedia + 1}`}
                className="lightbox-image"
              />
            ) : (
              <video 
                src={`${API_URL}${filteredMedia[selectedMedia].src}`}
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
