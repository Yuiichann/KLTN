import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';

interface Props {
  currentPage: number;
  pageCount: number;
  onPageChange: (numPage: number) => void;
}

const Pagination = ({ currentPage, pageCount, onPageChange }: Props) => {
  const visiblePages = 4;

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(pageCount, currentPage + Math.floor(visiblePages / 2));

  if (endPage - startPage < visiblePages) {
    if (startPage === 1) {
      endPage = Math.min(pageCount, visiblePages);
    } else {
      startPage = Math.max(1, pageCount - visiblePages + 1);
    }
  }

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="my-6 flex items-center gap-4 md:gap-6 justify-center select-none">
      {/* button group prev */}
      <div className="flex items-center gap-2 md:gap-4 text-xl">
        <Tippy content="Về trang đầu" animation="fade">
          <button
            className="font-bold border w-8 h-8 flex items-center justify-center hover:bg-primary disabled:opacity-50 disabled:hover:bg-white"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <RxDoubleArrowLeft />
          </button>
        </Tippy>

        <Tippy content="Prev" animation="fade">
          <button
            className="font-bold border w-8 h-8 flex items-center justify-center hover:bg-primary disabled:opacity-50 disabled:hover:bg-white"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </button>
        </Tippy>
      </div>

      {/* page number */}
      <ul className="flex gap-1 md:gap-4 items-center">
        {pageNumbers.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer w-8 h-8 flex items-center justify-center border hover:bg-primary hover:text-white effect ${
              currentPage === page ? 'text-red-500 font-bold' : ''
            }`}
          >
            <span>{page}</span>
          </li>
        ))}
      </ul>

      {/* button group next */}
      <div className="flex items-center gap-2 md:gap-4 text-xl">
        <Tippy content="Next" animation="fade">
          <button
            className="font-bold border w-8 h-8 flex items-center justify-center hover:bg-primary disabled:opacity-50 disabled:hover:bg-white"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <GrFormNext />
          </button>
        </Tippy>

        <Tippy content="Đến cuối trang" animation="fade">
          <button
            className="font-bold border w-8 h-8 flex items-center justify-center hover:bg-primary disabled:opacity-50 disabled:hover:bg-white"
            onClick={() => onPageChange(pageCount)}
            disabled={currentPage === pageCount}
          >
            <RxDoubleArrowRight />
          </button>
        </Tippy>
      </div>
    </nav>
  );
};

export default memo(Pagination);
