import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
import { Link } from 'react-router-dom';
import statisticApi from '../api/modules/statistic.api';
import Clock from '../components/Clock';
import ExchangeOverview from '../components/Dashboard/ExchangeOverview';
import PropertyOverview from '../components/Dashboard/PropertyOverview';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { IDashboardResponse } from '../types/api.types';

const Dashboard = () => {
  const [response, setResponse] = useState<IDashboardResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await statisticApi.getDashBoard();

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
    fetchData();
  }, []);

  return (
    <div className="text-primary">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        response && (
          <div className="text-14">
            <div className="mb-12">
              <h1 className="font-semibold text-2xl tracking-wider">
                Overview
              </h1>
              <div className="mt-2">
                <Clock />
              </div>
            </div>

            {/* div property */}
            <PropertyOverview property={response.property} />

            {/* div exchange */}
            <ExchangeOverview exchange={response.exchange} />

            {/* div report */}
            <div className="flex items-center gap-4 mt-12 mb-6">
              <h3 className="text-xl font-semibold min-w-[300px]">
                Báo cáo của người dùng:
              </h3>

              {response.report &&
                response.report.map((item, index) => (
                  <Tippy key={index} content="Xem chi tiết">
                    <div className="p-6 bg-yellow-300 rounded-md shadow-md bg-opacity-80 min-w-[200px]">
                      <Link
                        to="/quan-ly-bat-dong-san/bao-cao"
                        className="flex items-center gap-4"
                      >
                        {/* icon */}
                        <MdReport className="text-3xl text-sidebar" />

                        <div className="flex flex-col gap-1">
                          <h2 className="text-16 font-semibold">
                            {item.label}
                          </h2>
                          <p>Số lượng: {item.count}</p>
                        </div>
                      </Link>
                    </div>
                  </Tippy>
                ))}
            </div>

            {/* div user */}
            <div className="flex items-center gap-4 mt-12 mb-6">
              <h3 className="text-xl font-semibold min-w-[300px]">
                Người dùng hệ thống:
              </h3>

              {response.users && (
                <>
                  <div className="p-6 bg-lime-500 rounded-md shadow-md bg-opacity-80 min-w-[200px]">
                    <Link
                      to="/quan-ly-nguoi-dung/danh-sach"
                      className="flex items-center gap-4"
                    >
                      <FaUserAlt className="text-3xl text-sidebar" />
                      <div className="flex flex-col gap-1">
                        <h2 className="text-16 font-semibold">Người dùng</h2>
                        <p>{response.users.totalUsers} người dùng.</p>
                      </div>
                    </Link>
                  </div>

                  <div className="p-6 bg-cyan-500 rounded-md shadow-md bg-opacity-80 min-w-[200px]">
                    <Link
                      to="/quan-ly-nguoi-dung/danh-sach"
                      className="flex items-center gap-4"
                    >
                      <FaUsers className="text-3xl text-sidebar" />
                      <div className="flex flex-col gap-1">
                        <h2 className="text-16 font-semibold">Môi giới</h2>
                        <p>{response.users.totalBrokers} môi giới.</p>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
