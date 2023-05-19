import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import config from '../../config/config';

const publicClient = axios.create({
  baseURL: config.base_URL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

publicClient.interceptors.request.use(
  async (config: any) => {
    if (!navigator.onLine) {
      return Promise.reject(new Error('Không có kết nối internet.'));
    }

    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
  (error) => {
    throw error;
  }
);

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err: AxiosError) => {
    const { response } = err;

    if (response) {
      throw response.data;
    } else {
      throw new Error(
        'Không thể kết nối đến server. Vui lòng kiểm tra internet và thử lại!'
      );
    }
  }
);

export default publicClient;
