import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineCloudUpload, AiOutlineLoading } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import nhaDatApi from '../api/modules/nhaDat.api';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NhaDatOptions from '../components/NhaDatOptions';
import SelectLocationNhaDat from '../components/SelectLocationNhaDat';
import SelectTypeNhaDat from '../components/SelectTypeNhaDat';
import ShowImageUpload from '../components/ShowImageUpload';
import { loai_nha_dat_ban, loai_nha_dat_thue } from '../constants/Type_NhaDat';
import CustomInputWithLabel from '../custom/input/CustomInputWithLabel';
import CustomSelect from '../custom/select/CustomSelect';
import CustomTextarea from '../custom/textarea/CustomTextarea';
import { createNhaDatSchema } from '../schema/yup.schema';
import {
  ILocationNhaDat,
  INhaDat,
  IOptionsNhaDat,
  ITypeNhaDat,
} from '../types/nhaDat.types';

interface IFormAddNhaDat {
  title: string;
  description: string;
  price_unit: 'vnd' | 'per_area' | 'custom';
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  price: string | number;
  area: number | string;
}

let initialValues: IFormAddNhaDat = {
  title: '',
  description: '',
  area: '',
  price: '',
  price_unit: 'vnd',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_address: '',
};

let initTypeNhaDat = {
  id: 'init',
  label: '---Chọn loại bất động sản---',
};

let initLocation = {
  province: -1,
  district: -1,
  ward: -1,
  street: '',
};

let initOptions = {
  num_toilets: 0,
  num_bedrooms: 0,
  num_floors: 0,
  utillities: 'none',
  home_direction: 'none',
  legal: 'so_do',
};

// lấy ra type nhà đất với value và demand
function chooseTypeNhaDat(
  demand: INhaDat['demand'],
  type: INhaDat['type_nhadat']
) {
  let listNhaDat = [];

  if (demand === 'buy') {
    listNhaDat = [...loai_nha_dat_ban];
  } else {
    listNhaDat = [...loai_nha_dat_thue];
  }

  const current = listNhaDat.find((item) => item.id === type);

  return current ? current : initTypeNhaDat;
}

const UpdateNhaDat = () => {
  let [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const postId = searchParams.get('postId');

  const navigate = useNavigate();

  const [response, setResponse] = useState<INhaDat>();
  const [isLoading, setIsLoading] = useState(false);

  const [isSumitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [demandType, setDemandType] = useState<'buy' | 'lease'>('buy');
  const [typeNhaDat, setTypeNhaDat] = useState<ITypeNhaDat>(initTypeNhaDat);

  const [location, setLocation] = useState<ILocationNhaDat>(initLocation);

  const [options, setOptions] = useState<IOptionsNhaDat>(initOptions);

  const [files, setFiles] = useState<FileList | null>(null);

  // call dữ liệu với slug truyền vào
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getDetailOfUser(slug);

      if (response && response.data) {
        setResponse(response.data);
      }

      if (error) {
        setResponse(undefined);
        Swal.fire({
          title: 'Có lỗi',
          text: '1 lỗi nào đó đã xảy ra trong quá trình lấy dữ liệu',
          icon: 'error',
          showConfirmButton: true,
        });
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();

    // scrolltop
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // sữa dữ liệu khi có response
  useEffect(() => {
    if (!response) return;

    // set giá trị của form
    initialValues.contact_address = response.contact.address;
    initialValues.contact_email = response.contact.email;
    initialValues.contact_name = response.contact.name;
    initialValues.contact_phone = response.contact.phone;
    initialValues.description = response.description;
    initialValues.price = response.price;
    initialValues.title = response.title;
    initialValues.price_unit = response.price_unit;
    initialValues.area = response.area;

    // set giá trị của state
    setDemandType(response.demand);
    setTypeNhaDat(chooseTypeNhaDat(response.demand, response.type_nhadat));
  }, [response]);

  // SUBMIT HERE
  const handleSubmit = async (
    values: IFormAddNhaDat,
    actions: FormikHelpers<IFormAddNhaDat>
  ) => {
    // update thì sử dụng postId trên thanh query
    if (!postId) {
      Swal.fire({
        title: '1 lỗi nào đó đã xảy ra? Vui lòng thử lại',
        icon: 'error',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/quan-ly-tin/danh-sach-tin');
        }
      });

      return;
    }

    if (typeNhaDat.id === 'init') {
      toast.warn('Vui lòng chọn Loại bất động sản');
      return;
    }

    if (
      location.province === -1 ||
      location.district === -1 ||
      location.ward === -1 ||
      !location.street
    ) {
      toast.warn('Vui lòng chọn đủ thông tin địa chỉ');
      return;
    }

    if (files && files.length < 4) {
      toast.warn('Chọn ít nhất là 4 hình ảnh');
      return;
    }

    if (files && files.length > 10) {
      toast.warn('Chỉ đăng tối đa 10 hình ảnh');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    formData.append('demand', demandType);
    formData.append('type_nhadat', typeNhaDat.id);

    Object.entries(values).forEach((val) => {
      formData.append(val[0], val[1]);
    });
    Object.entries(options).forEach((val: any) => {
      formData.append(val[0], val[1].toString());
    });

    formData.append('province', location.province.toString());
    formData.append('district', location.district.toString());
    formData.append('ward', location.ward.toString());
    formData.append('street', location.street);

    // nếu có files thì ms đăng
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('collections', files[i]);
      }
    }

    const { response, error } = await nhaDatApi.updateOne(postId, formData);

    if (error && error.message) {
      toast.error(error.message);
      setError(error.message);
    }

    if (response) {
      Swal.fire({
        title: 'Chỉnh sữa thông tin thành công',
        icon: 'success',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/quan-ly-tin/danh-sach-tin');
        }
      });
    }
    setIsSubmitting(false);
  };

  return isLoading ? (
    <Loading />
  ) : response ? (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={createNhaDatSchema}
    >
      <Form autoComplete="off">
        {/* helmet */}
        <Helmet>
          <title>Sửa bài đăng</title>
        </Helmet>

        <div className="flex flex-col items-center justify-center gap-4 my-4 mx-3 lg:mx-0 text-14">
          {/* Thông báo lý do bị không duyệt */}
          {response.reason_refuse && (
            <div className="w-full pb-6 lg:w-7/12 lg:max-w-[1762px] bg-[rgba(255,0,0,0.2)]  rounded-md shadow-md p-4">
              <h3 className="text-xl font-medium mb-4">Lý do không duyệt:</h3>
              <p className="pl-2 text-16">{response.reason_refuse}</p>
            </div>
          )}

          {/* div - thông tin cơ bản */}
          <div className="w-full pb-8 lg:w-7/12 lg:max-w-[1762px] bg-white rounded-md shadow-md p-4">
            <h2 className="text-2xl font-medium tracking-wide mt-2 mb-4">
              Thông tin cơ bản
            </h2>

            {/* button chọn loại bán or thuê */}
            <div className="flex items-center border-2 rounded-md overflow-hidden text-16">
              <button
                type="button"
                className={`flex-1 py-1 flex items-center justify-center ${
                  demandType === 'buy'
                    ? 'bg-red-500 text-white hover:opacity-80'
                    : 'hover:bg-secondary'
                }`}
                onClick={() => setDemandType('buy')}
              >
                <span>Bán</span>
              </button>

              <button
                type="button"
                className={`flex-1 py-1 flex items-center justify-center ${
                  demandType === 'lease'
                    ? 'bg-red-500 text-white hover:opacity-80'
                    : 'hover:bg-secondary'
                }`}
                onClick={() => setDemandType('lease')}
              >
                <span>Cho thuê</span>
              </button>
            </div>

            {/* Chọn loại nhà đất */}
            <div className="mt-4">
              <label htmlFor="" className="mb-2 block font-medium">
                Loại bất động sản <span className="text-red-500">*</span>
              </label>

              <SelectTypeNhaDat
                demand_type={demandType}
                typeNhaDat={typeNhaDat}
                handleSetTypeNhaDat={setTypeNhaDat}
              />
            </div>

            {/* Chọn vị trí - address */}
            <div className="mt-4">
              <SelectLocationNhaDat
                setLocation={setLocation}
                responseFormUpdate={{
                  province: response.location.province.code,
                  district: response.location.district.code,
                  ward: response.location.ward
                    ? response.location.ward.code
                    : -1,
                  street: response.location.street || '',
                }}
              />
            </div>
          </div>

          {/* thong tin bai viet */}
          <div className="w-full pb-8 lg:w-7/12 lg:max-w-[1762px] bg-white rounded-md shadow-md p-4">
            <h2 className="text-2xl font-medium tracking-wide mt-2 mb-4">
              Thông tin bài viết
            </h2>

            <div>
              <CustomInputWithLabel
                label="Tiêu đề"
                name="title"
                id="title"
                type="text"
                placeholder="VD: Bán đất mặt tiền quận Gò Vấp 150m2"
                note="Tối thiểu 30 kí tự, tối đa 99 kí tự."
              />

              <CustomTextarea />
            </div>
          </div>

          {/* thông tin bất động sản */}
          <div className="w-full pb-8 lg:w-7/12 lg:max-w-[1762px] bg-white rounded-md shadow-md p-4">
            <h2 className="text-2xl font-medium tracking-wide mt-2 mb-4">
              Thông tin bất động sản
            </h2>

            {/* Dien tich, gia, don vi */}
            <div>
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

                {/* Custom Select */}
                <CustomSelect isLeaseType={demandType === 'lease'} />
              </div>
            </div>

            {/* options: toilet, flooer, bedroom, ... */}
            <div className="mt-4">
              <NhaDatOptions
                setOptions={setOptions}
                type_nha_dat={typeNhaDat}
                responseUpdate={{
                  bedrooms: response.num_bedrooms,
                  toilets: response.num_toilets,
                  floors: response.num_floors,
                  utils: response.utillities,
                  phapLy: response.legal,
                  homeDirection: response.home_direction,
                }}
              />
            </div>
          </div>

          {/* file upload */}
          <div className="w-full pb-8 lg:w-7/12 lg:max-w-[1762px] bg-white rounded-md shadow-md p-4">
            <h2 className="text-2xl font-medium tracking-wide mt-2 mb-1">
              Hình ảnh bất động sản
            </h2>

            <ul className="list-disc pl-8 text-[13px] text-text-secondary">
              <li>Nếu sử dụng hình ảnh cũ thì bỏ qua bước này.</li>
              <li>
                Nhưng nếu muốn thêm, xóa, ... ảnh, bạn phải upload lại toàn bộ
                ảnh.
              </li>
              <li>Đăng tối thiểu 4 ảnh.</li>
              <li>Đăng tối đa 10 ảnh.</li>
              <li>Hãy dùng ảnh thật, không trùng, không chèn SĐT.</li>
            </ul>

            {/* upload here */}
            <input
              hidden
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              id="files"
            />

            <div className="mt-4">
              <label
                htmlFor="files"
                className="py-12 flex flex-col w-full cursor-pointer items-center border rounded-md effect hover:text-red-400"
              >
                <AiOutlineCloudUpload className="text-5xl " />
                <p className="">Bấm để chọn ảnh cần tải lên</p>
              </label>
            </div>

            {files && <ShowImageUpload files={files} />}

            <ShowImageUpload avaialbes={response.collections} />
          </div>

          {/* thông tin cá nhân */}
          <div className="w-full pb-8 lg:w-7/12 lg:max-w-[1762px] bg-white rounded-md shadow-md p-4">
            <h2 className="text-2xl font-medium tracking-wide mt-2 mb-4">
              Thông tin liên hệ
            </h2>

            {/* Input form */}
            <div>
              <CustomInputWithLabel
                label="Tên hiển thị"
                id="username"
                name="contact_name"
                placeholder=""
                type="text"
              />

              <CustomInputWithLabel
                label="Email"
                id="email"
                name="contact_email"
                placeholder=""
                type="text"
              />

              <CustomInputWithLabel
                label="Địa chỉ"
                id="address"
                name="contact_address"
                placeholder=""
                type="text"
              />

              <CustomInputWithLabel
                label="Số điện thoại"
                id="phone"
                name="contact_phone"
                placeholder=""
                type="tel"
              />
            </div>
          </div>

          {/* button submit */}
          <div className="w-full pb-8 lg:w-7/12 lg:max-w-[1762px]">
            {isSumitting ? (
              <button
                type="button"
                className="btn btn-primary btn-full flex items-center justify-center"
              >
                <AiOutlineLoading className="text-xl animate-spin" />
              </button>
            ) : (
              <input
                type="submit"
                value="Cập nhật"
                className="btn btn-primary btn-full"
              />
            )}

            {error && (
              <div className="w-full">
                <p className="text-center text-red-500 mt-4">{error}</p>
              </div>
            )}
          </div>
        </div>
      </Form>
    </Formik>
  ) : (
    <>
      <div>
        <Error err="Lỗi gì đó đã xảy ra vui lòng thử lại." />
      </div>
    </>
  );
};

export default UpdateNhaDat;
