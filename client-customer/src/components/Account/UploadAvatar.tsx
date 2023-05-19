import React, { useCallback, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import userApi from '../../api/modules/user.api';
import { setAvatar } from '../../redux/features/user.slice';
import { AppDispath } from '../../redux/store';
import ImageLazyLoading from '../ImageLazyLoading';

const UploadAvatar = () => {
  const dispatch = useDispatch<AppDispath>();
  const [file, setFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];

      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp') {
        toast.error('File không hợp lệ');
      } else {
        setFile(file);
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    if (files && files.length === 1) {
      const file = files[0];

      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp') {
        toast.error('File không hợp lệ');
      } else {
        setFile(file);
      }
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // xử lý đăng avatar
  const handleSetAvatar = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();

    formData.append('avatar', file);

    const { response, error } = await userApi.updateAvatar(formData);

    if (error) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: error.message,
      });

      setIsLoading(false);
    }

    if (response) {
      Swal.fire({
        title: 'Thành công',
        icon: 'success',
        text: 'Thay đổi avatar thành công!',
      });

      // set avatar mới lun
      dispatch(setAvatar(response.data));

      setIsLoading(false);
      setFile(undefined);
    }
  }, [file]);

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`text-14 flex flex-col justify-center items-center ${
          isDragging ? 'border-4 border-dashed border-red-300' : ''
        }`}
      >
        <label htmlFor="btn_upload" className="flex flex-col cursor-pointer justify-center items-center gap-1 p-8">
          <AiOutlineCloudUpload className="text-6xl" />
          <span>Click vào đây hoặc kéo file vào đây để tải lên</span>
        </label>

        {file && (
          <div className="flex flex-col items-center justify-center gap-2">
            <div>
              <ImageLazyLoading src={URL.createObjectURL(file)} alt="Preview Avatar" className="w-28 h-28 rounded-full" />
            </div>
            <p>{file.name}</p>
            <button
              onClick={handleSetAvatar}
              className="cursor-pointer bg-account-page-main px-6 rounded-sm py-2 text-14 text-white uppercase hover:bg-opacity-70 disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý. . .' : 'Tải lên'}
            </button>
          </div>
        )}
      </div>

      <input type="file" hidden id="btn_upload" onChange={handleSetFile} />
    </>
  );
};

export default React.memo(UploadAvatar);
