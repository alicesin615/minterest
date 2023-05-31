import { ethers } from 'ethers';
import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite
} from 'wagmi';
import { TextField } from '@mui/material';
import { Card } from '@components/Card';
import { MutedText, PrimaryText, SecondaryText } from '@components/Text';
import * as priceFeed from '@constants/PriceFeed.json';
import * as stake from '@constants/Stake.json';
import { PriceFeedAddress, Token } from 'src/types';
import { Button } from '@components/Buttons';
import { PriceFeedAddresses } from '@constants/addresses';
import { SigFigFormatter } from '@utils/number-utils';
import { Img } from '@components/Img';

const AvailableCollateral = ({
    priceFeedAddress
}: {
    priceFeedAddress: PriceFeedAddress;
}) => {
    const { data: latestPriceData } = useContractRead({
        address: priceFeed?.address as never,
        abi: priceFeed?.abi,
        functionName: 'getPrice',
        args: [Object.values(priceFeedAddress)?.[0]]
    });

    const symbol = Object.keys(priceFeedAddress)?.[0]?.split('_')?.[0];

    const formattedLatestPrice =
        Boolean(latestPriceData) &&
        ethers.formatUnits(latestPriceData?.[0] as ethers.BigNumberish, 8);

    // const {
    //     data,
    //     isError,
    //     isLoading,
    //     write: stakeToken
    // } = useContractWrite({
    //     address: stake?.address as never,
    //     abi: stake?.abi as never,
    //     functionName: 'stakeTokens' as never,
    //     args: ['LINK', 10] as never
    // });

    const { data: tokenData } = useContractRead({
        address: stake?.address as never,
        abi: stake?.abi,
        functionName: 'getToken',
        args: [symbol]
    });

    const { apy, name } = (tokenData as Token) || {};
    const formattedApy = Number(apy) / 100;
    return (
        <PrimaryText className="grid grid-cols-[repeat(2,1fr),50px] items-center py-4">
            <div className="flex gap-4 items-center font-medium">
                <Img
                    src={`/assets/images/coins/${symbol}.png`}
                    width={36}
                    height={36}
                />
                <div className="flex flex-col">
                    {symbol}
                    <MutedText className="text-xs">{name}</MutedText>
                </div>
            </div>
            <span>{SigFigFormatter(formattedLatestPrice || 0)} USD</span>
            <span className="text-brand-primary">
                {Boolean(tokenData) && SigFigFormatter(formattedApy || 0)} %
            </span>
            {/* <Button
                label="Stake"
                className="w-fit ml-auto"
                onClick={stakeToken}
            /> */}
        </PrimaryText>
    );
};
export function Stake() {
    return (
        <div className="flex gap-8">
            <Card title="Available Collaterals" className="w-3/5">
                <div className="flex flex-col pt-4">
                    <MutedText className="grid grid-cols-[repeat(2,1fr),50px] items-center py-1 [&_span]:mr-auto text-xs font-medium">
                        <span>Symbol</span>
                        <span>Price</span>
                        <span>APY</span>
                        <span></span>
                    </MutedText>
                    {PriceFeedAddresses?.map((priceFeedAddress, i) => (
                        <AvailableCollateral
                            key={i}
                            priceFeedAddress={priceFeedAddress}
                        />
                    ))}
                </div>
            </Card>
            <Card title="Stake" className="flex-1 ">
                <div className="flex flex-col pt-4">
                    <TextField
                        id="number"
                        type="number"
                        required
                        fullWidth
                        placeholder="Choose Stake Amount"
                    />
                </div>
            </Card>
        </div>
    );
}
