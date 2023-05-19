import { memo } from 'react';
import { ReactComponent as EmptyLogo } from '../assets/img/listing-empty.svg';

interface Props {
  err: string;
}

const Error = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 mt-12 items-center justify-center py-12 rounded-sm bg-white">
      <EmptyLogo />

      <p className="text-center">{props.err}</p>
    </div>
  );
};

export default memo(Error);
