import Tippy from '@tippyjs/react';
import { memo, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IDashboardResponse } from '../../types/api.types';

interface Props {
  property: IDashboardResponse['property'];
}

const TimeOptions = [
  {
    value: 'all',
    label: 'Tất cả',
  },
  {
    value: 'this_month',
    label: 'Trong tháng',
  },
  {
    value: 'this_week',
    label: 'Trong tuần',
  },
];

const PropertyOverview = ({ property }: Props) => {
  const [timeOption, setTimeOption] = useState(TimeOptions[0]);

  const totalProperty = property.total
    ? property.total.reduce((curr, obj) => {
        return (curr += obj.count);
      }, 0)
    : 0;

  const totalProperty_thisMonth = property.this_month
    ? property.this_month.reduce((curr, obj) => {
        return (curr += obj.count);
      }, 0)
    : 0;

  const totalProperty_thisWeek = property.this_week
    ? property.this_week.reduce((curr, obj) => {
        return (curr += obj.count);
      }, 0)
    : 0;

  return (
    <div className="my-4">
      {/* title và chọn móc time */}
      <div className="flex items-center text-16">
        <h1 className="text-xl font-semibold uppercase w-[500px]">
          Tin bất động sản
        </h1>

        <div className="relative group">
          <button className="flex gap-4 min-w-[160px] items-center justify-between pl-4 pr-2 py-2 rounded-md border shadow-md">
            <span>{timeOption.label}</span>
            <MdKeyboardArrowDown className="text-xl" />
          </button>

          <div className="absolute z-10 rounded-b-md overflow-hidden w-full hidden group-hover:block animate-top-to-bot top-full left-0 bg-white">
            {TimeOptions.map((item, index) => (
              <button
                key={`btn-${index}`}
                onClick={() => setTimeOption(item)}
                className={`pl-3 py-2 hover:bg-overlay w-full text-left ${
                  item.value === timeOption.value
                    ? 'font-medium bg-gray-200'
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {timeOption.value === 'all' && property.total ? (
        <div>
          <h3 className="mt-3 mb-1 text-16 font-medium">
            Tổng tin trên hệ thống: <b>{totalProperty}.</b>
          </h3>
          <div className="flex items-center gap-12 my-4 ml-4 flex-wrap">
            {property.total.map((item, index) => (
              <Tippy
                content="Xem chi tiết"
                animation="fade"
                key={`total-${index}`}
              >
                <div
                  className={`flex flex-col items-center gap-1 min-w-[200px] px-6 py-4 rounded-sm shadow-md border-2 ${
                    item.status === 'pending'
                      ? 'border-blue-500 text-blue-500'
                      : item.status === 'approved'
                      ? 'border-green-500 text-green-500'
                      : 'border-red-500 text-red-500'
                  }`}
                >
                  <span className="text-3xl font-bold">{item.count}</span>
                  <h3 className="font-medium text-16">{item.title}</h3>
                </div>
              </Tippy>
            ))}
          </div>
        </div>
      ) : null}

      {timeOption.value === 'this_month' && property.this_month ? (
        <div>
          <h3 className="mt-3 mb-1 text-16 font-medium">
            Số lượng tin trong tháng: <b>{totalProperty_thisMonth}.</b>
          </h3>
          <div className="flex items-center gap-12 my-4 ml-4 flex-wrap">
            {property.this_month.map((item, index) => (
              <Tippy
                content="Xem chi tiết"
                animation="fade"
                key={`month-${index}`}
              >
                <div
                  className={`flex flex-col items-center gap-1 min-w-[200px] px-6 py-4 rounded-sm shadow-md border-2 ${
                    item.status === 'pending'
                      ? 'border-blue-500 text-blue-500'
                      : item.status === 'approved'
                      ? 'border-green-500 text-green-500'
                      : 'border-red-500 text-red-500'
                  }`}
                >
                  <span className="text-3xl font-bold">{item.count}</span>
                  <h3 className="font-medium text-16">{item.title}</h3>
                </div>
              </Tippy>
            ))}
          </div>
        </div>
      ) : null}

      {timeOption.value === 'this_week' && property.this_week ? (
        <div>
          <h3 className="mt-3 mb-1 text-16 font-medium">
            Số lượng tin trong tuần: <b>{totalProperty_thisWeek}.</b>
          </h3>
          <div className="flex items-center gap-12 my-4 ml-4 flex-wrap">
            {property.this_week.map((item, index) => (
              <Tippy
                content="Xem chi tiết"
                animation="fade"
                key={`month-${index}`}
              >
                <div
                  className={`flex flex-col items-center gap-1 min-w-[200px] px-6 py-4 rounded-sm shadow-md border-2 ${
                    item.status === 'pending'
                      ? 'border-blue-500 text-blue-500'
                      : item.status === 'approved'
                      ? 'border-green-500 text-green-500'
                      : 'border-red-500 text-red-500'
                  }`}
                >
                  <span className="text-3xl font-bold">{item.count}</span>
                  <h3 className="font-medium text-16">{item.title}</h3>
                </div>
              </Tippy>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(PropertyOverview);
