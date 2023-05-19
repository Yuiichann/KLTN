import React from 'react';
import { Link } from 'react-router-dom';
import { IBroker } from '../../types/broker.types';
import ImageLazyLoading from '../ImageLazyLoading';
import { CiLocationOn } from 'react-icons/ci';
import { AiOutlinePhone } from 'react-icons/ai';
import getBrokerFieldLabel from '../../utils/getBrokerFieldLabel';

interface Props {
  broker: IBroker;
}

const BrokerListItem = ({ broker }: Props) => {
  return (
    <div className="border mb-6 p-4 rounded-md shadow-sm flex flex-col lg:flex-row gap-4">
      <div className="flex gap-4 flex-1">
        {/* iamge */}
        <div className="min-w-fit">
          <ImageLazyLoading
            src={broker.user.avatar}
            alt={broker.user.displayName}
            className="w-28 h-36 object-cover shadow-md rounded-sm"
          />
        </div>

        {/* info */}
        <div className="flex flex-col gap-2">
          <Link
            to={`/chi-tiet-moi-gioi/${broker.id}`}
            className="font-medium tracking-wide hover:opacity-70"
          >
            {broker.broker_name}
          </Link>

          <div className="flex items-center gap-2 text-12 text-text-secondary">
            <CiLocationOn className="text-16" />
            <span className="line-clamp-1">{broker.user.address}</span>
          </div>

          <div className="flex items-center gap-2 text-12 text-text-secondary">
            <AiOutlinePhone className="text-16" />
            <span>{broker.user.phone_number}</span>
          </div>

          <div>
            <Link
              to={`mailto:${broker.user.email}?subject=${encodeURI(
                'Người dùng trên batdongsanvn.fun quan tâm đến môi giới ' +
                  broker.broker_name
              )}`}
              className="px-4 py-2 text-14 border mt-2 border-black rounded-md hover:bg-overlay effect"
            >
              Gửi Email
            </Link>
          </div>
        </div>
      </div>

      {/* linh vuc */}
      <div className="flex-1">
        <h2 className="font-roboto font-medium">KHU VỰC CÁ NHÂN MÔI GIỚI</h2>
        <ul className="flex flex-col gap-2 text-text-secondary mt-2 pl-4 lg:pl-8 list-disc text-12">
          {broker.fields.map((field, index) => (
            <li key={index}>
              {getBrokerFieldLabel(field.field_code)} ở{' '}
              {field.location.district.name}, {field.location.province.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(BrokerListItem);
