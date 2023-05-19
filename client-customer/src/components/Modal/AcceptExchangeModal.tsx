import { memo, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import exchangeApi from '../../api/modules/exchange.api';
import { RootState } from '../../redux/store';
import { IExchange } from '../../types/exchange.types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
};

interface Props {
  exchange: IExchange;
}

const AcceptExchangeModal = ({ exchange }: Props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    if (user?.locked.status) {
      toast.error('Không thể thực hiện vì tài khoản của bạn đã bị khóa!');
      return;
    }

    setIsModalOpen(true);
  };

  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };

  const handleAcceptExchange = async () => {
    if (!file) {
      toast.error('Bạn phải thêm bảng hợp đồng');
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error('Bạn chỉ được upload file PDF');
      return;
    }

    if (!exchange.property) {
      toast.error(
        'Có lỗi với tin nhà đất bạn đang giao dịch. Vui lòng thử lại'
      );
      return;
    }

    if (user?.locked.status) {
      toast.error('Không thể thực hiện vì tài khoản của bạn đã bị khóa!');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append('contract_pdf', file);
    formData.append('contract_type', exchange.property.demand);

    const { response, error } = await exchangeApi.acceptExchange(
      exchange.id,
      formData
    );

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    if (response) {
      toast.success('Đã hoàn thành giao dịch');
      setIsLoading(false);
      handleCloseModal();
      navigate('/quan-ly-giao-dich/yeu-cau', { replace: true });
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-1 bg-green-500 border border-green-500 rounded-sm hover:bg-opacity-80 text-white"
      >
        Xác nhận GD
      </button>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="w-[350px] md:w-[450px]">
          <div className="p-4">
            <h2 className="font-medium tracking-wide text-xl text-center uppercase">
              Bước cuối cùng
            </h2>

            <p className="text-14 text-text-secondary my-2">
              Bạn phải upload file pdf có chưa bản hợp đồng mua bán / cho thuê
              lên Batdongsanvn.fun để hoàn thành bước cuối cùng cùng
            </p>

            <div className="pt-4 flex items-center gap-2">
              <label
                htmlFor="file_contract"
                className="inline-block px-8 py-1 border rounded-sm hover:bg-overlay effect"
              >
                Chọn file
              </label>

              <input
                type="file"
                id="file_contract"
                hidden
                onChange={handleSetFile}
              />

              {file && <span>{file.name}</span>}
            </div>
            <p className="text-red-500 text-14 mt-1 mb-6">
              (*) Chỉ nhận file PDF
            </p>

            {isLoading ? (
              <button className="px-4 py-1 bg-red-500 text-white w-full disabled:bg-text-tertiary flex items-center justify-center">
                <AiOutlineLoading className="text-xl animate-spin" />
              </button>
            ) : (
              <button
                onClick={handleAcceptExchange}
                className="px-4 py-1 bg-red-500 text-white w-full disabled:bg-text-tertiary"
                disabled={file && file.type !== 'application/pdf'}
              >
                Hoàn thành GD
              </button>
            )}
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default memo(AcceptExchangeModal);
