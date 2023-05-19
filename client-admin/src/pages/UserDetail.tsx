import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import userApi from '../api/modules/user.api';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NoneAvatar from '../components/NoneAvatar';
import PostList from '../components/UserDetail/PostList';
import { IUserDetailResponse } from '../types/user.types';

const UserDetail = () => {
  const { userId } = useParams();

  const [response, setResponse] = useState<IUserDetailResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [reload, setReload] = useState(false);

  const handleReload = useCallback(() => {
    setReload((prev) => !prev);
  }, []);

  // xử lý khóa
  const handleLockUser = useCallback((id: string) => {
    Swal.fire({
      title: 'Xác nhận',
      icon: 'question',
      text: `Bạn có chắc khóa tài khoản đang chọn?`,
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      preConfirm: (value: string) => {
        if (value.length === 0) {
          Swal.showValidationMessage('Bạn phải nhập lý do khóa');
        }

        return value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        userApi
          .lockUser(id, { reason: result.value as string })
          .then((res) => {
            alert('Khóa User thành công!');
            handleReload();
          })
          .catch((err) => {
            alert(`Có lỗi: ${err.message}`);
          });
      }
    });
  }, []);

  // mở khóa
  const handleUnlockUser = useCallback((id: string) => {
    Swal.fire({
      title: 'Xác nhận',
      icon: 'question',
      text: 'Xác nhận mở khóa tài khoản?',
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        userApi
          .unLockUser(id)
          .then(() => {
            alert('Mở khóa user thành công!');
            handleReload();
          })
          .catch((err) => {
            alert(`Có lỗi: ${err.message}`);
          });
      }
    });
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const { response, error } = await userApi.getDetail(userId);

      if (error) {
        setError(error.message);
        setResponse(undefined);
      }

      if (response) {
        setResponse(response.data);
        setError(undefined);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [userId, reload]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        response && (
          <>
            <h1 className="text-xl font-semibold">Chi tiết người dùng</h1>

            <div className="flex items-start gap-12 mt-4 pl-4">
              {/* Info */}
              <div>
                <div className="mt-2 flex items-center gap-2">
                  <b className="min-w-[120px]">Tên tài khoản:</b>
                  <p>{response.user.username}</p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Tên hiển thị:</b>
                  <p>{response.user.displayName}</p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Email:</b>
                  <p>{response.user.email}</p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Số điện thoại:</b>
                  <p>{response.user.phone_number}</p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Địa chỉ:</b>
                  <p>{response.user.address}</p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Giới tinh:</b>
                  <p>{response.user.gender === 'male' ? 'Nam' : 'Nữ'}</p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Môi giới BĐS:</b>
                  <p>{response.user.isBroker ? 'YES' : 'NO'}</p>
                </div>

                {/* Trạng thái */}
                <div className="mt-1 flex items-center gap-2">
                  <b className="min-w-[120px]">Trạng thái:</b>
                  {response.user.locked.status ? (
                    <p className="text-red-500">
                      Bị khóa (
                      <span className="text-black pl-1">
                        bởi {response.user.locked.lock_by?.displayName}
                      </span>{' '}
                      )
                    </p>
                  ) : (
                    <p className="text-green-600">Đang hoạt động</p>
                  )}
                </div>

                {/* button */}
                <div className="my-4 pl-2">
                  {response.user.locked.status ? (
                    <button
                      onClick={() => handleUnlockUser(response.user.id)}
                      className="px-4 py-2 text-14 rounded-md shadow-md border bg-green-500 text-white hover:bg-opacity-80"
                    >
                      Mở khóa tài khoản
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLockUser(response.user.id)}
                      className="px-4 py-2 text-14 rounded-md shadow-md border bg-red-500 text-white hover:bg-opacity-80"
                    >
                      Khóa tài khoản
                    </button>
                  )}
                </div>
              </div>

              {/* avatar */}
              <div>
                {response.user.avatar ? (
                  <img
                    src={response.user.avatar}
                    className="w-32 h-32 rounded-full shadow-md"
                    alt="user"
                  />
                ) : (
                  <NoneAvatar character={response.user.avatar} />
                )}
              </div>
            </div>

            {/* property */}
            {response.properties.map((item, index) => (
              <div key={index} className="my-4">
                <h1 className="text-2xl my-3 font-semibold">
                  Danh Sách {item.label}
                </h1>

                <PostList
                  posts={item.items}
                  key={index}
                  demand={item.id as any}
                />
              </div>
            ))}
          </>
        )
      )}
    </div>
  );
};

export default UserDetail;
