export const TASK_QUEUE = 'ORDER_TASK_QUEUE';

export interface Order {
  orderId: string;
  email: string;
  amount: number;
}