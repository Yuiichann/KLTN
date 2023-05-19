import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import userApi from '../api/modules/user.api';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import UserList from '../components/UserManage/UserList';
import { IUsersResposne } from '../types/user.types';

const UserManage = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let keyword = searchParams.get('keyword');

  const [response, setResponse] = useState<IUsersResposne>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const searchRef = useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState(1);

  const handleSetPage = useCallback((val: number) => {
    setPage(val);
  }, []);

  // sử dụng params để search
  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchRef.current) {
        navigate(
          `/quan-ly-nguoi-dung/danh-sach?keyword=${searchRef.current.value}`
        );

        searchRef.current.value = '';
        searchRef.current.blur();
      }
    },
    [navigate]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await userApi.getListUsers({
        page,
        keyword: keyword || undefined,
      });

      if (error) {
        setError(error.message);
        setResponse(undefined);
      }

      if (response) {
        setError(undefined);
        setResponse(response.data);
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, [page, keyword]);

  return (
    <div>
      <h1 className="my-3 text-2xl font-semibold">Danh sách users</h1>

      {/* Tìm kiếm user */}
      <div className="flex items-center gap-2 mb-4">
        <b>Tìm kiếm:</b>
        <input
          type="search"
          className="px-2 py-1 outline-none border border-primary w-[450px] rounded-sm"
          placeholder="Enter username hoặc tên người dùng cần tìm kiếm . . ."
          ref={searchRef}
          onKeyDown={handleSearch}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        response && (
          <>
            <UserList users={response.data} />

            <Pagination
              currentPage={page}
              pageCount={response.totalPage}
              onPageChange={handleSetPage}
            />
          </>
        )
      )}
    </div>
  );
};

export default UserManage;
