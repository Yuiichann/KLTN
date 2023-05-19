import { IReport } from '../../types/report.type';
import ReportListItem from './ReportListItem';

interface Props {
  reports: IReport[];
}

const ReportList = ({ reports }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {reports.map((item, index) => (
        <ReportListItem report={item} key={index} />
      ))}
    </div>
  );
};

export default ReportList;
