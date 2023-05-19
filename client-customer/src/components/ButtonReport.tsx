import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import FormReport from '../custom/form/FormReport';

const ButtonReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Tippy content="Báo cáo" animation="fade">
        <button
          className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.1)] cursor-pointer effect"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AiOutlineWarning className="text-2xl" />
        </button>
      </Tippy>

      {isModalOpen && (
        <div className="fixed z-20 top-0 left-0  w-screen h-screen flex items-center justify-center">
          {/* overlay */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"
          ></div>

          {/* modal */}
          <div className="bg-white p-6 w-full md:w-[650px] min-h-[350px] relative mx-4 rounded-sm shadow-md animate-show">
            <button
              className="absolute top-1 right-1 text-xl p-2 rounded-full hover:bg-overlay"
              onClick={() => setIsModalOpen(false)}
            >
              <IoMdClose />
            </button>

            <div className="mt-4">
              <h2 className="uppercase text-center font-medium text-18 text-red-500 font-roboto tracking-wide">
                Báo cáo tin
              </h2>

              <div className="my-2 pr-2 max-h-96 overflow-auto scrollbar-w-1 scrollbar-thumb-red-400 scrollbar-track-text-secondary">
                <FormReport handleCloseModal={() => setIsModalOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ButtonReport);
