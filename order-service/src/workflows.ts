import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';
import { Order, WorkflowResult } from './shared';

const {
  checkInventory,
  notifyCustomer,
  processPayment,
  shipPackage,
  releaseInventory,
  refundPayment } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
    retry: {
      initialInterval: '10 second',
      backoffCoefficient: 1.25,
      maximumAttempts: 5, // Will fail after 5 tries and hit the catch block
    },
  });

const timer = '2 seconds';
export async function orderWorkflow(order: Order): Promise<WorkflowResult> {
  const compensations: (() => Promise<any>)[] = [];
  let workflowStatus = 'COMPLETED';
  let trackingId = ''; // Initialize a variable to hold the ID

  try {
    await checkInventory(order);
    compensations.push(() => releaseInventory(order));
    await sleep(timer);

    await processPayment(order);
    compensations.push(() => refundPayment(order));
    await sleep(timer);

    // Capture the result instead of returning immediately
    trackingId = await shipPackage(order);

  } catch (err: any) {
    console.error(`Workflow failed: ${err.message}. Starting compensations...`);
    workflowStatus = 'FAILED_AND_REFUNDED';

    for (const compensate of compensations.reverse()) {
      await compensate();
    }
  }

  // Now this line WILL execute regardless of success or failure
  await notifyCustomer(order, workflowStatus);

  return workflowStatus === 'COMPLETED'
    ? { success: true, message: `Order ${order.orderId} shipped, customer notified: ${trackingId}` }
    : { success: false, message: `Order ${order.orderId} failed and was compensated.` };
}