import { memo, useCallback, useState } from 'react';
import ForgetPasswordModal from './Modal/ForgetPasswordModal';
import SignInModal from './Modal/SignInModal';
import SignUpModal from './Modal/SignUpModal';

interface Props {
  isMobileVersion?: boolean;
}

const AuthButtonsGroup = ({ isMobileVersion }: Props) => {
  const [isFormSignInOpen, setIsFormSigInOpen] = useState(false);
  const [isFormSignUpOpen, setIsFormSignUpOpen] = useState(false);
  const [isFormForgetPwdOpen, setIsFormForgetPwdOpen] = useState(false);

  const handleOpenFormSignIn = useCallback(() => {
    setIsFormSigInOpen(true);
  }, []);

  const handleCloseFormSigIn = useCallback(() => {
    setIsFormSigInOpen(false);
  }, []);

  const handleOpenFormSignUp = useCallback(() => {
    setIsFormSignUpOpen(true);
  }, []);

  const handleCloseFormSignUp = useCallback(() => {
    setIsFormSignUpOpen(false);
  }, []);

  const handleSwithToForgetPwd = useCallback(() => {
    if (!isFormSignInOpen && !isFormForgetPwdOpen) return;

    if (isFormSignInOpen) {
      setIsFormSigInOpen(false);
      setIsFormForgetPwdOpen(true);
    } else {
      setIsFormSigInOpen(true);
      setIsFormForgetPwdOpen(false);
    }
  }, [isFormSignInOpen, isFormForgetPwdOpen]);

  const handleCloseFormForgetPwd = useCallback(() => {
    setIsFormForgetPwdOpen(false);
  }, []);

  // tắt form này và mở form kia
  const handleSwitchModal = () => {
    if (!isFormSignInOpen && !isFormSignUpOpen) return;

    if (isFormSignInOpen) {
      setIsFormSigInOpen(false);
      setIsFormSignUpOpen(true);
    } else {
      setIsFormSigInOpen(true);
      setIsFormSignUpOpen(false);
    }
  };

  return (
    <>
      {/* button SignIn & Modal SignIn */}
      <SignInModal
        isModalOpen={isFormSignInOpen}
        handleOpenModal={handleOpenFormSignIn}
        handleCloseModal={handleCloseFormSigIn}
        handleSwitchModal={handleSwitchModal}
        handleSwithToForgetPwd={handleSwithToForgetPwd}
      />

      {!isMobileVersion && <div className="h-[24px] w-[1px] bg-secondary"></div>}

      <SignUpModal
        isModalOpen={isFormSignUpOpen}
        handleOpenModal={handleOpenFormSignUp}
        handleCloseModal={handleCloseFormSignUp}
        handleSwitchModal={handleSwitchModal}
      />

      <ForgetPasswordModal
        isModalOpen={isFormForgetPwdOpen}
        handleCloseModal={handleCloseFormForgetPwd}
        handleSwithToForgetPwd={handleSwithToForgetPwd}
      />
    </>
  );
};

export default memo(AuthButtonsGroup);
