import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import brokerApi from '../api/modules/broker.api';
import BrokerList from '../components/Brokers/BrokerList';
import BrokerSearch from '../components/Brokers/BrokerSearch';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import { IBrokerListParams } from '../types/api.types';
import { IResponseBroker } from '../types/broker.types';

const Brokers = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let page = searchParams.get('page') || '1';

  const [response, setResponse] = useState<IResponseBroker>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSetPage = useCallback(
    (val: number) => {
      navigate(`/danh-sach-moi-gioi?page=${val}`);
    },
    [navigate]
  );

  const handleSearchBroker = useCallback(
    async (params: IBrokerListParams) => {
      setIsLoading(true);
      const { response, error } = await brokerApi.getList(params);

      if (error) {
        setError(error.message);
        setResponse(undefined);
      }

      if (response) {
        setResponse(response.data);
        setError(undefined);
      }

      setIsLoading(false);

      navigate('/danh-sach-moi-gioi?page=1');
    },
    [navigate]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { error, response } = await brokerApi.getList({
        page: page && !isNaN(Number(page)) ? parseInt(page) : 1,
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
  }, [page]);

  return (
    <section className="mt-12">
      {/* Hemlmet */}
      <Helmet>
        <title>Danh sách nhà môi giới</title>
      </Helmet>

      <div className="container">
        <BrokerSearch handleSearchBrokers={handleSearchBroker} />
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : response && response.data?.length > 0 ? (
        <>
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-xl font-medium tracking-wide mt-4 mb-2">
                Danh bạ nhà môi giới
              </h1>

              <p className="text-14 text-text-secondary mb-4">
                Có {response.data.length} người môi giới.
              </p>

              {/* List Broker */}
              <BrokerList brokers={response.data} />

              {/* Paginate */}
              <Pagination
                currentPage={isNaN(Number(page)) ? 1 : parseInt(page)}
                pageCount={response.totalPage}
                onPageChange={handleSetPage}
              />
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Brokers;
