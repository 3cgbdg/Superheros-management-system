import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

    if (error.config?.method !== 'get') {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);
