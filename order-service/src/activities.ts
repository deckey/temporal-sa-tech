import { Order } from "./shared";

export async function processPayment(order: Order): Promise<string> {
  console.log(`[Activity] Processing payment for ${order.orderId}...`);
  // Simulate a few second delay
  await new Promise((resolve) => setTimeout(resolve, 2000)); 

  // // Simulate a hard failure / API Down
  // throw new Error('Payment Gateway Timeout: Service Unavailable (503)');

  console.log(`[Activity] Payment finished for ${order.orderId}`);
  return `PAYMENT_CONFIRMED_FOR_${order.orderId}`;
}

export async function checkInventory(order: Order): Promise<boolean> {
  console.log(`[Activity] Checking inventory for Product: ${order.orderId}...`);
  // Simulate a quick DB check
  await new Promise((resolve) => setTimeout(resolve, 500));

  const isAvailable = true; 
  console.log(`[Activity] Inventory check for ${order.orderId}: ${isAvailable ? 'In Stock' : 'Out of Stock'}`);
  return isAvailable;
}

export async function releaseInventory(order: Order): Promise<void> {
  console.log(`[Compensate] Releasing inventory for ${order.orderId}...`);
}

export async function refundPayment(order: Order): Promise<void> {
  console.log(`[Compensate] Refunding payment for ${order.orderId}...`);
}

export async function shipPackage(order: Order): Promise<string> {
  console.log(`[Activity] Shipping package for ${order.orderId}...`);
  // Simulate a hard failure / API Down
  throw new Error('Shipping Partner API Down'); 
}