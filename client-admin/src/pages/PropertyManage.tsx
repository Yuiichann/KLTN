import Tippy from '@tippyjs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoReloadOutline } from 'react-icons/io5';
import nhaDatApi from '../api/modules/nhaDat.api';
import ChooseStatus from '../components/ChooseStatus,';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PropertyList from '../components/PropertyManage/PropertyList';
import Sort from '../components/Sort';
import ElapsedConstants from '../constants/Elapsed.constants';
import PropertyStatus from '../constants/PropertyStatus.constants';
import SortOptions from '../constants/SortOptions.constants';
import { INhaDatListResponse } from '../types/api.types';
import { useLocation } from 'react-router-dom';

const PropertyManage = () => {
  const [demand, setDemand] = useState<'buy' | 'lease'>('buy');

  // reponsstate
  const [response, setResponse] = useState<INhaDatListResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [reload, setReload] = useState(false);

  // state search
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SortOptions[0]);
  const [status, setStatus] = useState(PropertyStatus[0]);
  const [elapsed, setElapsed] = useState(ElapsedConstants[0]);

  // ref cua search
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSetPage = useCallback((val: number) => {
    setPage(val);
  }, []);

  const handleSetSort = useCallback((val: any) => {
    setSort(val);
  }, []);

  const handleSetStatus = useCallback((val: any) => {
    setStatus(val);
  }, []);

  const handleSetElapsed = useCallback((val: any) => {
    setElapsed(val);
  }, []);

  const handleReload = useCallback(() => {
    setPage(1);
    setReload((prev) => !prev);
  }, []);

  const handleSearch = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (searchRef.current) {
          setIsLoading(true);
          const { response, error } = await nhaDatApi.getPropertyByDemand({
            demand,
            search: searchRef.current.value || '',
            status: status ? (status.value as any) : '',
            sort: sort ? sort.value : '',
            elapsed: elapsed ? elapsed.value : '',
          });

          if (error) {
            setError(error.message);
            setResponse(undefined);
          }

          if (response) {
            setError(undefined);
            setResponse(response?.data);
          }

          setIsLoading(false);
          setPage(1);
        }
      }
    },
    [demand, sort, status, elapsed]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getPropertyByDemand({
        demand,
        page: page,
        sort: sort ? sort.value : '',
        status: status ? (status.value as any) : '',
        search: searchRef.current ? searchRef.current.value : '',
        elapsed: elapsed ? elapsed.value : '',
      });

      if (error) {
        setError(error.message);
        setResponse(undefined);
      }

      if (response) {
        setError(undefined);
        setResponse(response?.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [demand, page, sort, status, elapsed, reload]);

  return (
    <div className="container">
      <h2 className="mb-4 font-semibold text-xl">
        DANH SÁCH BẤT ĐỘNG SẢN {demand === 'buy' ? 'BÁN' : 'CHO THUÊ'}
      </h2>

      {/* button demand */}
      <div className="flex items-center gap-4">
        <p className="font-semibold">NHU CẦU:</p>
        <div>
          <button
            onClick={() => setDemand('buy')}
            className={`w-[300px] border px-4 py-1 border-primary rounded-l-sm ${
              demand === 'buy' ? 'bg-primary text-white font-medium' : ''
            }`}
          >
            Bán
          </button>
          <button
            onClick={() => setDemand('lease')}
            className={`w-[300px] border border-l-0 px-4 py-1 border-primary rounded-r-sm ${
              demand === 'lease' ? 'bg-primary text-white font-medium' : ''
            }`}
          >
            Cho thuê
          </button>
        </div>
      </div>

      {/* filter lumala */}
      <div className="my-5 text-14">
        {/* status - sort - elapsed */}
        <div className="mb-4 flex items-center gap-12 flex-wrap">
          {/* status */}
          <ChooseStatus
            currentItem={status}
            options={PropertyStatus}
            setItem={handleSetStatus}
          />

          {/* Select Sort */}
          <Sort
            label="Sắp xếp:"
            currentItem={sort}
            setItem={handleSetSort}
            options={SortOptions}
          />

          <Sort
            label="Khoảng thời gian:"
            currentItem={elapsed}
            setItem={handleSetElapsed}
            options={ElapsedConstants}
          />
        </div>

        <div className="mb-4 flex items-center gap-8">
          {/* input search */}
          <div className="flex gap-2 items-center">
            <b>Tìm kiếm:</b>
            <input
              type="text"
              className="px-2 py-1 outline-none border rounded-sm focus:border-primary"
              placeholder="Enter keyword . . ."
              ref={searchRef}
              onKeyDown={handleSearch}
            />
          </div>

          {/* reaload */}
          <Tippy content="Tải lại" animation="fade">
            <button
              className="p-2 rounded-full text-xl hover:bg-overlay"
              onClick={handleReload}
            >
              <IoReloadOutline />
            </button>
          </Tippy>
        </div>

        {/* số bài đăng */}
        <div>
          {response && (
            <h2 className="w-[200px]">
              Hiện có {response.totalItems} bài đăng.
            </h2>
          )}
        </div>
      </div>

      {/* Main scrren */}
      <div className="my-6">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error err={error} />
        ) : response && response.data?.length > 0 ? (
          <>
            {/* List */}
            <PropertyList properties={response.data} />

            <Pagination
              currentPage={page}
              pageCount={response.totalPage}
              onPageChange={handleSetPage}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyManage;
