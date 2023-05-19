import Tippy from '@tippyjs/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import notificationApi from '../../api/modules/notification.api';
import socket from '../../config/socket.config';
import { RootState } from '../../redux/store';
import NotifyDropdown from './NotifyDropdown';

const ButtonNotify = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [isNotifyDropdownOpen, setIsNotifyDropdownOpen] = useState(false);
  const notifyRef = useRef<HTMLDivElement | null>(null);

  // Số lượng thông báo chưa xem
  const [totalUnseen, setTotalUnseen] = useState<number>(0);

  const handleToggleDropdown = () => {
    setIsNotifyDropdownOpen(!isNotifyDropdownOpen);
  };

  // reload lại số lượng tin unseen
  const handleReload = useCallback(() => {
    setTotalUnseen((prev) => {
      if (prev > 0) {
        return prev - 1;
      }

      return prev;
    });
  }, []);

  // click outside to close
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target as any)) {
        setIsNotifyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);

  // fetchdata and socket realtime
  useEffect(() => {
    const fetchData = async () => {
      const { response } = await notificationApi.getNotifications({
        returnTotalUnSeen: true,
      });

      if (response && response.data) {
        setTotalUnseen(response.data.unseen);
      }
    };

    fetchData();
  }, []);

  // socketRealtime
  useEffect(() => {
    if (!user?.id) return;

    // Socket to realtime notification
    socket.on(`notify-${user.id}`, (number) => {
      setTotalUnseen((prev) => prev + parseInt(number));

      if (parseInt(number) > 0) {
        toast.info('Bạn có thông báo mới');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <div ref={notifyRef}>
      <Tippy content="Thông báo" animation="fade">
        <button
          className={`relative btn text-2xl ${
            isNotifyDropdownOpen ? 'bg-secondary' : ''
          }`}
          onClick={handleToggleDropdown}
        >
          <AiOutlineBell />

          {/* số lượng thông báo chưa xem */}
          {totalUnseen > 0 ? (
            <div className="absolute top-1 right-[2px] w-5 h-5 rounded-full bg-red-500 text-white text-12 flex items-center justify-center">
              <span>{totalUnseen}</span>
            </div>
          ) : null}
        </button>
      </Tippy>

      {isNotifyDropdownOpen && <NotifyDropdown handleReload={handleReload} />}
    </div>
  );
};

export default memo(ButtonNotify);
