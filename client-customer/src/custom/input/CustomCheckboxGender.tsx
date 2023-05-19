import { Field } from 'formik';
import { memo } from 'react';

const CustomCheckboxGender = () => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <h6>Giới tính</h6>
      <div className="flex items-center gap-4 ml-3 text-text-secondary">
        <div className="flex items-center gap-1">
          <Field type="radio" name="gender" value="male" id="male" />
          <label htmlFor="male">Nam</label>
        </div>

        <div className="flex items-center gap-1">
          <Field type="radio" name="gender" value="female" id="female" />
          <label htmlFor="female">Nữ</label>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomCheckboxGender);
