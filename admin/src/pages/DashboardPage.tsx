import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Image, Home, Activity, Star, ImageIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { data: cabanas = [] } = useQuery<any[]>({
    queryKey: ['cabanas'],
    queryFn: () => apiService.get('/cabanas'),
  });

  const { data: activities = [] } = useQuery<any[]>({
    queryKey: ['activities'],
    queryFn: () => apiService.get('/activities'),
  });

  const { data: reviews = [] } = useQuery<any[]>({
    queryKey: ['reviews'],
    queryFn: () => apiService.get('/reviews'),
  });

  const { data: gallery = [] } = useQuery<any[]>({
    queryKey: ['gallery'],
    queryFn: () => apiService.get('/gallery'),
  });

  const stats = [
    {
      label: 'Cabañas',
      value: cabanas.length || 0,
      icon: Image,
      color: 'bg-blue-500',
      link: '/cabanas',
    },
    {
      label: 'Actividades',
      value: activities.length || 0,
      icon: Activity,
      color: 'bg-green-500',
      link: '/actividades',
    },
    {
      label: 'Reseñas',
      value: reviews.length || 0,
      icon: Star,
      color: 'bg-yellow-500',
      link: '/reseñas',
    },
    {
      label: 'Galería',
      value: gallery.length || 0,
      icon: ImageIcon,
      color: 'bg-purple-500',
      link: '/galeria',
    },
  ];

  const quickActions = [
    { label: 'Editar Hero', icon: Home, link: '/hero', color: 'bg-primary' },
    { label: 'Nueva Cabaña', icon: Image, link: '/cabanas', color: 'bg-blue-600' },
    { label: 'Nueva Actividad', icon: Activity, link: '/actividades', color: 'bg-green-600' },
    { label: 'Configuración', icon: Settings, link: '/configuracion', color: 'bg-gray-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Panel de administración de Blancos Sueños de Escalada
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.link}
                className={`${action.color} hover:opacity-90 text-white rounded-lg p-4 flex items-center gap-3 transition-opacity`}
              >
                <Icon size={20} />
                <span className="font-medium">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-sm text-white p-8">
        <h2 className="text-2xl font-bold mb-2">¡Bienvenido al Panel de Administración!</h2>
        <p className="text-white/90">
          Desde aquí puedes gestionar todo el contenido de tu landing page de manera fácil y rápida.
          Edita textos, imágenes, cabañas, actividades y mucho más.
        </p>
      </div>
    </div>
  );
};
