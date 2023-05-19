import { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import brokerApi from '../api/modules/broker.api';
import Error from '../components/Error';
import ImageLazyLoading from '../components/ImageLazyLoading';
import Loading from '../components/Loading';
import PostList from '../components/PublicUser/PostList';
import { IBrokerWithProperty } from '../types/broker.types';

const BrokerDetail = () => {
  const { brokerId } = useParams();

  const [broker, setBroker] = useState<IBrokerWithProperty>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!brokerId) {
      setError('KHông tìm thấy thông tin môi giới');
      return;
    }

    const fetchData = async () => {
      const { response, error } = await brokerApi.getDetail(brokerId);

      if (error) {
        setError(error.message);
        setBroker(undefined);
      }

      if (response) {
        setError(undefined);
        setBroker(response.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, [brokerId]);

  return (
    <section className="mt-12">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        broker && (
          <div className="container">
            <div className="max-w-3xl mx-auto mb-2">
              {/* info */}
              <div className="flex gap-4">
                <div className="min-w-fit">
                  <ImageLazyLoading
                    src={broker.user.avatar}
                    alt={broker.broker_name}
                    className="w-32 h-40 object-cover rounded-sm shadow-md"
                  />
                </div>

                {/* info */}
                <div>
                  <h1 className="pb-2 font-medium">{broker.broker_name}</h1>
                  <p className="flex items-center gap-2 text-14 text-text-secondary py-1">
                    <HiLocationMarker />
                    <span>{broker.user.address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-14 text-text-secondary py-1">
                    <HiPhone />
                    <span>{broker.user.phone_number}</span>
                  </p>
                  <p className="flex items-center gap-2 text-14 text-text-secondary py-1">
                    <HiMail />
                    <span>{broker.user.email}</span>
                  </p>

                  <Link
                    to={`mailto:${broker.user.email}?subject=${encodeURI(
                      'Khách hàng Batdongsanvn.fun muốn liên hệ với bạn'
                    )}&body=${encodeURI('Tôi quan tâm đến môi giới')}`}
                    className="inline-block px-4 py-1 text-red-500 rounded-md border border-red-500 mt-3 hover:bg-red-500 hover:text-white effect"
                  >
                    Gửi mail
                  </Link>
                </div>
              </div>

              {/* introduce */}
              <div className="mt-6">
                <h3 className="font-medium py-4 text-18">Giới thiệu</h3>

                {/* fields */}
                <div>
                  <h6 className="font-medium mb-2">Khu vực môi giới</h6>
                  <ul className="text-14 text-text-secondary">
                    {broker.fields.map((item, index) => (
                      <li className="flex items-center gap-1 mb-1" key={index}>
                        <BsDot className="text-2xl" />
                        <span>
                          {item.field_name} {item.location.district.name},{' '}
                          {item.location.province.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* introduce */}
                <div className="mt-4">
                  <h6 className="font-medium mb-2">
                    Nhà môi giới tự giới thiệu
                  </h6>

                  <p className="text-14 text-text-secondary break-all">
                    {broker.introduce}
                  </p>
                </div>
              </div>

              {/* danh sach tin dang */}
              <div className="mt-8">
                <h3 className="font-medium text-18">Danh sách tin đăng</h3>
                <p className="text-12 text-text-primary italic">
                  Chỉ hiện thị 12 tin gần nhất (*)
                </p>

                <div className="mt-4">
                  <PostList
                    posts={broker.properties}
                    demand="buy"
                    isCol={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default BrokerDetail;
