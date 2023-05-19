import Tippy from '@tippyjs/react';
import { useCallback, useEffect, useState } from 'react';
import { IoReload } from 'react-icons/io5';
import exchangeApi from '../../api/modules/exchange.api';
import Error from '../../components/Error';
import ExchangeList from '../../components/ExchangeManage/ExchangeList';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import SortSelect from '../../components/SortSelect';
import {
  exchangeElapsedSortOptions,
  exchangeSortOptions,
} from '../../constants/filterPost.constants';
import { IExchangeResponse } from '../../types/exchange.types';

const statusOptions = [
  { label: 'Tất cả', value: '' },
  { label: 'Đang tiến hành', value: 'pending' },
  { label: 'Hoàn thành', value: 'success' },
  { label: 'Đã hủy', value: 'cancel' },
];

const RequestExchange = () => {
  const [response, setResponse] = useState<IExchangeResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [reload, setReload] = useState(false);

  // filter state
  const [status, setStatus] = useState(statusOptions[0]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(exchangeSortOptions[0]);
  const [elapsed, setElapsed] = useState(exchangeElapsedSortOptions[0]);

  const handleReload = useCallback(() => {
    setReload((prev) => !prev);
  }, []);

  const handleSetPage = useCallback((val: number) => {
    setPage(val);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await exchangeApi.getListExchanges({
        party: 'sell',
        status: status.value as any,
        sort: sort ? sort.value : undefined,
        elapsed: elapsed ? elapsed.value : undefined,
        page: page ? page : undefined,
      });

      if (error && error.message) {
        setResponse(undefined);
        setError(error.message);
      }

      if (response && response.data) {
        setResponse(response.data);
        setError(undefined);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [reload, status, sort, elapsed, page]);

  return (
    <section className="">
      <div className="container pt-12 max-w-6xl">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-medium tracking-wide">
            Danh sách yêu cầu giao dịch mua - thuê
          </h1>

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

        <div className="mt-3 flex items-center gap-3 flex-wrap">
          {statusOptions.map((item, index) => (
            <button
              onClick={() => setStatus(item)}
              className={`px-4 py-1 text-14 border hover:bg-overlay effect ${
                item.value === 'success'
                  ? 'border-green-500 text-green-500'
                  : item.value === 'cancel'
                  ? 'border-red-500 text-red-500'
                  : item.value === 'pending'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-text-secondary text-text-secondary'
              }`}
              key={index}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between flex-wrap gap-2">
          {response ? (
            <p className="text-14 text-text-secondary">
              Bạn đang có {response.totalItems} giao dịch
              {status.value === 'pending'
                ? ' đang xử lý'
                : status.value === 'cancel'
                ? ' thất bại'
                : status.value === 'success'
                ? ' thành công'
                : ''}
              .
            </p>
          ) : (
            <p className="text-14 text-text-secondary">Không có giao dịch.</p>
          )}

          <div className="flex items-center gap-4 text-14 flex-wrap">
            <div className="flex items-center gap-1">
              <b className="min-w-[150px] sm:min-w-0">Sắp xếp:</b>
              <SortSelect sort={sort} setSort={setSort} isExchangeSort={true} />
            </div>

            <div className="flex items-center gap-1">
              <b className="min-w-[150px] sm:min-w-0">Khoảng thời gian:</b>

              <SortSelect
                sort={elapsed}
                setSort={setElapsed}
                isElapsedSort={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8 max-w-6xl">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error err={error} />
        ) : (
          response && (
            <>
              <ExchangeList
                exchanges={response.data}
                party="sell"
                handleReload={handleReload}
              />

              <Pagination
                currentPage={page}
                onPageChange={handleSetPage}
                pageCount={response.totalPage}
              />
            </>
          )
        )}
      </div>
    </section>
  );
};

export default RequestExchange;
