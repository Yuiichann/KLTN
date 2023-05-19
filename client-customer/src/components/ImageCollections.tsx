import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  images: string[];
  alt: string;
}

const ImageCollections = ({ images, alt }: Props) => {
  return (
    <div className="">
      <Carousel infiniteLoop={true} autoPlay={true} showIndicators={false}>
        {images.map((img, index) => (
          <div
            key={index}
            className="h-[350px] lg:h-fit lg:max-h-[550px] flex items-center md:items-star"
          >
            <img src={img} alt={alt} className="shadow-sm" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(ImageCollections);
