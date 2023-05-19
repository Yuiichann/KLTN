import {
  IFormChangePassword,
  IFormResetPassword,
  IFormUpdateAccountInfo,
} from '../../types/api.types';
import privateClient from '../clients/private.client';
import publicClient from '../clients/public.client';

const userEndpoints = {
  privateInfo: () => {
    return 'user/info';
  },

  publicInfo: (userId: string, property?: 'true' | 'false') =>
    `user/pb/${userId}${property === 'true' ? '?property=true' : ''}`,

  updateInfo: () => 'user/update-info',
  updateAvatar: () => 'user/set-avatar',

  changePassword: () => `user/update-password`,
  forgetPassword: () => `user/forget-password`,
  resetPassword: () => 'user/reset-password',
};

const userApi = {
  getPublicInfo: async (userId: string, property?: boolean) => {
    try {
      const response = await publicClient.get(
        userEndpoints.publicInfo(userId, property ? 'true' : 'false')
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getPrivateInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.privateInfo());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  updateAccountInfo: async (payload: IFormUpdateAccountInfo) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updateInfo(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  updateAvatar: async (formData: FormData) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updateAvatar(),
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

  changePassword: async (payload: IFormChangePassword) => {
    try {
      const response = await privateClient.put(
        userEndpoints.changePassword(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  forgetPassword: async (payload: { username: string }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.forgetPassword(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  resetPassword: async (payload: IFormResetPassword) => {
    try {
      const response = await publicClient.post(
        userEndpoints.resetPassword(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default userApi;
