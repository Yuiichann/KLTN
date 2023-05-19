import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiFillHome, AiOutlineShareAlt } from 'react-icons/ai';
import { BiBed, BiCart, BiPhone } from 'react-icons/bi';
import { BsViewStacked } from 'react-icons/bs';
import { FaToilet } from 'react-icons/fa';
import { GoLaw } from 'react-icons/go';
import { GrDirections } from 'react-icons/gr';
import { MdAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import nhaDatApi from '../api/modules/nhaDat.api';
import ButtonReport from '../components/ButtonReport';
import Error from '../components/Error';
import ImageCollections from '../components/ImageCollections';
import Loading from '../components/Loading';
import NoneAvatar from '../components/NoneAvatar';
import HomeDirections from '../constants/HomeDirection.constant';
import LegalsConstants from '../constants/Legal.constants';
import { addCart } from '../redux/features/cart.slice';
import { setGlobalLoading } from '../redux/features/globalLoading.slice';
import { AppDispath, RootState } from '../redux/store';
import { INhaDat } from '../types/nhaDat.types';
import formatPriceTV from '../utils/formatPriceTV';

function getHomeDirectionLabel(val: string) {
  const current = HomeDirections.find((item) => item.value === val);

  return current ? current.label : '';
}

function getLegalLabel(val: string) {
  const current = LegalsConstants.find((item) => item.value === val);

  return current ? current.label : '';
}

const PostDetail = () => {
  // lấy slug của bài post
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispath>();

  const [post, setPost] = useState<INhaDat>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleAddToCart = () => {
    if (!post) return;

    dispatch(addCart(post));
  };

  const handleClickButtonExchange = () => {
    if (!user) {
      toast.warn('Bạn phải đăng nhập để thực hiện giao dịch');
      return;
    }

    if (user.id === post?.user_id) {
      toast.error('Bạn không thể thực hiện giao dịch trên chính bài đăng của mình');
      return;
    }

    dispatch(setGlobalLoading(true));

    navigate('/giao-dich-nha-dat', { state: { cart: post } });
  };

  // copy click
  const handleCopyClipboard = (val: string, msg?: string) => {
    try {
      navigator.clipboard.writeText(val);
      toast.success(msg || 'Copy thành công', { autoClose: 1000 });
    } catch (error: any) {
      toast.error('Không thể copy trên trình duyệt của bạn!');
    }
  };

  // call data
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getDetail(slug);

      if (error && error.message) {
        setError(error.message);
        setPost(undefined);
      }

      if (response && response.data) {
        setError(undefined);
        setPost(response.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  return (
    <section className="mt-12">
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error err={error} />
        ) : (
          post && (
            <>
              {/* Helmet */}
              <Helmet>
                <title>{post.title}</title>
              </Helmet>

              <div className="flex flex-col gap-4 md:flex-row max-w-5xl mx-auto">
                {/* info */}
                <div className="flex-1 max-w-full">
                  {/* collections */}
                  <div>
                    <ImageCollections images={post.collections} alt={post.title} />
                  </div>

                  {/* breacum gi do */}
                  <div className="flex items-center gap-1 select-none text-14 text-text-tertiary my-2 ">
                    <Link to="/" className="min-w-fit hover:text-text-secondary">
                      <AiFillHome />
                    </Link>
                    <span>/</span>
                    <Link className="min-w-fit hover:text-text-secondary" to={`${post.demand === 'buy' ? '/ban' : '/cho-thue'}`}>
                      {post.demand === 'buy' ? 'Bán' : 'Cho thuê'}
                    </Link>
                    <span>/</span>
                    <Link
                      className="min-w-fit hover:text-text-secondary"
                      to={`/tim-kiem?demand=${post.demand}&provCode=${post.location.province.code}`}
                    >
                      {post.location.province.name}
                    </Link>
                    <span>/</span>
                    <span className="line-clamp-1">{post.title}</span>
                  </div>

                  {/* title */}
                  <h1 className="text-2xl font-medium tracking-wide">{post.title}</h1>

                  {/* location */}
                  <div className="flex items-center flex-wrap gap-1 mt-2 text-text-secondary">
                    <span>{post.location.street},</span>
                    <span>{post.location.ward.name},</span>
                    <span>{post.location.district.name},</span>
                    <span>{post.location.province.name}</span>
                  </div>

                  {/* Giá - diện tích - button report share */}
                  <div className="flex items-center justify-between py-6 my-4 border-y">
                    {/* price - area */}
                    <div className="flex items-center gap-12">
                      <div className="flex flex-col gap-2">
                        <span className="text-text-tertiary">Mức giá</span>
                        <div className="font-medium text-xl flex items-end gap-1">
                          <span>{post.price_unit === 'custom' ? 'Giá thỏa thuận' : formatPriceTV(post.price)}</span>

                          {post.price_unit === 'per_area' && (
                            <>
                              <span>/</span>
                              <div className="relative">
                                <span>m</span>
                                <span className="text-16 absolute -top-1 -right-2">2</span>
                              </div>
                            </>
                          )}

                          {/* tiền thuê */}
                          {post.demand === 'lease' && (
                            <>
                              <span>/</span>
                              <span>tháng</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-text-tertiary">Diện tích</span>
                        <div className="flex items-center gap-1 font-medium text-xl">
                          <span>{post.area}</span>
                          <div className="relative text-14">
                            <span>m</span>
                            <span className="text-12 absolute -top-1 -right-2">2</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* button */}
                    <div className="flex items-center gap-2">
                      <Tippy content="Chia sẻ" animation="fade">
                        <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.1)] cursor-pointer effect">
                          <AiOutlineShareAlt className="text-2xl" />
                        </button>
                      </Tippy>

                      <ButtonReport />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="py-4 flex flex-col sm:flex-row gap-2 justify-center text-14">
                    <button
                      onClick={handleClickButtonExchange}
                      className="flex items-center justify-center gap-2 font-medium uppercase px-4 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white effect"
                    >
                      <MdAttachMoney />
                      <span>{post.demand === 'buy' ? 'Mua' : 'Thuê'} ngay</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center gap-2 font-medium uppercase px-4 py-2 border border-[#009BA1] rounded-md text-[#009BA1] hover:bg-[#009BA1] hover:text-white effect"
                    >
                      <BiCart className="text-xl" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  </div>

                  {/* mô tả - desc */}
                  <div className="my-4 text-justify">
                    <h5 className="text-xl font-medium mb-2">Thông tin mô tả</h5>
                    {post.description.split('\n').map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>

                  {/* Đặc điểm (toilet, price, area) */}
                  <div className="mb-4 mt-8">
                    <h2 className="font-medium tracking-wide text-18 mb-2">Đặc điểm bất động sản</h2>

                    {post.num_toilets > 0 || post.num_bedrooms > 0 ? (
                      <div className="flex items-center py-4 border-b gap-4 md:gap-12 lg:gap-20">
                        {post.num_bedrooms > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 min-w-[130px] md:min-w-[150px]">
                              <BiBed />
                              <span className="font-medium">Số phòng ngủ</span>
                            </div>
                            <span>{post.num_bedrooms}</span>
                          </div>
                        )}

                        {post.num_toilets > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 min-w-[130px] md:min-w-[150px]">
                              <FaToilet />
                              <span className="font-medium">Số toilet</span>
                            </div>
                            <span>{post.num_toilets}</span>
                          </div>
                        )}
                      </div>
                    ) : null}

                    {post.num_floors > 0 || post.home_direction !== 'none' ? (
                      <div className="flex items-center py-4 border-b gap-4 md:gap-12 lg:gap-20">
                        {post.num_floors > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 min-w-[130px] md:min-w-[150px]">
                              <BsViewStacked />
                              <span className="font-medium">Số tầng</span>
                            </div>
                            <span>{post.num_floors}</span>
                          </div>
                        )}

                        {post.home_direction !== 'none' && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 min-w-[130px] md:min-w-[150px]">
                              <GrDirections />
                              <span className="font-medium">Hướng nhà</span>
                            </div>
                            <span>{getHomeDirectionLabel(post.home_direction)}</span>
                          </div>
                        )}
                      </div>
                    ) : null}

                    <div className="py-4 border-b flex items-center gap-2">
                      <div className="flex items-center gap-2 min-w-[150px]">
                        <GoLaw />
                        <span className="font-medium">Hợp đồng</span>
                      </div>
                      <span>{getLegalLabel(post.legal)}</span>
                    </div>
                  </div>
                </div>

                {/* contact info */}
                <div className="w-full md:w-3/12">
                  {/* info người đăng */}
                  <div className="flex flex-col items-center justify-center border rounded-md px-2 py-6">
                    <p className="text-14 text-text-tertiary mb-4">Được đăng bởi</p>

                    <NoneAvatar character={post.contact.name.charAt(0)} className="w-12 h-12 mb-2" />

                    <Link to={`/u/${post.user_id}`} className="text-18 font-medium tracking-wide mb-2">
                      {post.contact.name}
                    </Link>

                    <Link to={`/u/${post.user_id}`} className="text-text-tertiary text-14 mb-2 block">
                      Xem thêm tin
                    </Link>

                    <button
                      onClick={() => handleCopyClipboard(post.contact.phone)}
                      className="min-w-[150px] flex items-center gap-2 px-4 py-2 rounded-md bg-[#009BA1] border border-[#009BA1] text-white"
                    >
                      <BiPhone className="text-18" />
                      <span className="select-text">{post.contact.phone}</span>
                    </button>

                    <a
                      href={`mailto:${post.contact.email}?subject=Thành viên trên Batdongsanvn.fun quan tâm&body=Tôi quan tâm đến bài đăng có tiêu đề ${post.title}`}
                      className="min-w-[150px] block my-2  text-center px-4 py-2 rounded-md border border-[#009BA1] text-[#009BA1]"
                    >
                      Gửi Email
                    </a>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
};

export default PostDetail;
