import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';
import nhaDatApi from '../api/modules/nhaDat.api';
import Error from '../components/Error';
import FilterPosts from '../components/FilterPosts';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PostsList from '../components/PostsList';
import SortSelect from '../components/SortSelect';
import { sortOptions } from '../constants/filterPost.constants';
import { INhaDatListResponse } from '../types/api.types';
import { ISort } from '../types/nhaDat.types';
import createPostTitle from '../utils/createPostTitle';

const Posts = () => {
  const location = useLocation();
  const { type } = useParams();

  const [response, setResponse] = useState<INhaDatListResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [page, setPage] = useState(1);
  const [rangePrice, setRangePrice] = useState<string>();
  const [rangeArea, setRangeArea] = useState<string>();
  const [sort, setSort] = useState<ISort>(sortOptions[0]);

  const handlePageChange = useCallback((val: number) => {
    setPage(val);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getListByDemand({
        demand: location.pathname.includes('/ban') ? 'buy' : 'lease',
        page: page,
        type_nhadat: type ? type.replaceAll('-', '_') : undefined,
        range_area: rangeArea ? rangeArea : undefined,
        range_price: rangePrice ? rangePrice : undefined,
        sort: sort ? sort.value : undefined,
      });

      if (response && response.data) {
        setError(undefined);
        setResponse(response.data);
      }

      if (error && error.message) {
        setError(error.message);
        setResponse(undefined);
      }
      setIsLoading(false);
    };

    window.scroll({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    fetchData();
  }, [location.pathname, type, rangeArea, rangePrice, sort, page]);

  return (
    <section className="mt-12">
      {/* helmet */}
      <Helmet>
        <title>
          Danh sách nhà đất{' '}
          {location.pathname.includes('/ban') ? 'bán' : 'cho thuê'}
        </title>
      </Helmet>

      <div className="container">
        <div className="flex gap-4 max-w-6xl mx-auto">
          {/* post list */}
          <div className="flex-1 px-0 lg:px-12">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <>
                <h1 className="text-xl font-lexend font-medium mb-2">
                  {createPostTitle(
                    location.pathname,
                    type,
                    rangePrice,
                    rangeArea
                  )}
                </h1>
                <Error err={error} />
              </>
            ) : (
              response && (
                <>
                  <h1 className="text-xl font-lexend font-medium mb-2">
                    {createPostTitle(
                      location.pathname,
                      type,
                      rangePrice,
                      rangeArea
                    )}
                  </h1>

                  <div className="mt-2 mb-4 flex items-center justify-between">
                    <p className="text-14 text-text-primary">
                      Hiện có {response.totalItems} bất động sản
                    </p>

                    <SortSelect sort={sort} setSort={setSort} />
                  </div>

                  <PostsList posts={response.data} />

                  {/* Paginate */}
                  <Pagination
                    currentPage={page}
                    pageCount={response.totalPage}
                    onPageChange={handlePageChange}
                  />
                </>
              )
            )}
          </div>

          {/* filter */}
          <div className="w-3/12 hidden lg:block">
            <FilterPosts
              rangeArea={rangeArea}
              rangePrice={rangePrice}
              setRangeArea={setRangeArea}
              setRangePrice={setRangePrice}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
