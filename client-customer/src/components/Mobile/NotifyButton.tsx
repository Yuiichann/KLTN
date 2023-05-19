import Tippy from '@tippyjs/react';
import React from 'react';
import { AiFillBell } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NotifyButton = () => {
  return (
    <Tippy content="Thông báo" animation="fade">
      <Link to="/trang-ca-nhan/thong-bao" className="block btn-icon">
        <AiFillBell className="text-xl" />
      </Link>
    </Tippy>
  );
};

export default React.memo(NotifyButton);
