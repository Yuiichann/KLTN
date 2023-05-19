import {
  INhaDatListParams,
  INhadatListOfUserParams,
} from '../../types/api.types';
import privateClient from '../clients/private.client';
import publicClient from '../clients/public.client';

const nhaDatEndpoints = {
  // list bản tin đã được duyệt - PUBLIC
  list: (props: INhaDatListParams) => {
    let { demand, ...params } = props;

    const newParams = Object.entries(params);

    // tạo url từ params
    const url = newParams.reduce((curr, str) => {
      // nếu param có dữ liệu
      if (str[1]) {
        curr += `&${str[0]}=${str[1] ? str[1] : ''}`;
      }

      return curr;
    }, '');

    return `nha-dat/list/${demand}?${url}`;
  },

  // tạo mới
  create: () => {
    return '/nha-dat/create';
  },

  // update
  update: (postId: string) => `/nha-dat/update/${postId}`,

  // xóa
  delete: (postId: string) => `/nha-dat/delete/${postId}`,

  // danh sách tin mà user đăng
  listOfUser: (params: INhadatListOfUserParams) => {
    // tạo url từ params
    const newParams = Object.entries(params);
    const url = newParams.reduce((curr, str) => {
      // nếu param có dữ liệu
      if (str[1]) {
        curr += `&${str[0]}=${str[1] ? str[1] : ''}`;
      }

      return curr;
    }, '');

    return `nha-dat/user/list?${url}`;
  },

  // lấy tin của chính user đã đăng
  detailOfUser: (slug: string) => `/nha-dat/user/detail/${slug}`,

  // lấy thông tin public của bản tin
  detail: (slug: string) => `nha-dat/detail/${slug}`,
};

const nhaDatApi = {
  getListByDemand: async (params: INhaDatListParams) => {
    try {
      const response = await publicClient.get(nhaDatEndpoints.list(params));
      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  createNew: async (formData: FormData) => {
    try {
      const response = await privateClient.post(
        nhaDatEndpoints.create(),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  updateOne: async (postId: string, formData: FormData) => {
    try {
      const response = await privateClient.put(
        nhaDatEndpoints.update(postId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  deleteOne: async (postId: string) => {
    try {
      const response = await privateClient.delete(
        nhaDatEndpoints.delete(postId)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getListOfUser: async (params: INhadatListOfUserParams) => {
    try {
      const response = await privateClient.get(
        nhaDatEndpoints.listOfUser(params)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetailOfUser: async (slug: string) => {
    try {
      const response = await privateClient.get(
        nhaDatEndpoints.detailOfUser(slug)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetail: async (slug: string) => {
    try {
      const response = await publicClient.get(nhaDatEndpoints.detail(slug));

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default nhaDatApi;
