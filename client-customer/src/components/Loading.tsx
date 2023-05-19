import { memo } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className="w-full h-[calc(100vh-96px)] flex items-center justify-center">
      <div>
        <AiOutlineLoading3Quarters className="text-5xl animate-spin text-red-500" />
      </div>
    </div>
  );
};

export default memo(Loading);
