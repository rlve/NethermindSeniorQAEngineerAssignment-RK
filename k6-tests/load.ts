import { check } from 'k6';
import { sendEthBlockNumber, sendEthGetBlockByNumber } from './requests.js';

type SetupData = { blockNumber: string };

export function setup(): SetupData {
  const res = sendEthBlockNumber();
  const blockNumber = res.result;

  console.log(`Latest block number to use: ${blockNumber}`);

  return { blockNumber: blockNumber as string };
}

export default function (data: SetupData) {
  const res = sendEthGetBlockByNumber(data.blockNumber, false);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'result received': (r) => typeof r.result === 'object',
  });
}
