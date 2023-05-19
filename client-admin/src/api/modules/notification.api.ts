import privateClient from '../clients/private.client';

interface IGetNotification {
  seen?: boolean;
  returnTotalUnSeen?: boolean;
}

const notificationEndpoints = {
  getNotification: (seen?: boolean, returnTotalUnSeen?: boolean) =>
    `notification/list?${seen ? 'seen=true' : ''}${
      returnTotalUnSeen ? '&returnTotalUnSeen=true' : ''
    }`,

  markAsRead: (notifiId: string) => `notification/mark-read/${notifiId}`,
};

const notificationApi = {
  getNotifications: async (payload: IGetNotification) => {
    try {
      const response = await privateClient.get(
        notificationEndpoints.getNotification(
          payload.seen,
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
};

export default notificationApi;
