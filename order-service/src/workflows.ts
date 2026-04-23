import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { Order } from './shared';

const { processPayment } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute', // If the activity takes longer, Temporal retries it
});

export async function orderWorkflow(order: Order): Promise<string> {
  const result = await processPayment(order);
  return `Order ${order.orderId} complete: ${result}`;
}