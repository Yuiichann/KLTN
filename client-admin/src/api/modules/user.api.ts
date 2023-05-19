import { IRequestLockUser } from '../../types/api.types';
import privateClient from '../clients/private.client';

const userEndpoints = {
  getPrivateInfo: () => 'user/info',

  getListUsers: (page?: number, keyword?: string) =>
    `user/users?${page ? `page=${page}` : ''}${
      keyword ? `&search=${keyword}` : ''
    }`,

  getDetail: (userId: string) => `user/admin/detail/${userId}`,

  lockUser: (userId: string) => `user/lock-user/${userId}`,

  unLockUser: (userId: string) => `user/unlock-user/${userId}`,
};

const userApi = {
  getPrivateInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getPrivateInfo());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getListUsers: async ({
    page,
    keyword,
  }: {
    page?: number;
    keyword?: string;
  }) => {
    try {
      const response = await privateClient.get(
        userEndpoints.getListUsers(page, keyword)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetail: async (userId: string) => {
    try {
      const response = await privateClient.get(userEndpoints.getDetail(userId));
      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  lockUser: async (userId: string, body: IRequestLockUser) => {
    try {
      const response = await privateClient.put(
        userEndpoints.lockUser(userId),
        body
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  unLockUser: async (userId: string) => {
    try {
      const response = await privateClient.put(
        userEndpoints.unLockUser(userId)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default userApi;
