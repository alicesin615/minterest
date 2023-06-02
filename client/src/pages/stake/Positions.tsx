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
import * as stake from '@constants/Stake.json';
import { Button } from '@components/Buttons';

type PositionDetailProps = { positionId: number };
const PositionDetail = ({ positionId }: PositionDetailProps) => {
    const { data: positionData } = useContractRead({
        address: stake?.address as never,
        abi: stake?.abi,
        functionName: 'getPositionById',
        args: [positionId]
    });

    const { symbol, name } = (positionData as Position) || {};

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
                    ethers.formatUnits(accruedInterest as BigNumberish, 8)}
            </span>
            <Button
                label="Unstake"
                variant="ghost"
                onClick={unstakeToken}
            ></Button>
        </PrimaryText>
    );
};

export function Positions() {
    return (
        <Card title="Current Positions">
            <div className="flex flex-col pt-4">
                <MutedText className="grid grid-cols-[repeat(3,1fr),100px] gap-2 items-center py-1 [&_span]:mr-auto text-xs font-medium">
                    <span>Symbol</span>
                    <span>Num.Days</span>
                    <span>Accrued Interest</span>
                    <span></span>
                </MutedText>
                {(() => {
                    let positionRows = [];
                    for (let i = 1; i < 4; i++) {
                        positionRows.push(
                            <PositionDetail key={i} positionId={i} />
                        );
                    }
                    return positionRows;
                })()}
            </div>
        </Card>
    );
}
