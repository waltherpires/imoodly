export type NotificationType = {
  id: number;
  type: string;
  isRead: boolean;
  createdAt: string;
  sender: { id: number; name: string; email: string };
  receiver: { id: number; name: string; email: string };
  resourceId?: number;
};