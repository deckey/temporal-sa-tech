import { Worker } from '@temporalio/worker';
import * as path from 'path';
import * as activities from './activities';

const workflowsPath = require.resolve('./workflows');

async function run() {
  // The worker connects to the local Temporal server by default (localhost:7233)
  const worker = await Worker.create({
    workflowsPath,
    activities,
    taskQueue: 'ORDER_TASK_QUEUE',
  });

  console.log('Worker is starting... (Press Ctrl+C to stop)');
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});