import axios from 'axios';
import ENV from '../env';

const apiService = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);

apiService.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default apiService;