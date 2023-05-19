import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AiOutlineLoading } from 'react-icons/ai';

const GlobalLoading = () => {
  const { isGlobalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );

  return isGlobalLoading ? (
    <div className="fixed z-50 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <AiOutlineLoading className="text-red-500 text-7xl animate-spin" />
    </div>
  ) : null;
};

export default memo(GlobalLoading);
