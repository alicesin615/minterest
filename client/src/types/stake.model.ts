import { BigNumberish } from 'ethers';

export type AvailableTokenSymbol = 'LINK' | 'USDC';
export type Token = {
    apy: number;
    ethPrice: BigNumberish;
    symbol: AvailableTokenSymbol;
    tokenAddress: string;
    tokenId: number;
    name: string;
    usdPrice: BigNumberish;
};
