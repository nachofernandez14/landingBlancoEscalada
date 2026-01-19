import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para manejar errores
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Exponer instancia de axios para uso directo
  get api() {
    return this.axiosInstance;
  }

  // Métodos genéricos
  async get<T>(url: string) {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any) {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any) {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string) {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

const apiServiceInstance = new ApiService();

// Exportar tanto el servicio como la instancia de axios
export const apiService = apiServiceInstance;
export const api = apiServiceInstance.api;
