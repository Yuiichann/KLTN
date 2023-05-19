import { IFormReportProperty } from '../../types/api.types';
import publicClient from '../clients/public.client';

const reportEndpoints = {
  create: () => `/report/create`,
};

const reportApi = {
  createReport: async (payload: IFormReportProperty) => {
    try {
      const response = await publicClient.post(
        reportEndpoints.create(),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default reportApi;
