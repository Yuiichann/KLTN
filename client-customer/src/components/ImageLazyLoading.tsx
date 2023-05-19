import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import Image404 from '../assets/img/img_404.png';

interface Props {
  src: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
}

const ImageLazyLoading = (props: Props) => {
  return (
    <LazyLoadImage
      {...props}
      effect="black-and-white"
      placeholderSrc={Image404}
    />
  );
};

export default React.memo(ImageLazyLoading);
