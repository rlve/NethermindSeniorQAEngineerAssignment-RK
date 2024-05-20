import { isHex } from '../lib/helpers';
import {
  sendEthBlockNumber,
  sendEthGetBlockByNumber,
  sendEthChainId,
} from '../lib/requests';

describe('eth_blockNumber', () => {
  it('should return current block number', async () => {
    const result = await sendEthBlockNumber();

    expect(isHex(result)).toBe(true);
  });
});

describe('eth_getBlockByNumber', () => {
  it('should return block by number', async () => {
    const result = await sendEthGetBlockByNumber('latest', false);

    expect(result).toHaveProperty('author');
  });
});

describe('eth_chainId', () => {
  it('should return ChainID', async () => {
    const result = await sendEthChainId();

    expect(isHex(result)).toBe(true);
  });
});
