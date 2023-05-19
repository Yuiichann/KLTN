import React from 'react';
import { FaUser } from 'react-icons/fa';

interface Props {
  character: string;
  className?: string;
  userIcon?: boolean;
}

const NoneAvatar = ({ character, className, userIcon }: Props) => {
  return (
    <div
      className={`w-10 h-10 rounded-full shadow-sm bg-[#FFECEB] flex items-center justify-center ${
        className ? className : ''
      }`}
    >
      {userIcon ? (
        <FaUser className="text-5xl" />
      ) : (
        <span className="uppercase text-[#74150F] text-xl font-bold">
          {character}
        </span>
      )}
    </div>
  );
};

export default React.memo(NoneAvatar);
