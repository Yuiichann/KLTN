import Tippy from '@tippyjs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoReload } from 'react-icons/io5';
import nhaDatApi from '../api/modules/nhaDat.api';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PostsList from '../components/PostManage/PostsList';
import SortSelect from '../components/SortSelect';
import DemandType from '../constants/DemandType.constants';
import { sortOptions } from '../constants/filterPost.constants';
import { INhaDatListResponse } from '../types/api.types';

const statusPost = [
  { label: 'Tất cả', value: '' },
  { label: 'Chờ duyệt', value: 'pending' },
  { label: 'Đã duyệt', value: 'approved' },
  { label: 'Không duyệt', value: 'refuse' },
];

const PostLitsManage = () => {
  const [response, setResponse] = useState<INhaDatListResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [reload, setReload] = useState(false);

  // filter state
  const [demand, setDemand] = useState(DemandType[0]);
  const [status, setStatus] = useState<typeof statusPost[0]>(statusPost[0]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(sortOptions[0]);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleReload = useCallback(() => {
    setReload((prev) => !prev);
  }, []);

  const handleSetPage = useCallback((val: number) => {
    setPage(val);
  }, []);

  // endter to search
  const handleSearch = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setIsLoading(true);
        const { response, error } = await nhaDatApi.getListOfUser({
          page,
          sort: sort ? sort.value : '',
          status: status ? (status.value as any) : '',
          demand: demand.value as any,
          search: searchRef.current ? searchRef.current.value : undefined,
        });

        if (error && error.message) {
          setError(error.message);
          setResponse(undefined);
        }

        if (response && response.data) {
          setResponse(response.data);
          setError(undefined);

          if (searchRef.current) {
            searchRef.current.value = '';
            searchRef.current.blur();
          }
        }

        setIsLoading(false);
      }
    },
    [page, sort, status, demand]
  );

  // call api
  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getListOfUser({
        page,
        sort: sort ? sort.value : '',
        status: status ? (status.value as any) : '',
        demand: demand.value as any,
      });

      if (error && error.message) {
        setError(error.message);
        setResponse(undefined);
      }

      if (response && response.data) {
        setResponse(response.data);
        setError(undefined);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [status, reload, sort, page, demand]);

  return (
    <section className="">
      <div className="container pt-12 max-w-6xl">
        <h1 className="text-2xl font-medium tracking-wide">Danh sách tin</h1>

        <div className="mt-4">
          {/* chọn demand - search */}
          <div className="flex items-center gap-1 lg:gap-12 text-14 flex-wrap">
            {/* demand */}
            <div className="flex items-center gap-4 my-2">
              <b>Nhu cầu:</b>
              {DemandType.map((item, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <input
                    type="radio"
                    name="demand"
                    id={`demand-${index}`}
                    checked={demand.value === item.value}
                    onChange={() => setDemand(item)}
                  />
                  <label htmlFor={`demand-${index}`}>{item.label}</label>
                </div>
              ))}
            </div>

            {/* search */}
            <div className="flex items-center gap-2">
              <b>Tìm kiếm:</b>
              <input
                type="text"
                ref={searchRef}
                className="px-3 py-1 outline-none border rounded-sm focus:border-red-500"
                placeholder="Nhập tên bất động sản..."
                onKeyDown={handleSearch}
              />
            </div>

            <div>
              <Tippy content="Tải lại" animation="fade">
                <button
                  onClick={handleReload}
                  className="p-2 rounded-full border border-text-tertiary hover:bg-overlay effect"
                >
                  <IoReload className="text-xl" />
                </button>
              </Tippy>
            </div>
          </div>

          {/* chọn status */}
          <ul className="flex items-center flex-wrap select-none">
            {statusPost.map((item) => (
              <li
                key={item.value}
                className={`font-medium  px-4 py-2 border-b-2 cursor-pointer effect ${
                  status.value === item.value
                    ? 'text-text-primary border-b-red-500'
                    : 'text-text-tertiary border-b-transparent hover:border-b-red-500'
                }`}
                onClick={() => setStatus(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {response && !isLoading ? (
          <div className="mt-2 flex items-center justify-between">
            <div className="text-14 text-text-secondary">
              <span>
                Bạn đang có {response?.totalItems}{' '}
                {status.value === 'pending'
                  ? 'đang chờ duyệt'
                  : status.value === 'approved'
                  ? 'đang được hiển thị'
                  : status.value === 'refuse'
                  ? 'bị từ chối'
                  : 'tin'}
                .
              </span>
            </div>
            <SortSelect sort={sort} setSort={setSort} />
          </div>
        ) : null}
      </div>

      <div className="container mt-8 max-w-6xl">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error err={error} />
        ) : response && response.data.length > 0 ? (
          <>
            <PostsList posts={response.data} handleReload={handleReload} />

            {/* paginate */}
            <Pagination
              currentPage={page}
              pageCount={response.totalPage}
              onPageChange={handleSetPage}
            />
          </>
        ) : null}
      </div>
    </section>
  );
};

export default PostLitsManage;
