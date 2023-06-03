import { useState } from 'react';
import { ethers, BigNumberish } from 'ethers';
import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite
} from 'wagmi';
import { useAccruedInterest } from '@hooks/useAccruedInterest';
import { Position } from 'src/types';
import { MutedText, PrimaryText, SecondaryText } from '@components/Text';
import { Img } from '@components/Img';
import { Card } from '@components/Card';
import { Tab } from '@components/Tab';
import * as stake from '@constants/Stake.json';
import { Button } from '@components/Buttons';

type TabTypes = 'open' | 'close';

type PositionDetailProps = { positionId: number; currentTab: TabTypes };
const PositionDetail = ({ positionId, currentTab }: PositionDetailProps) => {
    const { data: positionData } = useContractRead({
        address: stake?.address as never,
        abi: stake?.abi,
        functionName: 'getPositionById',
        args: [positionId]
    });

    const { symbol, name, open } = (positionData as Position) || {};

    const { accruedInterest, numberOfDays } = useAccruedInterest(
        positionData as Position
    );

    const {
        data,
        isError,
        isLoading,
        write: unstakeToken
    } = useContractWrite({
        address: stake?.address as never,
        abi: stake?.abi as never,
        functionName: 'closePosition' as never,
        args: [positionId] as never
    });

    if ((currentTab === 'close' && open) || (currentTab === 'open' && !open)) {
        return null;
    }

    return (
        <PrimaryText
            className={`grid grid-cols-[repeat(3,1fr),100px] gap-2 items-center py-4`}
        >
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
            <span>{Number(numberOfDays) || 0}</span>
            <span>
                {Boolean(positionData) &&
                    ethers.formatUnits(
                        (accruedInterest as BigNumberish) || 0,
                        8
                    )}
            </span>
            {open ? (
                <Button
                    label="Unstake"
                    variant="ghost"
                    onClick={unstakeToken}
                ></Button>
            ) : (
                <Button disabled label="Closed" />
            )}
        </PrimaryText>
    );
};

export function Positions() {
    const [currentTab, setCurrentTab] = useState<TabTypes>('open');
    return (
        <Card title="Positions">
            <div className="flex flex-col pt-4">
                <div className="flex gap-4 items-center pb-4">
                    <Tab
                        label="Open"
                        onClick={() => setCurrentTab('open')}
                        active={currentTab === 'open'}
                    />
                    <Tab
                        label="Closed"
                        onClick={() => setCurrentTab('close')}
                        active={currentTab === 'close'}
                    />
                </div>
                <MutedText className="grid grid-cols-[repeat(3,1fr),100px] gap-2 items-center py-1 [&_span]:mr-auto text-xs font-medium">
                    <span>Symbol</span>
                    <span>Num.Days Accrued</span>
                    <span>Accrued Interest</span>
                    <span></span>
                </MutedText>
                {(() => {
                    let positionRows = [];
                    for (let i = 1; i < 5; i++) {
                        positionRows.push(
                            <PositionDetail
                                key={i}
                                positionId={i}
                                currentTab={currentTab}
                            />
                        );
                    }
                    return positionRows;
                })()}
            </div>
        </Card>
    );
}
