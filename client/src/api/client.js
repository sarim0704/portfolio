import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sarim_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const endpoints = {
  profile: '/profile',
  projects: '/projects',
  skills: '/skills',
  experience: '/experience',
  testimonials: '/testimonials',
  contact: '/contact',
  login: '/auth/login'
};
