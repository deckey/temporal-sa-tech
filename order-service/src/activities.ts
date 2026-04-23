import { Order } from "./shared";

export async function processPayment(order: Order): Promise<string> {
  console.log(`[Activity] Processing payment for ${order.orderId}...`);
  return `PAYMENT_CONFIRMED_FOR_${order.orderId}`;
}