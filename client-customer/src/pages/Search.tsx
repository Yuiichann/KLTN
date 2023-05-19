import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import nhaDatApi from '../api/modules/nhaDat.api';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PostsList from '../components/PostsList';
import SortSelect from '../components/SortSelect';
import { sortOptions } from '../constants/filterPost.constants';
import { INhaDatListResponse } from '../types/api.types';
import { ISort } from '../types/nhaDat.types';

const Search = () => {
  const [searchParams] = useSearchParams();
  //   lấy các params
  let demandType = searchParams.get('demand');
  let typeNhaDat = searchParams.get('loainhadat');
  let provCode = searchParams.get('provCode');
  let distCode = searchParams.get('distCode');
  let wardCode = searchParams.get('wardCode');
  let rangePrice = searchParams.get('price');
  let rangeArea = searchParams.get('area');
  let numToilets = searchParams.get('toilets');
  let homeDirection = searchParams.get('direction');
  let keyword = searchParams.get('keyword');

  //   ----------------------state
  const [response, setResponse] = useState<INhaDatListResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  //   const [filterOptions, setFilterOptions] = useState<IFilterOptions>({});

  const [sort, setSort] = useState<ISort>(sortOptions[0]);
  const [page, setPage] = useState(1);

  const handleSetPage = useCallback((val: number) => {
    setPage(val);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getListByDemand({
        demand: demandType === 'lease' ? 'lease' : 'buy',
        page: page,
        type_nhadat: typeNhaDat || undefined,
        provCode: provCode ? parseInt(provCode) : undefined,
        distCode: distCode ? parseInt(distCode) : undefined,
        wardCode: wardCode ? parseInt(wardCode) : undefined,
        range_price: rangePrice || undefined,
        range_area: rangeArea || undefined,
        num_toilets: numToilets || undefined,
        home_direction: homeDirection || undefined,
        search: keyword || undefined,
        sort: sort ? sort.value : undefined,
      });

      if (error && error.message) {
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
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [
    demandType,
    typeNhaDat,
    provCode,
    distCode,
    wardCode,
    rangeArea,
    rangePrice,
    numToilets,
    homeDirection,
    keyword,
    sort,
    page,
  ]);

  return (
    <section className="mt-12">
      <div className="container">
        <div className="flex gap-4 max-w-4xl mx-auto">
          {/* post list */}
          <div className="flex-1 px-0 lg:px-12">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <>
                <h1 className="text-xl font-lexend font-medium mb-2">Tìm kiếm nhà đất</h1>
                <Error err={error} />
              </>
            ) : (
              response && (
                <>
                  <h1 className="text-xl font-lexend font-medium mb-2">
                    Tìm kiếm nhà đất {demandType === 'lease' ? 'cho thuê' : 'bán'}
                  </h1>

                  <div className="mb-4 mt-2 flex items-center justify-between">
                    <p className="text-14">Hiện có {response.totalItems} bất động sản</p>

                    <SortSelect sort={sort} setSort={setSort} />
                  </div>

                  <PostsList posts={response.data} />

                  {/* Paginate */}
                  <Pagination currentPage={page} pageCount={response.totalPage} onPageChange={handleSetPage} />
                </>
              )
            )}
          </div>

          {/* filter */}
          {/* <div className="w-3/12 hidden lg:block">
            <FilterPosts
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Search;
