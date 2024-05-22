import { hasValidSchema, isHex } from './lib/assertions';
import {
  sendEthBlockNumber,
  sendEthGetBlockByNumber,
  sendEthChainId,
} from './lib/requests';

describe('eth_blockNumber', () => {
  it('should return current block number', async () => {
    const result = await sendEthBlockNumber();

    expect(isHex(result)).toBe(true);
  });
});

describe('eth_getBlockByNumber', () => {
  it('should return block by number with a valid schema', async () => {
    const result = await sendEthGetBlockByNumber('latest', false);

    expect(hasValidSchema(result)).toBe(true);
  });
});

describe('eth_chainId', () => {
  it('should return ChainID', async () => {
    const result = await sendEthChainId();

    expect(isHex(result)).toBe(true);
  });
});
