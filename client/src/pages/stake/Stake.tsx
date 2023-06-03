import { useState } from 'react';
import { ethers } from 'ethers';
import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite
} from 'wagmi';
import { TextField, Tooltip } from '@mui/material';
import { Card } from '@components/Card';
import { MutedText, PrimaryText, SecondaryText } from '@components/Text';
import { Positions } from './Positions';
import * as priceFeed from '@constants/PriceFeed.json';
import * as stake from '@constants/Stake.json';
import { PriceFeedAddress, Token, AvailableTokenSymbol } from 'src/types';
import { Button } from '@components/Buttons';
import { EmptyPlaceholder } from '@components/EmptyPlaceholder';
import { PriceFeedAddresses } from '@constants/addresses';
import { SigFigFormatter, formatApy } from '@utils/number-utils';
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
    const isSupported = symbol === 'LINK';

    const formattedLatestPrice =
        Boolean(latestPriceData) &&
        ethers.formatUnits(latestPriceData?.[0] as ethers.BigNumberish, 8);

    const { data: tokenData } = useContractRead({
        address: stake?.address as never,
        abi: stake?.abi,
        functionName: 'getToken',
        args: [symbol]
    });

    const { apy, name } = (tokenData as Token) || {};
    return (
        <Tooltip
            title={`${
                isSupported
                    ? ''
                    : 'Token not supported on the current network. Please switch to another network.'
            }`}
        >
            <div>
                <PrimaryText
                    className={`grid grid-cols-[30px,repeat(2,1fr),50px] items-center py-4 hover:cursor-pointer transition-all ${
                        !isSupported && 'opacity-40 pointer-events-none'
                    }`}
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
                    <span>
                        {SigFigFormatter(formattedLatestPrice || 0)} USD
                    </span>
                    <span className="text-brand-primary">
                        {Boolean(tokenData) && SigFigFormatter(formatApy(apy))}{' '}
                        %
                    </span>
                </PrimaryText>
            </div>
        </Tooltip>
    );
};
export function Stake() {
    const [tokenToStake, setTokenToStake] =
        useState<AvailableTokenSymbol | null>(null);
    const [stakeAmount, setStakeAmount] = useState<number | null>(null);

    const {
        data,
        isError,
        isLoading,
        error,
        write: stakeToken
    } = useContractWrite({
        address: stake?.address as never,
        abi: stake?.abi as never,
        functionName: 'stakeTokens' as never,
        args: [tokenToStake, stakeAmount] as never,
        onError: () => {
            console.log('error here', error);
        }
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 md:flex-row flex-col">
                <Card title="Available Collaterals" className="md:w-3/5">
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
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center font-medium">
                                    <Img
                                        src={`/assets/images/coins/${tokenToStake}.png`}
                                        width={20}
                                        height={20}
                                    />
                                    {tokenToStake}
                                </div>
                                <TextField
                                    id="number"
                                    type="number"
                                    required
                                    fullWidth
                                    placeholder="Choose Stake Amount"
                                    variant="standard"
                                    InputProps={{
                                        inputProps: {
                                            min: 0
                                        },
                                        disableUnderline: true
                                    }}
                                    onChange={(e) =>
                                        setStakeAmount(Number(e.target.value))
                                    }
                                    onKeyPress={(e) => {
                                        if (e?.key === '-' || e?.key === '+') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <EmptyPlaceholder label="Please choose a token to stake" />
                        )}
                    </div>
                    <Button
                        label="Stake"
                        className="w-full mt-auto"
                        disabled={!tokenToStake}
                        onClick={stakeToken}
                    />
                </Card>
            </div>
            <Positions />
        </div>
    );
}
