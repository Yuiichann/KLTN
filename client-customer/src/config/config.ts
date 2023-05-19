const base_URL =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000/api';

const app_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const config = {
  base_URL,
  app_URL,
};

export default config;
