import { memo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import FormSignUp from '../../custom/form/FormSignUp';

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
}

const SignUpModal = (props: Props) => {
  const { isModalOpen, handleCloseModal, handleOpenModal, handleSwitchModal } =
    props;

  return (
    <>
      <button
        className="btn tracking-wide font-medium"
        onClick={handleOpenModal}
      >
        Đăng ký
      </button>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="relative overflow-y-auto overflow-x-hidden max-h-[calc(100vh-50px)] scrollbar scrollbar-w-1 scrollbar-thumb-red-400 scrollbar-track-text-tertiary">
          <div className="py-6 px-4 w-[370px] lg:px-6 lg:w-[450px]">
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
                Đăng ký tài khoản mới
              </h4>
            </div>

            {/* Form */}
            <FormSignUp handleCloseModal={handleCloseModal} />

            {/* quy chet */}
            <p className="mt-3 text-12 text-text-tertiary text-center">
              Bằng việc tiếp tục, bạn đồng ý với
              <a href="/#" className="pl-1 text-red-400">
                Điều khoản sử dụng
              </a>
              ,
              <a href="/#" className="pl-1 text-red-400">
                Chính sách bảo mật
              </a>
              ,
              <a href="/#" className="pl-1 text-red-400">
                Quy chế
              </a>
              ,
              <a href="/#" className="pl-1 text-red-400">
                Chính sách của chúng tôi
              </a>
              .
            </p>

            <p className="mt-3 text-14 text-center">
              Bạn đã có tài khoản?
              <button className="ml-1 text-red-500" onClick={handleSwitchModal}>
                Đăng nhập
              </button>
            </p>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default memo(SignUpModal);
