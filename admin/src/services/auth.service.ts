import { apiService } from './api';
import { LoginCredentials, AuthResponse, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await apiService.post<AuthResponse>('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  async getMe(): Promise<User> {
    return apiService.get<User>('/auth/me');
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
