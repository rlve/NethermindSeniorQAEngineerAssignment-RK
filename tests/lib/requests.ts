export const sendEthBlockNumber = async () => {
  const data = await send('eth_blockNumber', []);

  return data;
};

export const sendEthGetBlockByNumber = async (
  blockParameter: string,
  returnFullTransactionObjects: boolean,
) => {
  const data = await send('eth_getBlockByNumber', [
    blockParameter,
    `${returnFullTransactionObjects}`,
  ]);

  return data;
};

export const sendEthChainId = async () => {
  const data = await send('eth_chainId', []);

  return data;
};

export const sendEthSyncing = async () => {
  const data = await send('eth_syncing', []);

  return data;
};

export const sendDebugGetSyncStage = async () => {
  const data = await send('debug_getSyncStage', []);

  return data;
};

const send = async (method: string, params: string[]) => {
  const body = {
    jsonrpc: '2.0',
    id: 0,
    method,
    params,
  };

  const response = await fetch('http://localhost:8545', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  return data.result;
};
