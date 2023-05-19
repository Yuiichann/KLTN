import { memo, useState } from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import FormSignIn from '../../custom/form/FormSignIn';

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
  handleOpenModal: VoidFunction;
  handleCloseModal: VoidFunction;
  handleSwitchModal: VoidFunction;
  handleSwithToForgetPwd: VoidFunction;
}

const SignInModal = (props: Props) => {
  const {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    handleSwitchModal,
    handleSwithToForgetPwd,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSetLoadingModal = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <>
      <button
        className="btn tracking-wide font-medium relave"
        onClick={handleOpenModal}
      >
        Đăng nhập
      </button>

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
              <p className="text-text-secondary text-18 font-medium tracking-wide mb-2">
                Xin chào bạn
              </p>
              <h4 className="text-2xl md:text-3xl text-text-primary font-semibold tracking-wide mb-6">
                Đăng nhập để tiếp tục
              </h4>
            </div>

            {/* Form */}
            <FormSignIn
              handleCloseModal={handleCloseModal}
              handleSetLoadingModal={handleSetLoadingModal}
            />

            {/* Quen mat khau */}
            <div className="mt-2 flex justify-end">
              <button
                className="block text-14 text-red-500 hover:opacity-70"
                onClick={handleSwithToForgetPwd}
              >
                Quên mật khẩu ?
              </button>
            </div>

            <p className="mt-4 text-14">
              Chưa có tài khoản?
              <button onClick={handleSwitchModal} className="ml-1 text-red-500">
                Đăng ký
              </button>
            </p>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default memo(SignInModal);
