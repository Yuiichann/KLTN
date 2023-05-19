import { Link } from 'react-router-dom';
import { IUser } from '../../types/user.types';
import NoneAvatar from '../NoneAvatar';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';

interface Props {
  user: IUser;
}

const UserListItem = ({ user }: Props) => {
  return (
    <div className="flex gap-4 p-4 rounded-sm shadow-md bg-white">
      {/* avatar */}
      <div className="min-w-fit">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-10 h-10 object-cover rounded-full shadow-md"
          />
        ) : (
          <NoneAvatar character={user.displayName.charAt(0)} />
        )}
      </div>

      {/* info */}
      <div className="flex flex-col gap-1">
        <Link to={`/user/${user.id}`} className="font-medium hover:opacity-80">
          {user.displayName}
        </Link>

        {/* usrname */}
        <div className="flex items-center gap-2 text-14">
          <b>Username:</b>
          <p>{user.username}</p>
        </div>

        {/* Ngày */}
        <div className="flex items-center gap-2 text-14">
          <b>Ngày đăng ký:</b>
          <p>{formatTimeUTC7(user.createdAt)}</p>
        </div>

        {/* Trang thai */}
        <div className="flex items-center gap-2 text-14">
          <b>Trạng thái:</b>
          <p
            className={`${
              user.locked.status ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {user.locked.status ? 'Bị Khóa' : 'Đang hoạt động'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
