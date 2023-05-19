import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import reportApi from '../../api/modules/report.api';
import { IReport } from '../../types/report.type';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';

interface Props {
  report: IReport;
}

const ReportListItem = ({ report }: Props) => {
  const handleReplyReport = (status: 'confirmed' | 'refuse') => {
    Swal.fire({
      icon: 'info',
      title: 'Xác nhận',
      text: `Nhập tin nhắn ${
        status === 'confirmed' ? 'xác nhận' : 'từ chối'
      } cho người báo cáo`,
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      preConfirm: (value: string) => {
        if (value.length === 0) {
          Swal.showValidationMessage('Bạn phải nhập tin nhắn');
        }

        if (value.length < 30) {
          Swal.showValidationMessage('Tin nhắn ít nhất phải có 30 kí tự');
        }

        return value;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { response, error } = await reportApi.replyReport(report.id, {
          status,
          reply_message: result.value as string,
        });

        if (error) {
          alert(error.message);
        }

        if (response) {
          Swal.fire({
            title: 'Thành công',
            icon: 'success',
            text: 'Thông báo của bạn đã được gửi về email người báo cáo!',
          });
        }
      }
    });
  };

  return (
    <div className="p-4 bg-white rounded-sm shadow-md">
      {/* left */}
      <div className="">
        <div className="flex items-center gap-2 justify-between mb-12">
          {/* Link bai viet */}
          <div className="flex items-center gap-3 mb-1">
            <b>Bài viết báo cáo:</b>
            <Link
              to={`/quan-ly-bat-dong-san/chi-tiet-bds/${report.post_slug}`}
              className="underline"
            >
              LINK
            </Link>
          </div>

          {/* right */}
          {report.status === 'confirmed' ? (
            <div className="px-4">
              <p className="text-center text-green-500 text-xl font-medium">
                Đã xử lý
              </p>
            </div>
          ) : report.status === 'refuse' ? (
            <div>
              <p className="text-center text-red-500 text-xl font-medium">
                Đã từ chối
              </p>
            </div>
          ) : (
            <div className="w-[150px] flex flex-col gap-3">
              <button
                onClick={() => handleReplyReport('confirmed')}
                className="py-1 border text-white bg-green-500 hover:bg-opacity-70"
              >
                Xác nhận
              </button>
              <button
                onClick={() => handleReplyReport('refuse')}
                className="py-1 border text-white bg-red-500 hover:bg-opacity-70"
              >
                Từ chối
              </button>
            </div>
          )}
        </div>

        {/* title */}
        <div className="flex items-center gap-2 mb-1">
          <b>Tiêu đề báo cáo:</b>
          <p>{report.title}</p>
        </div>

        {/* content */}
        <div className="flex flex-col gap-1 pb-2 border-b">
          <b className="min-w-fit">Nội dung báo cáo:</b>
          <div className="h-32 overflow-auto px-4 py-2 scrollbar-w-0">
            <p className="text-justify">{report.content}</p>
          </div>
        </div>

        {/* ngày báo cáo */}
        <div className="flex items-center gap-2 my-1">
          <b>Ngày báo cáo:</b>
          <p>{formatTimeUTC7(report.createdAt)}</p>
        </div>

        <div>
          <b className="w-full py-2 block">Thông tin người báo cáo:</b>
          <div className="flex items-center gap-1 pl-4">
            <b>Họ tên:</b>
            <p>{report.fullName}</p>
          </div>
          <div className="flex items-center gap-1 pl-4">
            <b>Email:</b>
            <Tippy content="Gửi mail cho người báo cáo">
              <Link
                to={`mailto:${report.email}?subject=Nhân viên batdongsanvn.fun`}
              >
                {report.email}
              </Link>
            </Tippy>
          </div>
          <div className="flex items-center gap-1 pl-4">
            <b>SĐT:</b>
            <p>{report.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportListItem;
