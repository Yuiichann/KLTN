import { useCallback, useEffect, useState } from 'react';
import reportApi from '../api/modules/report.api';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ReportList from '../components/ReportManage/ReportList';
import { IReportResponse } from '../types/report.type';

const ReportStatus = [
  {
    label: 'Tất cả',
    value: '',
  },
  {
    label: 'Đợi xử lý',
    value: 'pending',
  },
  {
    label: 'Đã xác nhận',
    value: 'confirmed',
  },
  {
    label: 'Bị từ chối',
    value: 'refuse',
  },
];

const ReportManage = () => {
  const [response, setResponse] = useState<IReportResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(ReportStatus[0]);

  const handleSetPage = useCallback((val: number) => {
    setPage(val);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await reportApi.getList({
        page,
        status: status ? status.value : undefined,
      });

      if (error) {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, [page, status]);

  return (
    <div>
      <h1 className="my-3 font-semibold tracking-wide text-2xl">
        Danh sách báo cáo
      </h1>

      {/* status */}
      <div className="flex items-center gap-4">
        <b>Trạng thái:</b>
        <div className="flex items-center gap-3">
          {ReportStatus.map((item, index) => (
            <div className="flex items-center gap-1">
              <input
                type="radio"
                checked={item.value === status.value}
                onChange={() => setStatus(item)}
                id={`item-${index}`}
              />
              <label htmlFor={`item-${index}`}>{item.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* main */}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        response && (
          <>
            <ReportList reports={response.data} />

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

export default ReportManage;
