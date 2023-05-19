import privateClient from '../clients/private.client';

const statisticEndpoints = {
  dashboard: () => 'statistic/dashboard',
};

const statisticApi = {
  getDashBoard: async () => {
    try {
      const response = await privateClient.get(statisticEndpoints.dashboard());

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default statisticApi;
