import { useEffect, useState } from 'react';
import notificationApi from '../../api/modules/notification.api';
import NotifiList from '../../components/Account/NotifiList';
import Loading from '../../components/Loading';
import { INotification } from '../../types/notification.types';

const AccountNotification = () => {
  const [notifications, setNotifications] = useState<INotification[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await notificationApi.getNotifications({
        type: 'all',
      });

      if (error) {
        setError(error.message);
        setNotifications(undefined);
      }

      if (response) {
        setError(undefined);
        setNotifications(response.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [reload]);
  return (
    <div className="pb-8 border-b-2">
      <h3 className="uppercase font-roboto mb-2 pl-3 py-2 text-white font-medium text-14 bg-account-page-main">
        Thông báo
      </h3>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-14 text-center py-12 text-text-secondary">{error}</p>
      ) : notifications && notifications.length > 0 ? (
        <NotifiList notifications={notifications} handleReload={handleReload} />
      ) : (
        <p className="text-14 text-center py-12 text-text-secondary">
          Danh sách thông báo rỗng
        </p>
      )}
    </div>
  );
};

export default AccountNotification;
