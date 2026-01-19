export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface HeroSlide {
  imageUrl: string;
  order: number;
  active: boolean;
}

export interface Hero {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  slides: HeroSlide[];
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface Cabana {
  _id?: string;
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
  priceWeekend?: number;
  active: boolean;
  order: number;
}

export interface Activity {
  _id?: string;
  name: string;
  icon: string;
  category: 'activity' | 'excursion' | 'entreNosotras';
  description?: string;
  url?: string;
  active: boolean;
  order: number;
}

export interface Review {
  _id?: string;
  name: string;
  avatar: string;
  stars: number;
  text: string;
  date: string;
  active: boolean;
  order: number;
}

export interface GalleryItem {
  _id?: string;
  type: 'image' | 'video';
  src: string;
  category: 'todas' | 'cabañas' | 'naturaleza';
  title?: string;
  description?: string;
  active: boolean;
  order: number;
}

export interface Config {
  _id?: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email?: string;
  phone?: string;
  address?: string;
  googleMapsUrl?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}
