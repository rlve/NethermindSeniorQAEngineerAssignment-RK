import { sendDebugGetSyncStage, sendEthSyncing } from '../lib/requests';

import { retry } from 'ts-retry-promise';

(async () => {
  await retry(
    async () => {
      const syncStateResult = await sendDebugGetSyncStage();
      const syncingResult = await sendEthSyncing();

      console.log(syncStateResult);
      console.log(syncingResult);

      if (
        syncStateResult.currentStage === 'StateNodes' ||
        syncStateResult.currentStage === 'Disconnected' ||
        syncingResult
      ) {
        throw Error();
      }
    },
    { retries: 'INFINITELY', delay: 5000, timeout: 180000 },
  );
})();
