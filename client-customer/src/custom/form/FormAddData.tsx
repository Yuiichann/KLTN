import { Field, Form } from 'formik';
import React from 'react';
import CustomInputWithLabel from '../input/CustomInputWithLabel';
import CustomTextarea from '../textarea/CustomTextarea';

const FormAddData = () => {
  return (
    <>
      <div className="w-full pb-8 lg:w-7/12 max-w-[1762px] bg-white rounded-md shadow-md p-4">
        <h2 className="text-2xl font-medium tracking-wide mt-2 mb-4">
          Thông tin bài viết
        </h2>

        <Form>
          <CustomInputWithLabel
            label="Tiêu đề"
            name="title"
            id="title"
            type="text"
            placeholder="VD: Bán đất mặt tiền quận Gò Vấp 150m2"
            note="Tối thiểu 30 kí tự, tối đa 99 kí tự."
          />

          <CustomTextarea />
        </Form>
      </div>

      <div className="w-full pb-8 lg:w-7/12 max-w-[1762px] bg-white rounded-md shadow-md p-4">
        <h2 className="text-2xl font-medium tracking-wide mt-2 mb-4">
          Thông tin bất động sản
        </h2>

        <Form autoComplete="off">
          <CustomInputWithLabel
            label="Diện tích"
            id="area"
            name="area"
            type="tel"
            placeholder="Nhập diện tích VD: 120"
          />

          <div className="flex items-start gap-3">
            <div className="flex-1">
              <CustomInputWithLabel
                label="Mức giá"
                id="price"
                name="price"
                type="tel"
                placeholder="VD: 120000000"
              />
            </div>

            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="" className="font-medium">
                Đơn vị
              </label>

              <div>
                <Field
                  as="select"
                  name="price_unit"
                  className="w-48 p-2 h-[38.6px] border rounded-md outline-none"
                >
                  <option value="vnd">VNĐ</option>
                  <option value="per_area">Giá / m2</option>
                  <option value="custom">Thỏa thuận</option>
                </Field>
              </div>
            </div>
          </div>
          <input type="submit" value="sdfasdf" />
        </Form>
      </div>
    </>
  );
};

export default React.memo(FormAddData);
