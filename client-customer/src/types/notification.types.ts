export interface INotification {
  id: string;
  user_id: string;
  title: string;
  content: string;
  seen: boolean;
  createdAt: Date;
}
