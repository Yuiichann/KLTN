import { memo, useCallback, useEffect, useState } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const ButtonScrollTop = () => {
  const [isShowBtn, setIsShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsShowBtn(true);
      } else {
        setIsShowBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return isShowBtn ? (
    <button
      onClick={handleScrollTop}
      className="fixed z-10 bottom-3 right-3 rounded-full p-2 cursor-pointer hover:opacity-80 effect"
    >
      <BsFillArrowUpCircleFill className="text-4xl" />
    </button>
  ) : null;
};

export default memo(ButtonScrollTop);
