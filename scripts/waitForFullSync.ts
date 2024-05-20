import { sendDebugGetSyncStage, sendEthSyncing } from '../lib/requests';

import { retry } from 'ts-retry-promise';

(async () => {
  console.log(await sendDebugGetSyncStage());
  await retry(
    async () => {
      const syncStateResult = await sendDebugGetSyncStage();

      console.log(syncStateResult);

      if (!syncStateResult.currentStage.includes('StateNodes')) {
        throw Error();
      }
    },
    { retries: 'INFINITELY', delay: 5000, timeout: 60000 },
  );

  await retry(
    async () => {
      const syncingResult = await sendEthSyncing();

      console.log(syncingResult);

      if (syncingResult) {
        throw Error();
      }
    },
    { retries: 'INFINITELY', delay: 5000, timeout: 30 * 60000 },
  );
})();
