import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import User from './models/User';
import Hero from './models/Hero';
import Cabana from './models/Cabana';
import Activity from './models/Activity';
import Review from './models/Review';
import Config from './models/Config';
import GalleryItem from './models/GalleryItem';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blancosuenos';
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB');

    // Eliminar toda la base de datos y empezar de cero
    await mongoose.connection.dropDatabase();
    console.log('🗑️  Base de datos eliminada completamente');

    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@blancosuenos.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin'
    });
    console.log('👤 Usuario admin creado (email: admin@blancosuenos.com, password: admin123)');

    // Crear Hero con imágenes del carrusel
    await Hero.create({
      title: 'Blancos Sueños de Escalada',
      subtitle: 'Tu refugio en la montaña',
      description: 'Desconéctate del mundo y reconéctate contigo mismo en nuestras cabañas junto al río, rodeadas de montañas y naturaleza pura.',
      ctaText: 'Descubre nuestras cabañas',
      ctaLink: '/cabanas',
      slides: [
        { image: '/img/piscina/26.jpg' },
        { image: '/img/piscina/46.jpg' },
        { image: '/img/nieve/nieve1.jpg' },
        { image: '/img/montanaYrio/1.jpg' },
        { image: '/img/montanaYrio/4.jpg' },
        { image: '/img/parquizado/6.jpg' },
        { image: '/img/parquizado/11.jpg' },
        { image: '/img/piscina/8.jpg' }
      ]
    });
    console.log('🎨 Hero creado con 8 imágenes de carrusel');

    // Crear Cabañas
    const cabanas = [
      {
        name: 'Cabernet',
        slug: 'cabernet',
        description: '1 dormitorio en planta alta con sommier y cama doble, balcón con vista a la montaña. 1 dormitorio en planta baja con camas individuales.',
        shortDescription: 'Cabaña de 2 dormitorios ideal para familias',
        capacity: 4,
        bedrooms: 2,
        bathrooms: 1,
        price: 0,
        priceWeekend: 0,
        mainImage: '/img/cabanaCabernnet/cabanaCarbernet.jpg',
        amenities: [
          { name: 'Cocina equipada', icon: 'ChefHat' },
          { name: 'WiFi satelital', icon: 'Wifi' },
          { name: 'TV (streaming)', icon: 'Tv' },
          { name: 'Galería con churrasquera', icon: 'Flame' },
          { name: 'Ropa de cama', icon: 'Bed' },
          { name: 'Estacionamiento', icon: 'Car' },
          { name: 'Agua mineral', icon: 'Droplet' },
          { name: 'Amenities de baño', icon: 'Sparkles' }
        ],
        images: [
          '/img/cabanaCabernnet/cabanaCarbernet.jpg',
          '/img/cabanaCabernnet/cabanaCarbernet_dormitorio.jpg',
          '/img/cabanaCabernnet/cabanaCarbernet_dormitorio1.jpg',
          '/img/cabanaCabernnet/cabanaCarbernet_cocina.jpg',
          '/img/cabanaCabernnet/cabanaCarbernet_comedor.png',
          '/img/cabanaCabernnet/cabanaCarbernet_baño.jpg'
        ],
        order: 0,
        active: true
      },
      {
        name: 'Chardonnay',
        slug: 'chardonnay',
        description: 'Ideal para 2 personas. 1 dormitorio en planta baja con sommier y cama doble. Vista a la montaña desde la galería.',
        shortDescription: 'Cabaña íntima ideal para parejas',
        capacity: 2,
        bedrooms: 1,
        bathrooms: 1,
        price: 0,
        priceWeekend: 0,
        mainImage: '/img/cabanaChardonnay/cabanaChardonnay.jpg',
        amenities: [
          { name: 'Cocina equipada', icon: 'ChefHat' },
          { name: 'WiFi satelital', icon: 'Wifi' },
          { name: 'TV (streaming)', icon: 'Tv' },
          { name: 'Galería con churrasquera', icon: 'Flame' },
          { name: 'Ropa de cama', icon: 'Bed' },
          { name: 'Estacionamiento', icon: 'Car' },
          { name: 'Agua mineral', icon: 'Droplet' },
          { name: 'Amenities de baño', icon: 'Sparkles' }
        ],
        images: [
          '/img/cabanaChardonnay/cabanaChardonnay.jpg',
          '/img/cabanaChardonnay/cabanaChardonnay_dormitorio.jpg',
          '/img/cabanaChardonnay/cabanaChardonnay_cocina.jpg',
          '/img/cabanaChardonnay/cabanaChardonnay_comedor.jpg',
          '/img/cabanaChardonnay/cabanaChardonnay_salida.jpg',
          '/img/cabanaChardonnay/cabanaChardonnay_baño.jpg'
        ],
        order: 1,
        active: true
      },
      {
        name: 'Malbec',
        slug: 'malbec',
        description: '1 dormitorio en planta alta con sommier y cama doble, balcón con vista a la montaña. 1 dormitorio en planta baja con camas individuales.',
        shortDescription: 'Cabaña espaciosa con vistas panorámicas',
        capacity: 4,
        bedrooms: 2,
        bathrooms: 1,
        price: 0,
        priceWeekend: 0,
        mainImage: '/img/cabanaMalbec/cabanaMalbec.jpg',
        amenities: [
          { name: 'Cocina equipada', icon: 'ChefHat' },
          { name: 'WiFi satelital', icon: 'Wifi' },
          { name: 'TV (streaming)', icon: 'Tv' },
          { name: 'Galería con churrasquera', icon: 'Flame' },
          { name: 'Ropa de cama', icon: 'Bed' },
          { name: 'Estacionamiento', icon: 'Car' },
          { name: 'Agua mineral', icon: 'Droplet' },
          { name: 'Amenities de baño', icon: 'Sparkles' }
        ],
        images: [
          '/img/cabanaMalbec/cabanaMalbec.jpg',
          '/img/cabanaMalbec/cabanaMalbec_dormitorio.jpg',
          '/img/cabanaMalbec/cabanaMalbec_dormitorio1.jpg',
          '/img/cabanaMalbec/cabanaMalbec_cocina.jpg',
          '/img/cabanaMalbec/cabanaMalbec_comedor.jpg',
          '/img/cabanaMalbec/cabanaMalbec_baño.jpg'
        ],
        order: 2,
        active: true
      }
    ];
    await Cabana.insertMany(cabanas);
    console.log('🏠 3 Cabañas creadas (Cabernet, Chardonnay, Malbec)');

    // Crear Actividades
    const activities = [
      { name: 'Caminatas por senderos', icon: 'Footprints', category: 'activity', difficulty: 'Fácil', order: 0 },
      { name: 'Bajada al Río Mendoza', icon: 'Waves', category: 'activity', difficulty: 'Fácil', order: 1 },
      { name: 'Rafting', icon: 'Ship', category: 'activity', difficulty: 'Moderada', order: 2 },
      { name: 'Kayak', icon: 'CircleDot', category: 'activity', difficulty: 'Moderada', order: 3 },
      { name: 'Pesca', icon: 'Fish', category: 'activity', difficulty: 'Fácil', order: 4 },
      { name: 'Cabalgatas', icon: 'Milestone', category: 'activity', difficulty: 'Fácil', order: 5 },
      { name: 'Bodegas y Enoturismo', icon: 'Wine', category: 'activity', difficulty: 'Fácil', order: 6 },
      { name: 'Gastronomía local', icon: 'UtensilsCrossed', category: 'activity', difficulty: 'Fácil', order: 7 },
      { name: 'Potrerillos', icon: 'Droplets', category: 'excursion', url: 'https://www.google.com/search?q=Potrerillos+Mendoza', order: 8 },
      { name: 'Cacheuta', icon: 'Waves', category: 'excursion', url: 'https://www.google.com/search?q=Cacheuta+Mendoza', order: 9 },
      { name: 'Uspallata', icon: 'Mountain', category: 'excursion', url: 'https://www.google.com/search?q=Uspallata+Mendoza', order: 10 },
      { name: 'Villavicencio', icon: 'Squirrel', category: 'excursion', url: 'https://www.google.com/search?q=Villavicencio+Mendoza', order: 11 },
      { name: 'Ciudad de Mendoza', icon: 'Building2', category: 'excursion', url: 'https://www.google.com/search?q=Ciudad+de+Mendoza', order: 12 },
      { name: 'Desayuno casero', icon: 'Coffee', category: 'entreNosotras', order: 13 },
      { name: 'Yoga y meditación', icon: 'PersonStanding', category: 'entreNosotras', order: 14 },
      { name: 'Senderismo', icon: 'Footprints', category: 'entreNosotras', order: 15 },
      { name: 'Talleres holísticos', icon: 'Flower2', category: 'entreNosotras', order: 16 },
      { name: 'Talleres creativos', icon: 'Palette', category: 'entreNosotras', order: 17 },
      { name: 'Retiros temáticos', icon: 'Sparkles', category: 'entreNosotras', order: 18 },
      { name: 'Pedicure y Manicure', icon: 'Sparkles', category: 'entreNosotras', order: 19 },
      { name: 'Masajes', icon: 'Hand', category: 'entreNosotras', order: 20 },
      { name: 'Depilación', icon: 'Scissors', category: 'entreNosotras', order: 21 }
    ];
    await Activity.insertMany(activities);
    console.log('🎯 22 Actividades creadas');

    // Crear Reseñas
    const reviews = [
      {
        name: 'María González',
        avatar: 'MG',
        stars: 5,
        text: 'Excelente lugar para desconectar y disfrutar de la naturaleza. Las cabañas son muy cómodas y la vista es espectacular. El río está a pocos pasos y la atención es impecable. Muy recomendable para familias.',
        date: 'Hace 2 semanas',
        order: 0
      },
      {
        name: 'Juan Rodríguez',
        avatar: 'JR',
        stars: 5,
        text: 'Hermoso lugar, ideal para pasar unos días en familia. Las cabañas tienen todo lo necesario, muy limpias y bien equipadas. El entorno natural es increíble. Sin duda volveremos.',
        date: 'Hace 1 mes',
        order: 1
      },
      {
        name: 'Laura Sánchez',
        avatar: 'LS',
        stars: 5,
        text: 'Lugar perfecto para desconectar. Las vistas son maravillosas, el río es precioso y las montañas te dejan sin palabras. Las cabañas son acogedoras y la paz que se respira es única. Totalmente recomendable.',
        date: 'Hace 3 semanas',
        order: 2
      },
      {
        name: 'Carlos Fernández',
        avatar: 'CF',
        stars: 5,
        text: 'Una experiencia inolvidable. El contacto con la naturaleza es total. Las instalaciones son excelentes y el trato muy cálido. Ideal para escaparse del ruido de la ciudad.',
        date: 'Hace 1 semana',
        order: 3
      },
      {
        name: 'Ana María López',
        avatar: 'AL',
        stars: 5,
        text: 'Simplemente maravilloso. La ubicación es privilegiada, rodeado de montañas y con el río a metros. Las cabañas son hermosas y súper equipadas. Un lugar para volver una y otra vez.',
        date: 'Hace 2 meses',
        order: 4
      },
      {
        name: 'Roberto Silva',
        avatar: 'RS',
        stars: 5,
        text: 'Perfecto para desconectar y reconectar con la naturaleza. La tranquilidad del lugar es incomparable. Las cabañas tienen todo lo necesario y más. La atención de los dueños es excelente.',
        date: 'Hace 3 semanas',
        order: 5
      }
    ];
    await Review.insertMany(reviews);
    console.log('⭐ 6 Reseñas creadas');

    // Crear items de galería
    const galleryItems = [
      // Cabañas Cabernet (14 imágenes)
      ...['cabanaCarbernet.jpg', 'cabanaCarbernet1.png', 'cabanaCarbernet_baño.jpg',
        'cabanaCarbernet_baño1.jpg', 'cabanaCarbernet_baño2.jpg', 'cabanaCarbernet_baño3.jpg',
        'cabanaCarbernet_cocina.jpg', 'cabanaCarbernet_cocina1.jpg', 'cabanaCarbernet_comedor.png',
        'cabanaCarbernet_dormitorio.jpg', 'cabanaCarbernet_dormitorio1.jpg', 'cabanaCarbernet_dormitorio2.jpg',
        'cabanaCarbernet_salida.jpg', 'cabanaCarbernet_salida1.jpg'
      ].map((file, index) => ({
        type: 'image',
        src: `/img/cabanaCabernnet/${file}`,
        category: 'cabañas',
        active: true,
        order: index
      })),
      
      // Cabañas Chardonnay (15 imágenes)
      ...['cabanaChardonnay.jpg', 'cabanaChardonnay_baño.jpg', 'cabanaChardonnay_baño1.jpg',
        'cabanaChardonnay_baño2.jpg', 'cabanaChardonnay_cocina.jpg', 'cabanaChardonnay_comedor.jpg',
        'cabanaChardonnay_comedor1.jpg', 'cabanaChardonnay_dormitorio.jpg', 'cabanaChardonnay_dormitorio2.png',
        'cabanaChardonnay_salida.jpg', 'cabanaChardonnay_salida2.jpg', 'cabanaChardonnay_salida3.jpg',
        'cabanaChardonnay_salida4.jpg', 'cabanaChardonnay_salida5.jpg', 'cabanaChardonnay_salida6.jpg'
      ].map((file, index) => ({
        type: 'image',
        src: `/img/cabanaChardonnay/${file}`,
        category: 'cabañas',
        active: true,
        order: index + 14
      })),

      // Montaña y Río (38 imágenes)
      ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39]
        .map((num, index) => ({
          type: 'image',
          src: `/img/montanaYrio/${num}.jpg`,
          category: 'naturaleza',
          active: true,
          order: index + 29
        })),

      // Videos de cabañas (7 videos)
      ...['v1.mov', 'v2.mov', 'v3.mov', 'v4.mov', 'v5.mp4', 'v6.mp4', 'v7.mp4'].map((video, index) => ({
        type: 'video',
        src: `/videos/cabañas/${video}`,
        category: 'cabañas',
        active: true,
        order: index + 67
      })),

      // Videos de parquizado (1 video)
      { type: 'video', src: '/videos/parquizado/v5.mp4', category: 'naturaleza', active: true, order: 74 },

      // Videos de piscina (1 video)
      { type: 'video', src: '/videos/piscina/v4.mp4', category: 'naturaleza', active: true, order: 75 }
    ];

    await GalleryItem.insertMany(galleryItems);
    console.log('🖼️  76 Items de galería creados (67 imágenes + 9 videos)');

    // Crear configuración
    await Config.create({
      siteName: 'Blancos Sueños de Escalada',
      siteDescription: 'Cabañas en Las Compuertas, Luján de Cuyo, Mendoza. Tu refugio en la montaña.',
      contactEmail: 'info@blancosuenos.com',
      contactPhone: '+54 261 123-4567',
      whatsappNumber: '5492613001298',
      address: 'Las Compuertas, Luján de Cuyo, Mendoza, Argentina',
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    });
    console.log('⚙️  Configuración creada');

    console.log('\n✅ Base de datos inicializada correctamente');
    console.log('📝 Credenciales de acceso:');
    console.log('   Email: admin@blancosuenos.com');
    console.log('   Password: admin123');
    console.log('\n🚀 Puedes iniciar el servidor con: npm run dev');
    console.log('💻 Accede al panel admin en: http://localhost:5174\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();
