import { memo, useEffect, useState } from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import brokerApi from '../../api/modules/broker.api';
import { ITopBrokers } from '../../types/broker.types';
import ImageLazyLoading from '../ImageLazyLoading';
import LoadingTopBroker from './LoadingTopBroker';

const TopBrokerSwiper = () => {
  const [topBrokers, setTopBrokers] = useState<ITopBrokers[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [slidePerView, setSlidePerView] = useState(4);

  //   call api
  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await brokerApi.getTopBrokers();

      if (error) {
        setTopBrokers(undefined);
        console.error(error);
      }

      if (response) {
        setTopBrokers(response.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, []);

  //   effect responsive silder
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidePerView(1);
      } else if (window.innerWidth < 768) {
        setSlidePerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidePerView(3);
      } else {
        setSlidePerView(4);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="my-8">
      {isLoading ? (
        <LoadingTopBroker />
      ) : topBrokers && topBrokers.length > 0 ? (
        <>
          <h1 className="font-medium mb-4 text-2xl">Môi giới nổi bật trên Batdongsanvn.fun</h1>

          <Swiper slidesPerView={slidePerView} grabCursor={true} spaceBetween={15} className="relative z-0">
            {topBrokers.map((broker, index) => (
              <SwiperSlide key={index} className="pb-4 px-2 pt-1">
                <div className="flex flex-col gap-2 items-center bg-white py-4 px-2 shadow-lg">
                  {/* avatar */}
                  <div className="w-full flex justify-center items-center">
                    <ImageLazyLoading src={broker.avatar} alt={broker.displayName} className="rounded-full w-32 h-32" />
                  </div>

                  {/* link */}
                  <Link to={`/chi-tiet-moi-gioi/${broker.id}`} className="block font-medium hover:opacity-80 effect">
                    {broker.displayName}
                  </Link>

                  {/* info */}
                  <div className="flex flex-col items-center gap-1 select-none text-14">
                    <div className="flex items-center gap-1">
                      <CiLocationOn className="min-w-fit" />
                      <span className="line-clamp-1 md:max-w-[200px]">{broker.address}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <AiFillPhone />
                      <span className="line-clamp-1 max-w-[200px]">{broker.phone_number}</span>
                    </div>
                  </div>

                  {/* so bai dang */}
                  <div className="mt-4 flex items-center gap-1 text-14 font-medium">
                    <p>Số bài đăng:</p>
                    <span>{broker.count}</span>
                  </div>

                  {/* button */}
                  <div className="mt-4 mb-2">
                    <Link
                      to={`/chi-tiet-moi-gioi/${broker.id}`}
                      className="px-4 py-2 text-14 rounded-sm bg-[#009BA1] text-white font-medium hover:opacity-70 effect"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : null}
    </div>
  );
};

export default memo(TopBrokerSwiper);
