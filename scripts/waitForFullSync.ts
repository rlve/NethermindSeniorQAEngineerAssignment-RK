import { sendDebugGetSyncStage, sendEthSyncing } from '../lib/requests';

import { retry } from 'ts-retry-promise';

(async () => {
  await retry(
    async () => {
      await retry(
        async () => {
          const syncStateResult = await sendDebugGetSyncStage();

          console.log(syncStateResult);

          if (
            !syncStateResult.currentStage.includes('StateNodes') &&
            !syncStateResult.currentStage.includes('Full') &&
            !syncStateResult.currentStage.includes('WaitingForBlock')
          ) {
            throw Error();
          }
        },
        { retries: 'INFINITELY', delay: 5000, timeout: 60000 },
      );

      const syncingResult = await sendEthSyncing();

      console.log(syncingResult);

      if (syncingResult) {
        throw Error();
      }
    },
    { retries: 'INFINITELY', delay: 5000, timeout: 30 * 60000 },
  );
})();
