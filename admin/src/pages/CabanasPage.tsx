import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

interface Amenity {
  name: string;
  icon: string;
  _id?: string;
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

const CabanasPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCabana, setEditingCabana] = useState<Cabana | null>(null);
  const [formData, setFormData] = useState<Partial<Cabana>>({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    priceWeekend: 0,
    amenities: [],
    active: true,
    order: 0
  });
  const [newAmenity, setNewAmenity] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Obtener cabañas
  const { data: cabanas = [], isLoading } = useQuery<Cabana[]>({
    queryKey: ['cabanas'],
    queryFn: async () => {
      const response = await api.get('/cabanas');
      return response.data;
    }
  });

  // Crear cabaña
  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/cabanas', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabanas'] });
      closeModal();
      alert('Cabaña creada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error al crear: ${error.response?.data?.message || error.message}`);
    }
  });

  // Actualizar cabaña
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await api.put(`/cabanas/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cabanas'] });
      await queryClient.refetchQueries({ queryKey: ['cabanas'] });
      closeModal();
      alert('Cabaña actualizada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error al actualizar: ${error.response?.data?.message || error.message}`);
    }
  });

  // Eliminar cabaña
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/cabanas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabanas'] });
      alert('Cabaña eliminada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error al eliminar: ${error.response?.data?.message || error.message}`);
    }
  });

  const openCreateModal = () => {
    setEditingCabana(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      capacity: 2,
      rooms: 1,
      bathrooms: 1,
      size: 50,
      price: 0,
      amenities: [],
      featured: false,
      available: true
    });
    setSelectedImages([]);
    setIsModalOpen(true);
  };

  const openEditModal = (cabana: Cabana) => {
    setEditingCabana(cabana);
    setFormData({
      name: cabana.name,
      slug: cabana.slug,
      description: cabana.description,
      shortDescription: cabana.shortDescription,
      capacity: cabana.capacity,
      bedrooms: cabana.bedrooms,
      bathrooms: cabana.bathrooms,
      price: cabana.price,
      priceWeekend: cabana.priceWeekend,
      amenities: [...cabana.amenities],
      active: cabana.active,
      order: cabana.order,
      images: [...cabana.images],
      mainImage: cabana.mainImage
    });
    setSelectedImages([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCabana(null);
    setSelectedImages([]);
    setNewAmenity('');
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...(prev.amenities || []), newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.filter((_, i) => i !== index)
    }));
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

  const removeExistingImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter(img => img !== image)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name || '');
    data.append('slug', formData.slug || '');
    data.append('description', formData.description || '');
    data.append('shortDescription', formData.shortDescription || '');
    data.append('capacity', String(formData.capacity || 0));
    data.append('bedrooms', String(formData.bedrooms || 0));
    data.append('bathrooms', String(formData.bathrooms || 0));
    data.append('price', String(formData.price || 0));
    data.append('priceWeekend', String(formData.priceWeekend || 0));
    data.append('active', String(formData.active));
    data.append('order', String(formData.order || 0));
    
    // Convertir amenities a objetos con name e icon
    const amenitiesData = (formData.amenities || []).map(amenity => 
      typeof amenity === 'string' 
        ? { name: amenity, icon: 'Star' } 
        : amenity
    );
    data.append('amenities', JSON.stringify(amenitiesData));

    selectedImages.forEach(file => {
      data.append('images', file);
    });

    if (editingCabana) {
      data.append('existingImages', JSON.stringify(formData.images || []));
      updateMutation.mutate({ id: editingCabana._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar la cabaña "${name}"?`)) {
      deleteMutation.mutate(id);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Cabañas</h1>
          <p className="text-gray-600 mt-1">Gestiona el catálogo de cabañas</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Cabaña
        </button>
      </div>

      {/* Lista de cabañas */}
      <div className="grid gap-6">
        {cabanas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No hay cabañas registradas. Crea la primera cabaña.</p>
          </div>
        ) : (
          cabanas.map((cabana) => (
            <div key={cabana._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4 p-6">
                {/* Imagen principal */}
                <div className="md:col-span-1">
                  {cabana.mainImage || cabana.images[0] ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${cabana.mainImage || cabana.images[0]}`}
                      alt={cabana.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  )}
                  {!cabana.active && (
                    <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      Inactiva
                    </span>
                  )}
                </div>

                {/* Información */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cabana.name}</h3>
                      <p className="text-sm text-gray-500">/{cabana.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(cabana)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(cabana._id, cabana.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{cabana.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {cabana.capacity} personas
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {cabana.bedrooms} habitaciones
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                      {cabana.size}m²
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      ${cabana.price}/noche
                    </div>
                  </div>

                  {cabana.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cabana.amenities.slice(0, 5).map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {typeof amenity === 'string' ? amenity : amenity.name || ''}
                        </span>
                      ))}
                      {cabana.amenities.length > 5 && (
                        <span className="px-3 py-1 text-gray-500 text-sm">
                          +{cabana.amenities.length - 5} más
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCabana ? 'Editar Cabaña' : 'Nueva Cabaña'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Cabaña *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL) *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="cabana-chardonnay"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción Corta *
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cabaña ideal para parejas"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Habitaciones *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Baños *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio por Noche (USD) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Fin de Semana (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.priceWeekend}
                    onChange={(e) => setFormData({ ...formData, priceWeekend: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comodidades
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                    placeholder="Ej: WiFi, Cocina equipada..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Agregar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities?.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                    >
                      {typeof amenity === 'string' ? amenity : amenity.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="text-blue-900 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes
                </label>

                {editingCabana && formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${image}`}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(image)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Nueva ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-green-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition text-xs"
                        >
                          ×
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
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Destacar esta cabaña</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Disponible</span>
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
                    : editingCabana
                    ? 'Actualizar Cabaña'
                    : 'Crear Cabaña'}
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
    </div>
  );
};

export default CabanasPage;
