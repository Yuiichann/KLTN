import aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Home1 from '../assets/img/home1.webp';
import Home2 from '../assets/img/home2.webp';
import Home3 from '../assets/img/home3.webp';
import HomeSearch from '../components/HomeSearch/HomeSearch';
import TopBrokerSwiper from '../components/LandingPage/TopBrokerSwiper';
import { toggleModalSignUp } from '../redux/features/modalStatus.slice';
import { AppDispath } from '../redux/store';

// homepage
const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dispatch = useDispatch<AppDispath>();

  useEffect(() => {
    aos.init({
      easing: 'ease-in',
      delay: 50,
    });
  }, []);

  const handleOpenModalSignUp = () => {
    if (window.innerWidth <= 1024) {
      navigate('/trang-dang-ky');
    } else {
      if (localStorage.getItem('actkn')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        dispatch(toggleModalSignUp(true));
      }
    }
  };

  return (
    <section className="mb-24 overflow-hidden">
      {/* video */}
      <div className="w-screen relative mb-32 min-h-[600px] lg:min-h-[650px]">
        <video
          className="mx-auto hidden lg:block -z-10"
          ref={videoRef}
          src="/assets/video/video.mp4"
          autoPlay={true}
          muted={true}
          loop={true}
        />

        <div className="absolute inset-0 lg:bg-[rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 mt-32">
            <HomeSearch />
          </div>
        </div>
      </div>

      {/* div 1 */}
      <div className="container flex flex-col-reverse md:flex-row gap-16 max-w-5xl mb-32" data-aos="fade-left">
        <div className="flex-1 self-end">
          <h1 className="text-2xl font-medium mb-8 leading-10">Bạn có nhu cầu mua bán hoặc cho thuê bất động sản?</h1>
          <div className="flex items-start gap-8">
            <div className="w-24 h-[2px] mt-2 bg-red-400"></div>
            <p className="flex-1 text-16 tracking-wider text-justify">
              Batdongsanvn.fun cung cấp chức năng quản lí thông tin bất động sản giúp cho việc dễ dàng giao dịch giữa các khách
              hàng.
            </p>
          </div>
        </div>

        <div className="flex-1">
          <img src={Home1} alt="HomeImage" className="mx-auto" />
        </div>
      </div>

      {/* div 2 */}
      <div className="container flex flex-col md:flex-row gap-16 max-w-5xl mb-32" data-aos="fade-right">
        <div className="flex-1 pt-8">
          <img src={Home2} alt="HomeImage" />
        </div>

        <div className="flex-1">
          <div className="h-[2px] bg-red-300 ml-12 mb-4"></div>

          <ul className="ml-12 flex flex-col gap-8 font-lexend">
            <li>
              <p className="text-6xl font-normal">63</p>
              <p className="text-xl mt-1 text-[#666]">Tỉnh, thành phố</p>
            </li>

            <li className="pl-4">
              <p className="text-6xl font-normal">650+</p>
              <p className="text-xl mt-1 text-[#666]">Tin đăng mỗi tháng</p>
            </li>

            <li className="pl-8">
              <p className="text-6xl font-normal">110+</p>
              <p className="text-xl mt-1 text-[#666]">Môi giới hoạt động</p>
            </li>

            <li className="pl-12">
              <p className="text-6xl font-normal">150+</p>
              <p className="text-xl mt-1 text-[#666]">Giao dịch BĐS</p>
            </li>
          </ul>
        </div>
      </div>

      {/* div 3 */}
      <div className="bg-red-500 text-white">
        {/* item 1 */}
        <div className="container flex flex-col md:flex-row gap-2 md:gap-16 pb-10 lg:pt-10" data-aos="fade-up">
          <div className="flex-1 relative min-h-[200px] md:min-h-[280px]">
            <img src={Home3} alt="homeImage" className="absolute -top-14 md:-top-20 shadow-md rounded-t-sm" />
          </div>

          <div className="flex-1 min-[490px]:mt-24 md:mt-12">
            <h2 className="text-2xl font-medium tracking-wider mb-4">Trở thành môi giới bất động sản</h2>
            <p className="text-16 text-justify">
              Bạn cũng có thể đăng kí làm môi giới với các lĩnh vực bất động sản để giúp cho các bên mua bán bất động sản giao
              dịch dễ dàng.
            </p>

            <button
              onClick={handleOpenModalSignUp}
              className="group mt-4 px-8 py-2 border rounded-sm flex items-center gap-4 font-semibold bg-white text-red-500 hover:bg-opacity-80"
            >
              <span>ĐĂNG KÝ NGAY</span>
              <BiRightArrowAlt className="group-hover:translate-x-2 effect duration-500" />
            </button>
          </div>
        </div>

        {/* item 2 */}
      </div>

      <div className="container">
        <TopBrokerSwiper />
      </div>
      {/* top broker */}
    </section>
  );
};

export default LandingPage;
