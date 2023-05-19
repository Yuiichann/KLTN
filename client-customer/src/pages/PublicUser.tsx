import Tippy from '@tippyjs/react';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../api/modules/user.api';
import CoverImage from '../assets/img/cover.png';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NoneAvatar from '../components/NoneAvatar';
import PostList from '../components/PublicUser/PostList';
import { IPublicUserWithProperty } from '../types/user.types';
import { Helmet } from 'react-helmet';

const PublicUser = () => {
  const { userId } = useParams();

  const [publicUser, setPublicUser] = useState<IPublicUserWithProperty>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleClickToCopy = useCallback((val: string) => {
    try {
      navigator.clipboard.writeText(val);
      toast.success('Copy thành công!', { autoClose: 400 });
    } catch {
      toast.error('KHông thể copy trên trình duyệt của bạn!');
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setError('Không tìm thấy thông tin user');
      return;
    }

    const fetchData = async () => {
      const { response, error } = await userApi.getPublicInfo(userId, true);

      if (error && error.message) {
        setError(error.message);
        setPublicUser(undefined);
      }

      if (response && response.data) {
        setPublicUser(response.data);
        setError(undefined);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, [userId]);

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        publicUser && (
          <>
            <Helmet>
              <title>Thông tin: {publicUser.displayName}</title>
            </Helmet>

            <div
              className="bg-center bg-no-repeat bg-cover h-36 md:h-48"
              style={{ backgroundImage: `url(${CoverImage})` }}
            ></div>

            <div className="container p-8 relative -top-16 bg-white rounded-t-md ">
              {/* Info */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between pb-4 min-h-[150px] border-b">
                {/* image - name - location */}
                <div className="flex gap-4 self-start">
                  <div>
                    {publicUser.avatar ? (
                      <img
                        src={publicUser.avatar}
                        alt={publicUser.displayName}
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                      />
                    ) : (
                      <NoneAvatar
                        character={publicUser.displayName.charAt(0)}
                        className="w-24 h-24 text-2xl"
                      />
                    )}
                  </div>

                  <div>
                    <h1 className="text-2xl font-medium tracking-wide">
                      {publicUser.displayName}
                    </h1>
                    <div className="mt-2 flex gap-1 text-14 text-text-tertiary">
                      <CiLocationOn className="text-xl" />
                      <span>{publicUser.address}</span>
                    </div>
                  </div>
                </div>

                {/* phone - email */}
                <div className="flex items-center gap-3 self-center lg:self-end">
                  <Tippy content="Click để copy" animation="fade">
                    <button
                      onClick={() => handleClickToCopy(publicUser.email)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#009BA1] text-white rounded-md"
                    >
                      <AiOutlineMail className="text-xl" />
                      <b>Email</b>
                    </button>
                  </Tippy>

                  <Tippy content="Click để copy" animation="fade">
                    <button
                      onClick={() => handleClickToCopy(publicUser.phone_number)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#009BA1] text-white rounded-md"
                    >
                      <AiOutlinePhone className="text-xl" />
                      <b>Số điện thoại</b>
                    </button>
                  </Tippy>
                </div>
              </div>

              {/* slier */}
              {publicUser.nha_dat.map((item, index) => (
                <div key={index} className="mt-8">
                  <h2 className="text-xl font-medium tracking-wide mt-4">
                    {item.title}{' '}
                    {item.items?.length > 0 && `(${item.items.length})`}
                  </h2>

                  <p className="text-12 text-text-tertiary italic mb-4">
                    Chỉ hiện thị 20 tin gần nhất.
                  </p>

                  {item.items?.length > 0 ? (
                    <PostList
                      posts={item.items}
                      demand={item.id === 'nha_dat_ban' ? 'buy' : 'lease'}
                    />
                  ) : (
                    <Error err="Chưa có tin đăng tại thời điểm hiện tại" />
                  )}
                </div>
              ))}
            </div>
          </>
        )
      )}
    </section>
  );
};

export default PublicUser;
