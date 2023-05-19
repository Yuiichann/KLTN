import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import config from '../../configs/config';

const publicClient = axios.create({
  baseURL: config.api_backend_url,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

publicClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err: AxiosError) => {
    if (!err.response) {
      throw new Error(
        'Không thể kết nối đến server. Vui lòng kiểm tra lại internet và thử lại.'
      );
    }

    throw err.response?.data;
  }
);

export default publicClient;
