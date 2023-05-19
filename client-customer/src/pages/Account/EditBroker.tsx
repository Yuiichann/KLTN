import { useCallback, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import brokerApi from '../../api/modules/broker.api';
import ChooseBrokerField from '../../components/Account/ChooseBrokerField';
import Loading from '../../components/Loading';
import { setIsBroker } from '../../redux/features/user.slice';
import { AppDispath } from '../../redux/store';
import { ICreateBroker, IFieldBroker } from '../../types/broker.types';
import formatFieldsResponse from '../../utils/formatFieldsResponse.utils';

const EditBroker = () => {
  const dispatch = useDispatch<AppDispath>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [introduce, setIntroduce] = useState<string>('');
  const [fields, setFields] = useState<IFieldBroker[]>([]);

  // add new Field
  const handleAddNewField = useCallback(() => {
    if (fields.length === 3) {
      return;
    }

    setFields([
      ...fields,
      {
        field: { value: '', label: 'Loại bất động sản' },
        province: {
          code: -1,
          name: 'Tỉnh/Thành phố',
          districts: [],
        },
        district: {
          code: -1,
          name: 'Quận/Huyện',
          wards: [],
        },
      },
    ]);
  }, [fields]);

  // Upload môi giới
  const handleUpdateBroker = useCallback(async () => {
    if (fields.length === 0) {
      toast.error('Bạn chưa chọn lĩnh vực môi giới');
      return;
    }

    // check dieu kien
    if (introduce === '') {
      toast.error('Bạn phải điền thông tin giới thiệu');
      return;
    } else {
      if (introduce.length < 30) {
        toast.error('Giới thiệu phải có độ dài ít nhất 30');
        return;
      }
      if (introduce.length > 5000) {
        toast.error('Giới thiệu phải có độ dài nhiều nhất 5000');
        return;
      }
    }

    // nếu chưa điền đầy đủ dữ liệu thì éo được đi
    const checkEmptyField = fields.filter(
      (item) =>
        item.field.value === '' ||
        item.province.code === -1 ||
        item.district.code === -1
    );

    if (checkEmptyField.length > 0) {
      toast.error('Bạn phải điền đủ thông tin cho từng lĩnh vực');
      return;
    }

    setIsSubmitting(true);

    // tạo field để gửi lên server
    const bodyFields: ICreateBroker['fields'] = fields.map((item) => {
      return {
        field_code: item.field.value,
        province: item.province.code,
        district: item.district.code,
      };
    });

    // gọi api ở đây
    const { response, error } = await brokerApi.update({
      introduce,
      fields: bodyFields,
    });

    if (error) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: `${
          error.status === 422
            ? 'Các lĩnh vực không được trùng nhau'
            : error.message
        }`,
      });
    }

    if (response) {
      Swal.fire({
        title: 'Thành công',
        icon: 'success',
        text: 'Chỉnh sửa thông tin môi giới thành công!',
      });
    }

    setIsSubmitting(false);

    // Thực hiện đăng ký ở đây nè bro
  }, [fields, introduce]);

  //   xóa thông tin broker
  const handleDeleteBroker = useCallback(async () => {
    const { response, error } = await brokerApi.delete();

    if (error) {
      toast.error(error);
    }

    if (response) {
      toast.success('Xóa thông tin môi giới thành công!');
      navigate('/trang-ca-nhan/dang-ki-moi-gioi', { replace: true });
      dispatch(setIsBroker(false));
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await brokerApi.getDetailByUser();

      if (error) {
        toast.error(error.message);
      }

      //   exceplt lỗi không thể format fields
      if (response && response.data) {
        setIntroduce(response.data.introduce);

        try {
          const formatField = formatFieldsResponse(response.data.fields);
          setFields(formatField as any);
        } catch (error: any) {
          toast.error(error);
          setFields([]);
        }

        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <div className="pb-8 border-b-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h3 className="uppercase font-roboto pl-3 py-2 text-white font-medium text-14 bg-account-page-main">
            Sửa thông tin môi giới
          </h3>

          <div className="my-4 px-4 text-14">
            {/* introduce */}
            <div className="flex flex-col gap-1">
              <label htmlFor="introduce" className="font-medium">
                Giới thiệu bản thân
              </label>
              <textarea
                id="introduce"
                rows={7}
                className="outline-none border border-text-secondary rounded-sm p-2"
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
              ></textarea>
              <span
                className={`text-12 ${
                  introduce.length > 5000
                    ? 'text-red-500'
                    : 'text-text-tertiary'
                }`}
              >
                {introduce.length}/5000
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <label htmlFor="" className="font-medium mb-2">
                Lĩnh vực môi giới
              </label>

              <div className="mt-4">
                {fields.length > 0 &&
                  fields.map((field, index) => (
                    <ChooseBrokerField
                      key={index}
                      field={field}
                      index={index}
                      setFields={setFields}
                    />
                  ))}
              </div>

              {/* button new field - max 3 */}
              {fields.length < 3 && (
                <div className="flex items-center justify-start text-white">
                  <button
                    onClick={handleAddNewField}
                    className="flex items-center gap-2 rounded-sm bg-account-page-main px-4 py-1"
                  >
                    <IoMdAdd className="text-white" />
                    <span>Thêm lĩnh vực môi giới</span>
                  </button>
                </div>
              )}

              {/* button complête */}
              {fields.length > 0 && (
                <div className="flex items-center justify-center text-white mt-6">
                  <button
                    onClick={handleUpdateBroker}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-sm bg-account-page-main px-4 py-1 hover:bg-opacity-80 effect disabled:opacity-70"
                  >
                    <IoMdAdd className="text-white" />
                    <span>{isSubmitting ? 'Đang xử lý...' : 'Cập nhật'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Xoá môi giới */}
          <h3 className="uppercase font-roboto pl-3 py-2 text-white font-medium text-14 bg-account-page-main">
            Xóa thông tin môi giới
          </h3>

          <div className="mt-4 ml-4 flex justify-center md:justify-start">
            <button
              onClick={handleDeleteBroker}
              disabled={isSubmitting}
              className="rounded-sm bg-red-500 px-8 text-white py-1 hover:bg-opacity-80 effect disabled:opacity-70"
            >
              Xóa thông tin môi giới
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditBroker;
