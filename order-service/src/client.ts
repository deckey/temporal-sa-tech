import { Connection, Client } from '@temporalio/client';
import { orderWorkflow } from './workflows';
import { nanoid } from 'nanoid'; // npm install nanoid

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });

  const orderId = `ORD-${nanoid(5)}`;

  // Start the workflow
  const handle = await client.workflow.start(orderWorkflow, {
    taskQueue: 'ORDER_TASK_QUEUE',
    args: [{ orderId, email: 'user@example.com', amount: 99.99 }],
    workflowId: `workflow-${orderId}`,
  });

  console.log(`Started workflow ${handle.workflowId}`);

  // Optional: Wait for the result
  const result = await handle.result();
  console.log(result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});