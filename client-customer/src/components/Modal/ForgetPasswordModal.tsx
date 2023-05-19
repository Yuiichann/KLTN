import { memo, useState } from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import ReactModal from 'react-modal';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import FormForgetPassword from '../../custom/form/FormForgetPassword';

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
  isModalOpen: boolean;
  handleCloseModal: VoidFunction;
  handleSwithToForgetPwd: VoidFunction;
}

const ForgetPasswordModal = (props: Props) => {
  const { isModalOpen, handleCloseModal, handleSwithToForgetPwd } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSetLoadingModal = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="relative">
        <div className="py-6 px-4 sm:px-6 lg:px-8 w-[370px] md:w-[450px]">
          {/* Loading when submit */}
          {isLoading && (
            <div className="absolute z-10 inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
              <AiOutlineLoading3Quarters className="text-4xl text-white animate-spin" />
            </div>
          )}

          {/* Logo */}
          <div className="absolute top-0 left-4">
            <Logo className="w-32 h-[64px]" />
          </div>

          {/* button close */}
          <div
            className="absolute top-3 right-3 btn-icon"
            onClick={handleCloseModal}
          >
            <AiOutlineClose className="text-2xl" />
          </div>

          {/* Title */}
          <div className="mt-14">
            <button
              className="text-text-secondary text-14 mb-2 flex items-center gap-1"
              onClick={handleSwithToForgetPwd}
            >
              <HiOutlineArrowSmLeft />
              <span> Quay lại</span>
            </button>

            <p className="text-text-secondary text-xl font-medium tracking-wide mb-4">
              Quên mật khẩu
            </p>
          </div>

          <FormForgetPassword
            handleSetLoadingModal={handleSetLoadingModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default memo(ForgetPasswordModal);
