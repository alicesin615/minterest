export type AvailablePriceFeed = 'LINK_USD' | 'USDC_USD';

export type PriceFeedAddress = {
    [key in AvailablePriceFeed]: string;
};
