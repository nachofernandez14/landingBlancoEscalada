import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

interface HeroSlide {
  image: string;
  _id?: string;
}

interface Hero {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  slides: HeroSlide[];
}

const HeroPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Hero>>({
    title: '',
    subtitle: '',
    description: '',
    ctaText: '',
    ctaLink: '',
    slides: []
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Obtener hero actual
  const { data: hero, isLoading } = useQuery<Hero>({
    queryKey: ['hero'],
    queryFn: async () => {
      const response = await api.get('/hero');
      return response.data;
    }
  });

  // Mutación para actualizar hero
  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.put(`/hero`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero'] });
      setIsEditing(false);
      setSelectedImages([]);
      alert('Hero actualizado exitosamente');
    },
    onError: (error: any) => {
      alert(`Error al actualizar: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleEdit = () => {
    if (hero) {
      setFormData({
        title: hero.title,
        subtitle: hero.subtitle,
        description: hero.description,
        ctaText: hero.ctaText,
        ctaLink: hero.ctaLink,
        slides: hero.slides
      });
      setIsEditing(true);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...files]);
    }
  };

  const removeNewImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingSlide = (slideId: string) => {
    setFormData(prev => ({
      ...prev,
      slides: prev.slides?.filter(s => s._id !== slideId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title || '');
    data.append('subtitle', formData.subtitle || '');
    data.append('description', formData.description || '');
    data.append('ctaText', formData.ctaText || '');
    data.append('ctaLink', formData.ctaLink || '');
    
    // Agregar imágenes nuevas
    selectedImages.forEach(file => {
      data.append('images', file);
    });

    // Agregar slides existentes que se mantienen
    data.append('existingSlides', JSON.stringify(formData.slides?.map(s => s.image) || []));

    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">No se encontró configuración de Hero. Por favor, inicializa la base de datos.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-600 mt-1">Gestiona el banner principal de la landing</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Editar Hero
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título Principal
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto del Botón
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enlace del Botón
              </label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes del Carrusel
            </label>
            
            {/* Slides existentes */}
            {formData.slides && formData.slides.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.slides.map((slide) => (
                  <div key={slide._id} className="relative group">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${slide.image}`}
                      alt="Slide"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingSlide(slide._id!)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Nuevas imágenes seleccionadas */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Nueva ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">Puedes seleccionar múltiples imágenes</p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSelectedImages([]);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Título</h3>
            <p className="text-lg font-semibold text-gray-900">{hero.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Subtítulo</h3>
            <p className="text-gray-900">{hero.subtitle}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Descripción</h3>
            <p className="text-gray-700">{hero.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Botón</h3>
              <p className="text-gray-900">{hero.ctaText}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Enlace</h3>
              <p className="text-gray-900">{hero.ctaLink}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Imágenes del Carrusel ({hero.slides.length})</h3>
            <div className="grid grid-cols-3 gap-4">
              {hero.slides.map((slide, index) => (
                <img
                  key={slide._id || index}
                  src={`${import.meta.env.VITE_API_URL}${slide.image}`}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroPage;
