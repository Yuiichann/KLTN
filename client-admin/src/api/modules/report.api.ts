import privateClient from '../clients/private.client';

interface IReplyReport {
  status: 'confirmed' | 'refuse';
  reply_message: string;
}

interface IGetListReport {
  page?: number;
  status?: string;
}

const reportEndpoints = {
  getList: (page?: number, status?: string) =>
    `report/list?${page ? `page=${page}` : ''}${
      status ? `&status=${status}` : ''
    }`,

  replyReport: (reportId: string) => `report/reply-report/${reportId}`,
};

const reportApi = {
  getList: async (payload: IGetListReport) => {
    try {
      const response = await privateClient.get(
        reportEndpoints.getList(payload.page, payload.status)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  replyReport: async (reportId: string, payload: IReplyReport) => {
    try {
      const response = await privateClient.put(
        reportEndpoints.replyReport(reportId),
        payload
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default reportApi;
