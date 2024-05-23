# Nethermind Senior QA Engineer Assignment

This repository contains the solution for the Nethermind Senior QA Engineer Assignment. The project includes the setup of the Nethermind Ethereum client, functional and performance testing suite for the client's JSON-RPC API, and the setup of GitHub Actions workflow for running test suites in CI.

## Overview

### Waiting for Full Sync Strategy

The `waitForFullSync.ts` script ensures the Ethereum client is fully synchronized before running tests. It uses retry logic to repeatedly check the sync status until completion.

1. **Sync Status Checks**:

   - **waitForSyncStage**: Checks the current sync stage via `debug_getSyncStage`. Throws an error if not in `StateNodes`, `Full`, or `WaitingForBlock`.
   - **waitForEthSyncing**: Checks syncing status via `eth_syncing`. Throws an error if still syncing.

2. **Retry Logic**:

   - Utilizes `ts-retry-promise` for infinite retries with a 5-second delay between attempts.
   - Each retry of `waitForSyncStage` times out after 60 seconds.
   - The entire process has a 20-minute timeout.

3. **Execution Flow**:

   - Continuously retries `waitForSyncStage` until successful.
   - Then, runs `waitForEthSyncing` to confirm the client is not syncing.

This strategy guarantees the Ethereum client is fully synced, maintaining the integrity of the testing process.

### Functional tests

This repository includes functional tests to verify the correct operation of client's JSON RPC methods.

The tests has been created using `Jest` as a test runner.

The tests cover retrieving the current block number, fetching blocks by number, and obtaining the chain ID.

Each test checks that the returned data is in the expected format and adheres to a defined schema.

Utility functions are used to validate hexadecimal values and schema compliance.

Spec file: [tests/api.test.ts](./tests/api.test.ts)

### Performance tests

This repository includes performance tests to assess the efficiency and responsiveness of client's JSON RPC methods.

The tests has been created using `k6`.

The tests simulate load conditions by fetching the current block number and repeatedly retrieving block details by number.

These tests check the response status and validate the structure of the returned data.

The performance tests are executed using different scenarios with varying numbers of iterations and virtual users (VUs) to simulate different load conditions. Six scenarios are tested:

1. **Scenario #1**: 1,000 iterations with 10 VUs.
2. **Scenario #2**: 1,000 iterations with 50 VUs.
3. **Scenario #3**: 1,000 iterations with 100 VUs.
4. **Scenario #4**: 10,000 iterations with 10 VUs.
5. **Scenario #5**: 10,000 iterations with 50 VUs.
6. **Scenario #6**: 10,000 iterations with 100 VUs.

Spec file: [k6-tests/load.ts](./k6-tests/load.ts)

Run script: [scripts/run-k6.sh](./scripts/run-k6.sh)

## CI workflow

GitHub Actions workflow has been created to automate consistent and quick setting up project and running tests in CI environment [(workflow)](./.github/workflows/tests.yml). Below is a summary of the steps involved:

1. **Checkout repository**: Checks out the repository code.
2. **Set up Node**: Sets up the latest LTS version of Node.js.
3. **Install Sedge**: Downloads and sets up Sedge for running the Nethermind client.
4. **Install NPM dependencies**: Installs project dependencies using a clean install.
5. **Install k6**: Downloads and sets up the k6 performance testing tool.
6. **Restore cache**: Restores cached data for consensus and execution.
7. **Start Sedge**: Runs the Sedge setup script to start the Ethereum client.
8. **Wait for full sync**: Ensures the Ethereum client is fully synchronized.
9. **Run functional tests**: Executes functional tests using Jest.
10. **Publish functional tests report**: Publishes the functional test results.
11. **Run performance tests**: Executes performance tests using k6.
12. **Publish performance tests report**: Publishes the performance test results.
13. **Show docker logs**: Retrieves and shows logs from Docker containers.
14. **Stop Sedge**: Stops the Sedge service.
15. **Fix permissions before caching**: Ensures necessary permissions for caching data.
16. **Save cache**: Saves cached data for future workflow runs.

### Caching

To ensure quicker syncing and execution time of the workflow, caching strategy of Sync Data has been added.

It contains two steps:

- Restore Cache: The workflow restores cached consensus and execution data if available. This can significantly speed up the syncing process by reusing previously downloaded state data.

- Save Cache: After the sync process, the workflow saves the current state data to cache for future runs. This caching mechanism ensures that subsequent CI runs can start from a partially or fully synced state, reducing the need to sync from scratch every time.

### Tests reports

Functional and performance tests reports can be found in the workflow summary. [(See example here)](https://github.com/rlve/NethermindSeniorQAEngineerAssignment-RK/actions/runs/9194801075)

Functional tests report is added as a `Functional tests` job. [(See here)](https://github.com/rlve/NethermindSeniorQAEngineerAssignment-RK/actions/runs/9194801075/job/25289213676).

Performance tests report is added directly to the workflow summary. [(See here)](https://github.com/rlve/NethermindSeniorQAEngineerAssignment-RK/actions/runs/9194801075#summary-25289101325)

## Local workflow

### Preconditions

- Docker + Docker Compose
- Node.js v22.1.0
- K6 v0.51.0 [(instruction)](https://k6.io/docs/get-started/installation/)
- Sedge v1.3.2 [(instruction)](https://docs.sedge.nethermind.io/docs/quickstart/install-guide)

1. Install dependencies

```bash
npm install
```

2. Run sedge

```bash
npm run sedge
```

3. Wait for full sync

```bash
npm run wait-for-sync
```

4. Run Tests

```bash
npm run run-tests-locally
```
