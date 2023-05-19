import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageLazyLoading from '../ImageLazyLoading';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  images: string[];
}

const ImageList = ({ images }: Props) => {
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 2000 }}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="mb-6">
            <div className="flex justify-center items-center">
              <ImageLazyLoading
                src={img}
                alt="preview"
                className="min-h-[200px] max-h-[350px] mx-auto rounded-sm shadow-sm"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(ImageList);
