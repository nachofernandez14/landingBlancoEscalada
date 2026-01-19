import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

interface Activity {
  _id: string;
  name: string;
  icon: string;
  category: 'activity' | 'excursion' | 'entreNosotras';
  description?: string;
  url?: string;
  active: boolean;
  order: number;
}

const ActividadesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({
    name: '',
    icon: '',
    category: 'activity',
    description: '',
    url: '',
    active: true,
    order: 0
  });
  const [newIncluded, setNewIncluded] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: activities = [], isLoading } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await api.get('/activities');
      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/activities', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      closeModal();
      alert('Actividad creada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.put(`/activities/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      closeModal();
      alert('Actividad actualizada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/activities/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      alert('Actividad eliminada exitosamente');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  });

  const openCreateModal = () => {
    setEditingActivity(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      duration: '',
      difficulty: 'Moderada',
      category: '',
      icon: '',
      included: [],
      featured: false
    });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      name: activity.name,
      icon: activity.icon,
      category: activity.category,
      description: activity.description || '',
      url: activity.url || '',
      active: activity.active,
      order: activity.order
    });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingActivity(null);
    setSelectedImage(null);
    setNewIncluded('');
  };

  const handleAddIncluded = () => {
    // No longer needed - removed
  };

  const handleRemoveIncluded = (index: number) => {
    // No longer needed - removed
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name || '',
      icon: formData.icon || '',
      category: formData.category || 'activity',
      description: formData.description || '',
      url: formData.url || '',
      active: formData.active !== undefined ? formData.active : true,
      order: formData.order || 0
    };

    if (editingActivity) {
      updateMutation.mutate({ id: editingActivity._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`¿Eliminar "${name}"?`)) {
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
          <h1 className="text-3xl font-bold text-gray-900">Actividades</h1>
          <p className="text-gray-600 mt-1">Gestiona las actividades disponibles</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Actividad
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {activities.length === 0 ? (
          <div className="col-span-2 bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No hay actividades registradas.</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{activity.name}</h3>
                    <p className="text-sm text-gray-500">Ícono: {activity.icon}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(activity)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(activity._id, activity.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {activity.description && (
                  <p className="text-gray-700 mb-4 line-clamp-3">{activity.description}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {activity.category === 'activity' ? 'Actividad' : 
                     activity.category === 'excursion' ? 'Excursión' : 
                     'Entre Nosotras'}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    Orden: {activity.order}
                  </span>
                  {!activity.active && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Inactiva
                    </span>
                  )}
                </div>

                {activity.url && (
                  <div className="mt-2">
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Ver enlace →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingActivity ? 'Editar Actividad' : 'Nueva Actividad'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ícono (lucide-react) *</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mountain, Waves, Coffee, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="activity">Actividad</option>
                    <option value="excursion">Excursión</option>
                    <option value="entreNosotras">Entre Nosotras</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Orden</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL (opcional)</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://ejemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Actividad activa
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
                    : editingActivity
                    ? 'Actualizar'
                    : 'Crear Actividad'}
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

export default ActividadesPage;
