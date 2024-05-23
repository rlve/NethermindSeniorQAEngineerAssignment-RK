# Nethermind Senior QA Engineer Assignment

This repository contains the solution for the Nethermind Senior QA Engineer Assignment. The project includes the setup of the Nethermind Ethereum client, a functional and performance testing suite for the client's JSON-RPC API, and the GitHub Actions workflow for running test suites in CI.

## Overview

The solution has been developed in approximately 2 working days. The repository contains setups for functional and performance tests, which are basic but can serve as a foundation for further development. The solution includes a fully functional GitHub Actions workflow.

Potential Improvements:

- Add thresholds to the K6 script to automatically check for performance regressions in the endpoints.
- Explore other reporters for K6 and enhance the report presentation in the summary.
- Optimize the caching strategy for the sync data. Currently, it is saved in every run; adding logic to save only when necessary could improve efficiency.
- Manage test configurations using `dotenv` or `node-config-ts` package. Currently, there is minimal configuration data, which is hardcoded in the files.

### Waiting for Full Sync Strategy

The `waitForFullSync.ts` script ensures the Ethereum client is fully synchronized before running tests. It uses retry logic to repeatedly check the sync status until completion.

1. **Sync Status Checks**:

   - **waitForSyncStage**: Checks the current sync stage via `debug_getSyncStage`. Throws an error if not in `StateNodes`, `Full`, or `WaitingForBlock`.
   - **waitForEthSyncing**: Checks the syncing status via `eth_syncing`. Throws an error if still syncing.

2. **Retry Logic**:

   - Utilizes `ts-retry-promise` for infinite retries with a 5-second delay between attempts.
   - Each retry of `waitForSyncStage` times out after 60 seconds.
   - The entire process has a 20-minute timeout.

3. **Execution Flow**:

   - Continuously retries `waitForSyncStage` until successful.
   - Then, runs `waitForEthSyncing` to confirm the client is not syncing.

This strategy guarantees the Ethereum client is fully synced, maintaining the integrity of the testing process.

### Functional Tests

This repository includes functional tests to verify the correct operation of the client's JSON-RPC methods. The tests have been created using `Jest` as a test runner. The tests cover retrieving the current block number, fetching blocks by number, and obtaining the chain ID. Each test checks that the returned data is in the expected format and adheres to a defined schema. Utility functions are used to validate hexadecimal values and schema compliance.

Spec file: [tests/api.test.ts](./tests/api.test.ts)

### Performance Tests

This repository includes performance tests to assess the efficiency and responsiveness of the client's JSON-RPC methods. The tests have been created using `k6`. They simulate load conditions by fetching the current block number and repeatedly retrieving block details by number. These tests check the response status and validate the structure of the returned data.

The performance tests are executed using different scenarios with varying numbers of iterations and virtual users (VUs) to simulate different load conditions. Six scenarios are tested:

1. **Scenario #1**: 1,000 iterations with 10 VUs.
2. **Scenario #2**: 1,000 iterations with 50 VUs.
3. **Scenario #3**: 1,000 iterations with 100 VUs.
4. **Scenario #4**: 10,000 iterations with 10 VUs.
5. **Scenario #5**: 10,000 iterations with 50 VUs.
6. **Scenario #6**: 10,000 iterations with 100 VUs.

Spec file: [k6-tests/load.ts](./k6-tests/load.ts)

Run script: [scripts/run-k6.sh](./scripts/run-k6.sh)

## CI Workflow

A GitHub Actions workflow has been created to automate the consistent and quick setup of the project and running tests in a CI environment [(workflow)](./.github/workflows/tests.yml). Below is a summary of the steps involved:

1. **Checkout Repository**: Checks out the repository code.
2. **Set up Node**: Sets up the latest LTS version of Node.js.
3. **Install Sedge**: Downloads and sets up Sedge for running the Nethermind client.
4. **Install NPM Dependencies**: Installs project dependencies using a clean install.
5. **Install k6**: Downloads and sets up the k6 performance testing tool.
6. **Restore Cache**: Restores cached data for consensus and execution.
7. **Start Sedge**: Runs the Sedge setup script to start the Ethereum client.
8. **Wait for Full Sync**: Ensures the Ethereum client is fully synchronized.
9. **Run Functional Tests**: Executes functional tests using Jest.
10. **Publish Functional Tests Report**: Publishes the functional test results.
11. **Run Performance Tests**: Executes performance tests using k6.
12. **Publish Performance Tests Report**: Publishes the performance test results.
13. **Show Docker Logs**: Retrieves and shows logs from Docker containers.
14. **Stop Sedge**: Stops the Sedge service.
15. **Fix Permissions Before Caching**: Ensures necessary permissions for caching data.
16. **Save Cache**: Saves cached data for future workflow runs.

### Caching

To ensure quicker syncing and execution time of the workflow, a caching strategy for Sync Data has been added. It contains two steps:

- **Restore Cache**: The workflow restores cached consensus and execution data if available. This can significantly speed up the syncing process by reusing previously downloaded state data.
- **Save Cache**: After the sync process, the workflow saves the current state data to cache for future runs. This caching mechanism ensures that subsequent CI runs can start from a partially or fully synced state, reducing the need to sync from scratch every time.

### Test Reports

Functional and performance test reports can be found in the workflow summary. [(See example here)](https://github.com/rlve/NethermindSeniorQAEngineerAssignment-RK/actions/runs/9194801075).

The functional tests report is added as a `Functional tests` job. [(See here)](https://github.com/rlve/NethermindSeniorQAEngineerAssignment-RK/actions/runs/9194801075/job/25289213676).

The performance tests report is added directly to the workflow summary. [(See here)](https://github.com/rlve/NethermindSeniorQAEngineerAssignment-RK/actions/runs/9194801075#summary-25289101325).

## Local Workflow

### Preconditions

- Docker + Docker Compose
- Node.js v22.1.0
- K6 v0.51.0 [(installation instruction)](https://k6.io/docs/get-started/installation/)
- Sedge v1.3.2 [(installation instruction)](https://docs.sedge.nethermind.io/docs/quickstart/install-guide)

1. Install dependencies:

```bash
npm install
```

2. Run sedge:

```bash
npm run sedge
```

3. Wait for full sync:

```bash
npm run wait-for-sync
```

4. Run Tests:

```bash
npm run run-tests-locally
```
