import { IBrokerListParams } from '../../types/api.types';
import { ICreateBroker } from '../../types/broker.types';
import privateClient from '../clients/private.client';
import publicClient from '../clients/public.client';

const brokerEndpoints = {
  create: () => `broker/create`,

  update: () => `broker/update`,

  list: (params: IBrokerListParams) => {
    const newParams = Object.entries(params);

    // tạo url từ params
    const url = newParams.reduce((curr, str) => {
      // nếu param có dữ liệu
      if (str[1]) {
        curr += `&${str[0]}=${str[1] ? str[1] : ''}`;
      }

      return curr;
    }, '');

    return `broker/list?${url}`;
  },

  top: () => `broker/top`,

  detail: (brokerId: string) => `broker/detail/${brokerId}`,

  detailByUser: () => `broker/detail-by-user`,

  delete: () => `broker/delete`,
};

const brokerApi = {
  getList: async (params: IBrokerListParams) => {
    try {
      const response = await publicClient.get(brokerEndpoints.list(params));

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getTopBrokers: async () => {
    try {
      const response = await publicClient.get(brokerEndpoints.top());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetail: async (brokerId: string) => {
    try {
      const response = await publicClient.get(brokerEndpoints.detail(brokerId));

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetailByUser: async () => {
    try {
      const response = await privateClient.get(brokerEndpoints.detailByUser());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  create: async (payload: ICreateBroker) => {
    try {
      const response = await privateClient.post(
        brokerEndpoints.create(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  update: async (payload: ICreateBroker) => {
    try {
      const response = await privateClient.put(
        brokerEndpoints.update(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  delete: async () => {
    try {
      const response = await privateClient.delete(brokerEndpoints.delete());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default brokerApi;
