import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalForgetPassword, toggleModalSignIn, toggleModalSignUp } from '../redux/features/modalStatus.slice';
import { AppDispath, RootState } from '../redux/store';
import ForgetPasswordModal from './Modal/ForgetPasswordModal';
import SignInModal from './Modal/SignInModal';
import SignUpModal from './Modal/SignUpModal';

interface Props {
  isMobileVersion?: boolean;
}

const AuthButtonsGroup = ({ isMobileVersion }: Props) => {
  const { isModalForgetPassowordOpen, isModalSignInOpen, isModalSignUpOpen } = useSelector(
    (state: RootState) => state.modalStatus
  );
  const dispatch = useDispatch<AppDispath>();

  // const [isFormSignInOpen, setIsFormSigInOpen] = useState(false);
  // const [isFormSignUpOpen, setIsFormSignUpOpen] = useState(false);
  // const [isFormForgetPwdOpen, setIsFormForgetPwdOpen] = useState(false);

  const handleOpenFormSignIn = useCallback(() => {
    // setIsFormSigInOpen(true);
    dispatch(toggleModalSignIn(true));
  }, []);

  const handleCloseFormSigIn = useCallback(() => {
    // setIsFormSigInOpen(false);
    dispatch(toggleModalSignIn(false));
  }, []);

  const handleOpenFormSignUp = useCallback(() => {
    // setIsFormSignUpOpen(true);
    dispatch(toggleModalSignUp(true));
  }, []);

  const handleCloseFormSignUp = useCallback(() => {
    // setIsFormSignUpOpen(false);
    dispatch(toggleModalSignUp(false));
  }, []);

  const handleSwithToForgetPwd = useCallback(() => {
    if (!isModalSignInOpen && !isModalForgetPassowordOpen) return;

    if (isModalSignInOpen) {
      // setIsFormSigInOpen(false);
      // setIsFormForgetPwdOpen(true);

      dispatch(toggleModalSignIn(false));
      dispatch(toggleModalForgetPassword(true));
    } else {
      // setIsFormSigInOpen(true);
      // setIsFormForgetPwdOpen(false);

      dispatch(toggleModalSignIn(true));
      dispatch(toggleModalForgetPassword(false));
    }
  }, [isModalSignInOpen, isModalForgetPassowordOpen]);

  const handleCloseFormForgetPwd = useCallback(() => {
    // setIsFormForgetPwdOpen(false);
    dispatch(toggleModalForgetPassword(false));
  }, []);

  // tắt form này và mở form kia
  const handleSwitchModal = () => {
    if (!isModalSignInOpen && !isModalSignUpOpen) return;

    if (isModalSignInOpen) {
      // setIsFormSigInOpen(false);
      // setIsFormSignUpOpen(true);

      dispatch(toggleModalSignIn(false));
      dispatch(toggleModalSignUp(true));
    } else {
      // setIsFormSigInOpen(true);
      // setIsFormSignUpOpen(false);

      dispatch(toggleModalSignIn(true));
      dispatch(toggleModalSignUp(false));
    }
  };

  return (
    <>
      {/* button SignIn & Modal SignIn */}
      <SignInModal
        isModalOpen={isModalSignInOpen}
        handleOpenModal={handleOpenFormSignIn}
        handleCloseModal={handleCloseFormSigIn}
        handleSwitchModal={handleSwitchModal}
        handleSwithToForgetPwd={handleSwithToForgetPwd}
      />

      {!isMobileVersion && <div className="h-[24px] w-[1px] bg-secondary"></div>}

      <SignUpModal
        isModalOpen={isModalSignUpOpen}
        handleOpenModal={handleOpenFormSignUp}
        handleCloseModal={handleCloseFormSignUp}
        handleSwitchModal={handleSwitchModal}
      />

      <ForgetPasswordModal
        isModalOpen={isModalForgetPassowordOpen}
        handleCloseModal={handleCloseFormForgetPwd}
        handleSwithToForgetPwd={handleSwithToForgetPwd}
      />
    </>
  );
};

export default memo(AuthButtonsGroup);
