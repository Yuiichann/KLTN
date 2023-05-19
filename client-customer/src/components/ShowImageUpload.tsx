import React from 'react';
import ImageLazyLoading from './ImageLazyLoading';

interface Props {
  files?: FileList;
  avaialbes?: string[];
}

function createFilesUrl(files: FileList) {
  let arr = [];
  for (let i = 0; i < files.length; i++) {
    arr.push(URL.createObjectURL(files[i]));
  }

  return arr;
}

const ShowImageUpload = ({ files, avaialbes }: Props) => {
  let filesUrl: string[] = [];

  if (files) {
    filesUrl = createFilesUrl(files);
  } else {
    if (avaialbes) {
      filesUrl = avaialbes;
    }
  }

  return (
    <>
      <h2 className="text-xl mt-8 mb-2">
        {avaialbes
          ? 'Hình ảnh hiện thị trên bảng tin'
          : 'Preview hình ảnh đang được chọn'}
      </h2>

      <div className="flex flex-col mb-2 gap-4 h-[500px] border overflow-y-auto p-4 scrollbar-w-2 scrollbar-thumb-rounded-md scrollbar-thumb-text-tertiary">
        {filesUrl.map((item) => (
          <div key={item}>
            {avaialbes ? (
              <ImageLazyLoading src={item} alt="preview" />
            ) : (
              <img src={item} alt="preview" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(ShowImageUpload);
