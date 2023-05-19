import { IPayloadUpdateStatus, IPropertiesParams } from '../../types/api.types';
import privateClient from '../clients/private.client';

const nhaDatEndpoints = {
  getByDemand: (params: IPropertiesParams) => {
    const { demand, ...newParams } = params;

    const url = Object.entries(newParams).reduce((curr, str) => {
      if (str[1]) {
        curr += `&${str[0]}=${str[1] ? str[1] : ''}`;
      }

      return curr;
    }, '');

    return `/nha-dat/admin/list/${demand}?${url}`;
  },

  getDetail: (slug: string) => `nha-dat/admin/detail/${slug}`,

  updateStatus: (nhaDatId: string) => `nha-dat/update-status/${nhaDatId}`,
};

const nhaDatApi = {
  getPropertyByDemand: async (params: IPropertiesParams) => {
    try {
      const response = await privateClient.get(
        nhaDatEndpoints.getByDemand(params)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getPropertyDetail: async (slug: string) => {
    try {
      const response = await privateClient.get(nhaDatEndpoints.getDetail(slug));

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  updateStatus: async (postId: string, payload: IPayloadUpdateStatus) => {
    try {
      const response = await privateClient.put(
        nhaDatEndpoints.updateStatus(postId),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default nhaDatApi;
