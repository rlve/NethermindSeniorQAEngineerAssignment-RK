import { sendDebugGetSyncStage, sendEthSyncing } from '../lib/requests';

import { retry } from 'ts-retry-promise';

(async () => {
  console.log('before retry');
  console.log(await sendDebugGetSyncStage());
  await retry(
    async () => {
      console.log('in retry 1');

      const syncStateResult = await sendDebugGetSyncStage();

      console.log(syncStateResult);

      if (!syncStateResult.currentStage.includes('StateNodes')) {
        throw Error();
      }
    },
    { retries: 'INFINITELY', delay: 5000, timeout: 180000 },
  );

  console.log('after state');

  await retry(
    async () => {
      console.log('in retry 2');

      const syncingResult = await sendEthSyncing();

      console.log(syncingResult);

      if (syncingResult) {
        throw Error();
      }
    },
    { retries: 'INFINITELY', delay: 5000, timeout: 180000 },
  );
})();
