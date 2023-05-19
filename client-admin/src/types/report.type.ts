export interface IReport {
  title: string;
  content: string;
  email: string;
  createdAt: string | Date;
  phone_number: string;
  status: 'pending' | 'confirmed' | 'refuse';
  post_slug: string;
  fullName: string;
  id: string;
}

export interface IReportResponse {
  totalPage: number;
  totalItems: number;
  data: IReport[];
}
