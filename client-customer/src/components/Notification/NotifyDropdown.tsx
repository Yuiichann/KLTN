import Tippy from '@tippyjs/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import notificationApi from '../../api/modules/notification.api';
import { INotification } from '../../types/notification.types';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';

interface Props {
  handleReload: VoidFunction;
}

const NotifyDropdown = ({ handleReload }: Props) => {
  const [notifications, setNotifications] = useState<INotification[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleMarkAsRead = useCallback(
    async (id: string, index: number) => {
      const { response, error } = await notificationApi.markAsRead(id);

      if (error && error.message) {
        toast.error(error.message);
        return;
      }

      // success
      if (response) {
        setNotifications((prev) => {
          if (!prev) return;
          let newArr = [...prev];

          newArr.splice(index, 1);

          return newArr;
        });

        handleReload();
      }
    },
    [handleReload]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await notificationApi.getNotifications({
        type: 'unseen',
      });

      if (response && response.data) {
        setNotifications(response.data);
        setError(undefined);
      }

      if (error && error.message) {
        setError(error.message);
        setNotifications(undefined);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <div className="absolute z-10 right-0 top-full bg-white rounded-md shadow-2xl w-[32rem] overflow-hidden animate-show">
      <h3 className="text-18 py-2 text-center font-medium border-b">
        Thông báo
      </h3>

      {isLoading ? (
        <p className="text-center py-2">Đang xử lý...</p>
      ) : error ? (
        <p className="text-center py-8">{error}</p>
      ) : notifications && notifications.length > 0 ? (
        <div className="max-h-[400px] overflow-auto scrollbar-w-1 scrollbar-thumb-rounded-md scrollbar-thumb-text-tertiary">
          {notifications.map((notify, index) => (
            <div
              key={notify.id}
              className="flex gap-2 items-center font-normal p-3 cursor-pointer effect hover:bg-overlay border-b text-14"
            >
              <Tippy content={notify.title} animation="fade">
                <Link
                  to="/trang-ca-nhan/thong-bao"
                  className="line-clamp-2 flex-1"
                >
                  {notify.title}
                </Link>
              </Tippy>
              <span className="min-w-fit">
                {formatTimeUTC7(notify.createdAt)}
              </span>

              <Tippy content="Đánh dấu đã đọc" animation="fade">
                <div
                  className="p-2 rounded-full hover:bg-secondary"
                  onClick={() => handleMarkAsRead(notify.id, index)}
                >
                  <FcCheckmark className="text-xl" />
                </div>
              </Tippy>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8">Hiện tại không có thông báo.</p>
      )}

      <Link
        to="/trang-ca-nhan/thong-bao"
        className="block text-center w-full py-2 border-t text-red-500 hover:bg-overlay effect"
      >
        Xem tất cả
      </Link>
    </div>
  );
};

export default memo(NotifyDropdown);
