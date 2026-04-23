import { Order } from "./shared";

export async function processPayment(order: Order): Promise<string> {
  console.log(`[Activity] Processing payment for ${order.orderId}...`);
  return `PAYMENT_CONFIRMED_FOR_${order.orderId}`;
}

export async function checkInventory(order: Order): Promise<boolean> {
  console.log(`[Activity] Checking inventory for Product: ${order.orderId}...`);
  // Simulate a quick DB check
  await new Promise((resolve) => setTimeout(resolve, 300));
  const isAvailable = true; 
  console.log(`[Activity] Inventory check for ${order.orderId}: ${isAvailable ? 'In Stock' : 'Out of Stock'}`);
  return isAvailable;
}

export async function releaseInventory(order: Order): Promise<void> {
  console.log(`[Compensate] Releasing inventory for ${order.orderId}...`);

}

export async function refundPayment(order: Order): Promise<void> {
  console.log(`[Compensate] Refunding payment for ${order.orderId}...`);
  await new Promise((resolve) => setTimeout(resolve, 200));
}

export async function shipPackage(order: Order): Promise<string> {
  console.log(`[Activity] Shipping package for ${order.orderId}...`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // throw new Error('Shipping service is currently unavailable'); // Simulate a failure
  return `TRK-${Math.random().toString(36).toUpperCase().substring(2, 9)}`;
}