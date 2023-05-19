import React from 'react';
import { INotification } from '../../types/notification.types';
import NotifiListItem from './NotifiListItem';

interface Props {
  notifications: INotification[];
  handleReload: VoidFunction;
}

const NotifiList = ({ notifications, handleReload }: Props) => {
  return (
    <div>
      {notifications.map((notification, index) => (
        <NotifiListItem
          key={index}
          notification={notification}
          handleReload={handleReload}
        />
      ))}
    </div>
  );
};

export default React.memo(NotifiList);
