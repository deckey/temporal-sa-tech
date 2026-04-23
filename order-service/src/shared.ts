export const TASK_QUEUE = 'ORDER_TASK_QUEUE';

export interface Order {
  orderId: string;
  email: string;
  amount: number;
}

// Adding a result type helps keep our Saga logic clean
export interface WorkflowResult {
  success: boolean;
  message: string;
}