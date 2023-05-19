import axios from 'axios';
import queryString from 'query-string';
import config from '../../config/config';
import authApi from '../modules/auth.api';

const privateClient = axios.create({
  baseURL: config.base_URL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

privateClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('actkn')}`,
      // 'Content-Type': 'application/json',
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (err) => {
    if (!err.response) {
      throw new Error(
        'Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối internet!'
      );
    }
    // kiểm tra phải lỗi token hết hạng không?
    if (
      err.response.status === 401 &&
      err.response.data.message === 'TokenExpiredError'
    ) {
      // lấy lại config của request cũ bị lỗi 401
      const originalRequest = err.config;

      const { response, error } = await authApi.refreshToken();

      // throw lỗi của refreshToken
      // nếu có lỗi thì chắc chắn là user sẽ logout!
      if (error) {
        throw error;
      }

      if (response && response.data) {
        localStorage.setItem('actkn', response.data.accessToken);

        // set lại header của request cũ
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        // gửi lại request
        return privateClient(originalRequest);
      }
    } else {
      throw err.response.data;
    }
  }
);

export default privateClient;
