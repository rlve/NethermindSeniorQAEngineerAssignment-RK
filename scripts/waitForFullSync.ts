import { retry } from 'ts-retry-promise';
import { sendDebugGetSyncStage, sendEthSyncing } from '../tests/lib/requests';

async function waitForSyncStage() {
  const syncStateResult = await sendDebugGetSyncStage();

  console.log(syncStateResult);

  if (
    !syncStateResult.currentStage.includes('StateNodes') &&
    !syncStateResult.currentStage.includes('Full') &&
    !syncStateResult.currentStage.includes('WaitingForBlock')
  ) {
    throw Error();
  }
}

async function waitForEthSyncing() {
  const syncingResult = await sendEthSyncing();

  console.log(syncingResult);

  if (syncingResult) {
    throw Error();
  }
}

const DELAY = 5000;

(async () => {
  await retry(
    async () => {
      await retry(async () => waitForSyncStage(), {
        retries: 'INFINITELY',
        delay: DELAY,
        timeout: 60 * 1000,
      });

      await waitForEthSyncing();
    },
    { retries: 'INFINITELY', delay: DELAY, timeout: 20 * 60000 },
  );
})();
