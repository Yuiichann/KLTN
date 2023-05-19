import Tippy from '@tippyjs/react';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import notificationApi from '../../api/modules/notification.api';
import { INotification } from '../../types/notification.types';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';

interface Props {
  notification: INotification;
  handleReload: VoidFunction;
}

const NotifiListItem = ({ notification, handleReload }: Props) => {
  // danh dau la da doc
  const handleMarkAsRead = async () => {
    const { response, error } = await notificationApi.markAsRead(
      notification.id
    );

    if (error) {
      toast.error(error.message);
    }

    if (response) {
      handleReload();
    }
  };

  // delete thong bao
  const handleDeleteNotifi = async () => {
    const { response, error } = await notificationApi.delete(notification.id);

    if (error) {
      toast.error(error.message);
    }

    if (response) {
      handleReload();
    }
  };

  // show đầy đủ thông tin

  const handleShowDetailNotify = () => {
    handleMarkAsRead();
    Swal.fire({
      title: 'Thông báo',
      icon: 'info',
      showCloseButton: true,
      html: notification.content,
      customClass: {
        htmlContainer: 'text-14 leading-6',
      },
    });
  };

  return (
    <div
      className={`flex items-center text-14 justify-between gap-2 px-4 py-2 border-b-2 ${
        notification.seen ? '' : 'bg-gray-200 border-white'
      }`}
    >
      <p className="cursor-pointer" onClick={handleShowDetailNotify}>
        {notification.title}
      </p>
      <div className="flex items-center gap-3">
        <p>{formatTimeUTC7(notification.createdAt)}</p>
        {notification.seen ? (
          <Tippy content="Xóa thông báo">
            <button onClick={handleDeleteNotifi}>
              <AiOutlineClose className="text-xl text-red-500" />
            </button>
          </Tippy>
        ) : (
          <Tippy content="Đánh dấu đã đọc">
            <button onClick={handleMarkAsRead}>
              <HiCheck className="text-xl text-green-600" />
            </button>
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default React.memo(NotifiListItem);
