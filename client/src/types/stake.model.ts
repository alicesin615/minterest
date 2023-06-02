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
export type Position = {
    positionId: number;
    walletAddress: string;
    name: string;
    symbol: AvailableTokenSymbol;
    createdDate: Date;
    apy: number;
    tokenQuantity: number;
    usdValue: number;
    ethValue: number;
    open: boolean;
};
