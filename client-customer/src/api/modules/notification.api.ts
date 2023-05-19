import privateClient from '../clients/private.client';

interface IGetNotification {
  type?: 'all' | 'seen' | 'unseen';
  returnTotalUnSeen?: boolean;
}

const notificationEndpoints = {
  getNotification: (
    type?: 'all' | 'seen' | 'unseen',
    returnTotalUnSeen?: boolean
  ) =>
    `notification/list?${type ? `type=${type}` : ''}${
      returnTotalUnSeen ? '&returnTotalUnSeen=true' : ''
    }`,

  markAsRead: (notifiId: string) => `notification/mark-read/${notifiId}`,
  delete: (notifiId: string) => `notification/delete/${notifiId}`,
};

const notificationApi = {
  getNotifications: async (payload: IGetNotification) => {
    try {
      const response = await privateClient.get(
        notificationEndpoints.getNotification(
          payload.type,
          payload.returnTotalUnSeen
        )
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  markAsRead: async (notifyId: string) => {
    try {
      const response = await privateClient.put(
        notificationEndpoints.markAsRead(notifyId)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },

  delete: async (notifyId: string) => {
    try {
      const response = await privateClient.delete(
        notificationEndpoints.delete(notifyId)
      );

      return { response };
    } catch (error: any) {
      return { error };
    }
  },
};

export default notificationApi;
