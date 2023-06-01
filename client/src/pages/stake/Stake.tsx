import { useState } from 'react';
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
import { PriceFeedAddress, Token, AvailableTokenSymbol } from 'src/types';
import { Button } from '@components/Buttons';
import { EmptyPlaceholder } from '@components/EmptyPlaceholder';
import { PriceFeedAddresses } from '@constants/addresses';
import { SigFigFormatter } from '@utils/number-utils';
import { CheckIcon, EmptyCheckIcon } from '@components/Icons';
import { Img } from '@components/Img';

const AvailableCollateral = ({
    priceFeedAddress,
    setTokenToStake,
    tokenToStake
}: {
    priceFeedAddress: PriceFeedAddress;
    setTokenToStake?: (tokenToStake) => void;
    tokenToStake?: string;
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
        <PrimaryText
            className={`grid grid-cols-[30px,repeat(2,1fr),50px] items-center py-4 hover:cursor-pointer transition-all`}
            onClick={() => setTokenToStake(symbol)}
        >
            {symbol === tokenToStake ? (
                <CheckIcon className="text-brand-primary" />
            ) : (
                <EmptyCheckIcon className="text-slate-600" />
            )}
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
        </PrimaryText>
    );
};
export function Stake() {
    const [tokenToStake, setTokenToStake] =
        useState<AvailableTokenSymbol | null>(null);
    return (
        <div className="flex gap-6">
            <Card title="Available Collaterals" className="w-3/5">
                <div className="flex flex-col pt-4">
                    <MutedText className="grid grid-cols-[30px,repeat(2,1fr),50px] items-center py-1 [&_span]:mr-auto text-xs font-medium">
                        <span></span>
                        <span>Symbol</span>
                        <span>Price</span>
                        <span>APY</span>
                        <span></span>
                    </MutedText>
                    {PriceFeedAddresses?.map(
                        (priceFeedAddress: PriceFeedAddress, i: number) => (
                            <AvailableCollateral
                                key={i}
                                priceFeedAddress={priceFeedAddress}
                                setTokenToStake={setTokenToStake}
                                tokenToStake={tokenToStake}
                            />
                        )
                    )}
                </div>
            </Card>
            <Card title="Stake" className="flex-1 flex-col flex ">
                <div className="flex flex-col pt-4 h-full">
                    {Boolean(tokenToStake) ? (
                        <TextField
                            id="number"
                            type="number"
                            required
                            fullWidth
                            placeholder="Choose Stake Amount"
                            variant="standard"
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    ) : (
                        <EmptyPlaceholder label="Please choose a token to stake" />
                    )}
                </div>
                <Button
                    label="Stake"
                    className="w-full mt-auto"
                    disabled={!tokenToStake}
                    // onClick={stakeToken}
                />
            </Card>
        </div>
    );
}
