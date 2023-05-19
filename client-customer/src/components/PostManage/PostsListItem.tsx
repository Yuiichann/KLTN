import Tippy from '@tippyjs/react';
import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import nhaDatApi from '../../api/modules/nhaDat.api';
import { INhaDat } from '../../types/nhaDat.types';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';
import getTypeNhaDatLabel from '../../utils/getTypeNhaDatLabel';
import ImageLazyLoading from '../ImageLazyLoading';

interface Props {
  post: INhaDat;
  handleReload: VoidFunction;
}

const PostsListItem = ({ post, handleReload }: Props) => {
  const handleClickDeletePost = () => {
    Swal.fire({
      title: 'Cảnh báo',
      icon: 'warning',
      html: `
        Bạn có chắc chắn muốn xóa bài đăng với tiêu đề: <br/>
        <b>${post.title}</b>
      `,
      showConfirmButton: true,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa ngay là luôn',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { response, error } = await nhaDatApi.deleteOne(
          post.id || post._id
        );

        if (error && error.message) {
          Swal.fire({
            title: `Lỗi`,
            text: `${error.message}`,
            icon: 'error',
          });
        }

        if (response) {
          Swal.fire({
            title: `Xóa thành công`,
            icon: 'success',
          });

          // reload lại component cha
          handleReload();
        }
      }
    });
  };

  return (
    <div className="p-4 bg-white  rounded-md shadow-md ">
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* image preview */}
        <div className="self-center lg:self-auto">
          <ImageLazyLoading
            src={post.collections[0]}
            alt={post.slug}
            className="w-[170px] h-[130px] object-cover rounded-md shadow-md"
          />
        </div>

        {/* info */}
        <div className="flex-1">
          {/* tên bài dăng, loại đất, địa chỉ */}
          <div className="text-16">
            {/* title */}
            {post.status === 'approved' ? (
              <Link
                to={`/chi-tiet/${post.slug}`}
                target="_blank"
                className="font-medium line-clamp-2 lg:line-clamp-1 font-lexend"
              >
                {post.title}
              </Link>
            ) : (
              <Tippy
                content="Tin chưa được hiển thị trên website"
                animation="fade"
              >
                <h1 className="font-medium line-clamp-2 lg:line-clamp-1 cursor-default">
                  {post.title}
                </h1>
              </Tippy>
            )}

            {/* desc */}
            <div className="text-text-secondary text-14 flex items-center gap-1 flex-wrap">
              <span>{post.demand === 'buy' ? 'Bán' : 'Cho thuê'}</span>
              <span>{getTypeNhaDatLabel(post.type_nhadat)}</span>
              <span>-</span>
              <span>{post.location.district.name},</span>
              <span> {post.location.province.name}</span>
            </div>
          </div>

          {/* trạng thái, mã tin */}
          <div className="flex gap-4 mt-3 flex-wrap lg:gap-8 lg:flex-nowrap">
            {/* Trạng thái */}
            <div className="flex flex-col gap-1 text-white text-12 cursor-default">
              <span className="text-text-tertiary text-14">Trạng thái</span>
              {post.status === 'pending' ? (
                <span className="block px-2 min-w-[85px] text-center py-1 bg-yellow-500 border border-yellow-500 rounded-sm">
                  Chờ duyệt
                </span>
              ) : post.status === 'approved' ? (
                <span className="block px-2 min-w-[85px] text-center py-1 bg-green-500 border border-green-500 rounded-sm">
                  Đã duyệt
                </span>
              ) : post.status === 'refuse' ? (
                <span className="block px-2 min-w-[85px] text-center py-1 bg-red-600 border border-red-600 rounded-sm">
                  Không duyệt
                </span>
              ) : (
                <span className="block px-2 min-w-[85px] text-center py-1 bg-red-600 border border-red-600 rounded-sm">
                  Báo xấu
                </span>
              )}
            </div>

            {/* mã tin */}
            <div className="flex flex-col gap-1 text-12">
              <span className="text-text-tertiary text-14">Mã tin</span>
              <span className="py-1">{post.id || post._id}</span>
            </div>

            {/* ngày đăng */}
            <div className="flex flex-col gap-1 text-12">
              <span className="text-text-tertiary text-14">Ngày đăng</span>
              <span className="py-1">{formatTimeUTC7(post.createdAt)}</span>
            </div>
          </div>

          {/* button groups */}
          <div className="flex mt-8 items-center gap-4 text-14">
            <div>
              <Link
                to={`/quan-ly-tin/sua-tin?slug=${post.slug}&postId=${post.id}`}
                className="flex items-center gap-2 px-6 py-1 text-account-page-main w-fit border rounded-md border-account-page-main hover:bg-green-100 effect"
              >
                <MdEdit />
                <span>Sửa tin</span>
              </Link>
            </div>

            <div>
              <button
                onClick={handleClickDeletePost}
                className="flex items-center gap-2 py-1 px-4 border border-red-500 rounded-md text-red-500 hover:bg-red-200 effect"
              >
                <HiOutlineTrash />
                <span>Xóa tin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostsListItem);
