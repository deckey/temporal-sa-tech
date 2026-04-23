### Temporal E-Commerce Order Service
An implementation of the **Saga Pattern** for distributed transactions using the Temporal TypeScript SDK.

#### Use Case
This project simulates an e-commerce order flow including inventory checks, payment processing, and shipping. It demonstrates **Durable Execution** and **Automated Compensations**.

### Project Structure
- `workflows.ts`: The "Orchestrator" containing the Saga logic and durable sleeps.
- `activities.ts`: The "Task Workers" simulating external API calls (Mocked).
- `shared.ts`: Type definitions for the Order and Results.

### How to Run
1. Start Temporal Server: `temporal server start-dev`
2. Install dependencies: `npm install`
3. Start Worker: `npm run worker`
4. Start Workflow: `npm run workflow`

## Test cases Discussion Points / Demo Guide
- **Resilience**: How `initialInterval` and `backoffCoefficient` prevent system overload during API outages.
- **Consistency**: How the `compensations` array ensures we never leave a customer charged if shipping fails.
- **Observability**: Using the Temporal Web UI to track state transitions and timers.

This guide outlines three scenarios to demonstrate how Temporal solves common challenges in distributed systems.

### Scenario 1: The Green Path
*   **Goal**: Demonstrate reliable orchestration and resource efficiency.
    
*   **Steps**:
    
    1.  Ensure shipPackage in activities.ts is not throwing an error.
        
    2.  Run npm run workflow.
        
*   **Info**: Added a 2-second sleep between activities, for demo purposes and switching screensT. The state is persisted, if the worker goes idle, the History Service will wake it back up 
    
### Scenario 2: The Saga Pattern (Handling Terminal Failures)

*   **Goal**: Demonstrate eventual consistency and automated cleanup.
    
*   **Steps**:
    
    1.  **Uncomment** the error in shipPackage to simulate a permanent service outage.
        
    2.  Run npm run workflow.
        
    3.  Observe the Web UI as it exhausts 5 retries.
        
*   **Info**: Once the shipping activity exceeds maximumAttempts, compensations are triggered. The payment is refunded and release inventory in reverse order to ensure the system doesn't stay in an inconsistent state."
    
### Scenario 3: The "Hot-Fix" (Durable Recovery)

*   **Goal**: Demonstrate recovery of in-flight business logic without data loss.
    
*   **Steps**:
    
    1.  Start a workflow with the error active in activities.ts.
        
    2.  While the activity is failing/retrying, **re-comment** the error.
        
    3.  Restart the worker (npm run worker).
        
*   **Info**: As the workflow state lives in the **Persistence Store** (SQLite) and not in the worker's memory, new code can be deployed and restart my infrastructure without the user's order ever failing or needing a manual restart.