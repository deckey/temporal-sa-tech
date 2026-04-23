### Temporal E-Commerce Order Service
An implementation of the **Saga Pattern** for distributed transactions using the Temporal TypeScript SDK.

#### Use Case
This project simulates an e-commerce order flow including inventory checks, payment processing, and shipping. It demonstrates **Durable Execution** and **Automated Compensations**.

## Project Structure
- `workflows.ts`: The "Orchestrator" containing the Saga logic and durable sleeps.
- `activities.ts`: The "Task Workers" simulating external API calls (Mocked).
- `shared.ts`: Type definitions for the Order and Results.

## How to Run
1. Start Temporal Server: `temporal server start-dev`
2. Install dependencies: `npm install`
3. Start Worker: `npm run worker`
4. Start Workflow: `npm run workflow`

## Test cases Discussion Points for Interview
- **Resilience**: How `initialInterval` and `backoffCoefficient` prevent system overload during API outages.
- **Consistency**: How the `compensations` array ensures we never leave a customer charged if shipping fails.
- **Observability**: Using the Temporal Web UI to track state transitions and timers.