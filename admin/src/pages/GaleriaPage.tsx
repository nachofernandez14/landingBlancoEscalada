import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

interface GalleryItem {
  _id: string;
  type: 'image' | 'video';
  src: string;
  category: 'todas' | 'cabañas' | 'naturaleza';
  title?: string;
  description?: string;
  active: boolean;
  order: number;
}

const GaleriaPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    type: 'image',
    category: 'naturaleza',
    active: true,
    order: 0
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await api.get('/gallery');
      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/gallery', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      closeModal();
      alert('Imagen agregada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await api.put(`/gallery/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      closeModal();
      alert('Imagen actualizada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      alert('Imagen eliminada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      type: 'image',
      category: 'naturaleza',
      active: true,
      order: galleryItems.length
    });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      category: item.category,
      title: item.title,
      description: item.description,
      active: item.active,
      order: item.order
    });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedImage(null);
    setFormData({
      type: 'image',
      category: 'naturaleza',
      active: true,
      order: 0
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('type', formData.type || 'image');
    data.append('category', formData.category || 'naturaleza');
    data.append('active', String(formData.active ?? true));
    data.append('order', String(formData.order || 0));
    if (formData.title) {
      data.append('title', formData.title);
    }
    if (formData.description) {
      data.append('description', formData.description);
    }

    if (selectedImage) {
      data.append('image', selectedImage);
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: string, title?: string) => {
    const confirmText = title || 'esta imagen';
    if (window.confirm(`¿Eliminar "${confirmText}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const filteredItems = filterCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filterCategory);

  const handleVideoHover = (e: React.MouseEvent<HTMLVideoElement>, play: boolean) => {
    const video = e.currentTarget;
    if (play) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  const openPreview = (item: GalleryItem) => {
    setPreviewItem(item);
  };

  const closePreview = () => {
    setPreviewItem(null);
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      'cabañas': { color: 'bg-blue-100 text-blue-800', label: 'Cabañas' },
      'naturaleza': { color: 'bg-green-100 text-green-800', label: 'Naturaleza' },
      'todas': { color: 'bg-gray-100 text-gray-800', label: 'Todas' }
    };
    return badges[category] || badges.naturaleza;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galería</h1>
          <p className="text-gray-600 mt-1">Gestiona las imágenes de la galería</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Imagen
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({galleryItems.length})
          </button>
          {['cabañas', 'naturaleza'].map((cat) => {
            const count = galleryItems.filter(item => item.category === cat).length;
            const badge = getCategoryBadge(cat);
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : `${badge.color} hover:opacity-80`
                }`}
              >
                {badge.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de imágenes */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">
            {filterCategory === 'all' 
              ? 'No hay imágenes en la galería.' 
              : `No hay imágenes en la categoría "${getCategoryBadge(filterCategory).label}".`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden group relative"
              >
                <div className="aspect-square relative overflow-hidden" onClick={() => item.type === 'video' ? openPreview(item) : null}>
                  {item.type === 'image' ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${item.src}`}
                      alt={item.title || item.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <video
                        src={`${import.meta.env.VITE_API_URL}${item.src}`}
                        className="w-full h-full object-cover cursor-pointer"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => handleVideoHover(e, true)}
                        onMouseLeave={(e) => handleVideoHover(e, false)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.title || 'Sin título'}</h3>
                    <div className="flex gap-1 flex-shrink-0">
                      {item.type === 'video' && (
                        <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                      {!item.active && (
                        <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">Oculto</span>
                      )}
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Editar Imagen' : 'Agregar Imagen'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="image">Imagen</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="cabañas">Cabañas</option>
                    <option value="naturaleza">Naturaleza</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título (opcional)</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción de la imagen"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Orden</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Menor número aparece primero</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen {!editingItem && '*'}
                </label>
                {editingItem && editingItem.src && !selectedImage && (
                  <div className="mb-2">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${editingItem.src}`}
                      alt="Actual"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-500 mt-1">Imagen actual - Sube una nueva para reemplazarla</p>
                  </div>
                )}
                {selectedImage && (
                  <div className="mb-2">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border-2 border-green-500"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!editingItem}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active ?? true}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Visible en la galería</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Guardando...'
                    : editingItem
                    ? 'Actualizar'
                    : 'Agregar Imagen'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewItem && previewItem.type === 'video' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <video
              src={`${import.meta.env.VITE_API_URL}${previewItem.src}`}
              className="w-full rounded-lg"
              controls
              autoPlay
              loop
            />
            {previewItem.title && (
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-semibold">{previewItem.title}</h3>
                {previewItem.description && (
                  <p className="text-gray-300 mt-2">{previewItem.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaPage;
