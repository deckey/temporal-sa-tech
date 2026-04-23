import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { Order, WorkflowResult } from './shared';

const { checkInventory, processPayment, shipPackage, releaseInventory, refundPayment } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 5, // Now it will fail after 5 tries and hit the catch block
  },
});

export async function orderWorkflow(order: Order): Promise<WorkflowResult> {
  const compensations: (() => Promise<any>)[] = [];

  try {
    // 1. Check/Reserve Inventory
    await checkInventory(order);
    compensations.push(() => releaseInventory(order));

    // 2. Process Payment
    await processPayment(order);
    compensations.push(() => refundPayment(order));

    // 3. Ship Package (This is set to fail)
    const trackingId = await shipPackage(order);

    return { success: true, message: `Order shipped: ${trackingId}` };

  } catch (err: any) {
    console.error(`Workflow failed: ${err.message}. Starting compensations...`);

    // Execute compensations in reverse order
    for (const compensate of compensations.reverse()) {
      await compensate();
    }

    return { success: false, message: `Workflow failed and compensated: ${err.message}` };
  }

}