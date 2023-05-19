import React from 'react';
import { IUser } from '../../types/user.types';
import UserListItem from './UserListItem';

interface Props {
  users: IUser[];
}

const UserList = ({ users }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {users.map((user, index) => (
        <UserListItem user={user} key={index} />
      ))}
    </div>
  );
};

export default UserList;
