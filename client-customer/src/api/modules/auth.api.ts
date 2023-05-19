import { ISignInData, ISignUpData } from '../../types/api.types';
import privateClient from '../clients/private.client';
import publicClient from '../clients/public.client';

const authEndpoints = {
  signUp: () => {
    return 'auth/signup';
  },

  signUpWithGoogle: () => `auth/signup/google`,

  signIn: () => {
    return 'auth/signin';
  },
  refreshToken: () => {
    return 'auth/refresh-token';
  },
  signOut: () => {
    return 'auth/signout';
  },
};

const authApi = {
  signUp: async (formData: ISignUpData) => {
    try {
      const response = await publicClient.post(
        authEndpoints.signUp(),
        formData
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  signUpWithGoogle: async (accessToken: string) => {
    try {
      const response = await publicClient.post(
        authEndpoints.signUpWithGoogle(),
        { accessToken }
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

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
