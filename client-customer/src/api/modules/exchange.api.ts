import { IListExchange } from '../../types/api.types';
import privateClient from '../clients/private.client';

interface ICreateExchange {
  property_id: string;
}

const exchangeEndpoints = {
  create: () => `exchange/create`,

  list: (payload: IListExchange) => {
    const { party, ...query } = payload;
    const arr = Object.entries(query);

    let url = '';

    arr.forEach((item) => {
      if (item[1]) {
        url += `&${item[0]}=${item[1]}`;
      }
    });

    return `exchange/list/${party}?${url}`;
  },

  accept: (exchangeId: string) => `exchange/accept/${exchangeId}`,

  cancel: (exchangeId: string) => `exchange/cancel/${exchangeId}`,

  detail: (exchangeId: string) => `exchange/detail/${exchangeId}`,
};

const exchangeApi = {
  createExchange: async (payload: ICreateExchange) => {
    try {
      const response = await privateClient.post(
        exchangeEndpoints.create(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getListExchanges: async (payload: IListExchange) => {
    try {
      const response = await privateClient.get(exchangeEndpoints.list(payload));

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  acceptExchange: async (exchangeId: string, formData: FormData) => {
    try {
      const response = await privateClient.put(
        exchangeEndpoints.accept(exchangeId),
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

  cancelExchange: async (exchangeId: string, reason_cancel: string) => {
    try {
      const response = await privateClient.put(
        exchangeEndpoints.cancel(exchangeId),
        { reason_cancel }
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  getDetailExchange: async (exchangeId: string) => {
    try {
      const response = await privateClient.get(
        exchangeEndpoints.detail(exchangeId)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default exchangeApi;
