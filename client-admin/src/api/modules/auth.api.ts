import { ISignInData } from '../../types/api.types';
import privateClient from '../clients/private.client';
import publicClient from '../clients/public.client';

const authEndpoints = {
  signIn: () => {
    return 'auth/admin/signin';
  },
  refreshToken: () => {
    return 'auth/admin/refresh-token';
  },
  signOut: () => {
    return 'auth/admin/signout';
  },
};

const authApi = {
  signIn: async (formData: ISignInData) => {
    try {
      const response = await publicClient.post(
        authEndpoints.signIn(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  refreshToken: async () => {
    try {
      const response = await privateClient.post(authEndpoints.refreshToken());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  signOut: async () => {
    try {
      const response = await privateClient.delete(authEndpoints.signOut());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default authApi;
