import { Field } from 'formik';
import React from 'react';

interface Props {
  isLeaseType: boolean; // có phải là cho thuê không
}

const CustomSelect = ({ isLeaseType }: Props) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor="" className="font-medium">
        Đơn vị
      </label>

      <div>
        <Field
          as="select"
          name="price_unit"
          className="w-32 lg:w-48 p-2 h-[38.6px] border rounded-md outline-none"
          disabled={isLeaseType}
        >
          {isLeaseType ? (
            <option value="vnd">VNĐ/Tháng</option>
          ) : (
            <>
              {' '}
              <option value="vnd">VNĐ</option>
              <option value="per_area">Giá / m2</option>
              <option value="custom">Thỏa thuận</option>
            </>
          )}
        </Field>
      </div>
    </div>
  );
};

export default React.memo(CustomSelect);
