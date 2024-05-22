import http from 'k6/http';

export function sendEthGetBlockByNumber(
  blockParameter: string,
  returnFullTransactionObjects: boolean,
) {
  const data = send('eth_getBlockByNumber', [
    blockParameter,
    `${returnFullTransactionObjects}`,
  ]);

  return data;
}

export function sendEthBlockNumber() {
  const data = send('eth_blockNumber', []);

  return data;
}

function send(method: string, reqParams: string[]) {
  const url = 'http://localhost:8545';

  const payload = JSON.stringify({
    jsonrpc: '2.0',
    id: 0,
    method,
    params: reqParams,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  let result;
  try {
    result = res.json('result');
  } catch (error) {
    console.log(error);
  }

  return { result, status: res.status };
}
