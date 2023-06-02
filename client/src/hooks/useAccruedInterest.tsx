import { useMemo } from 'react';
import { Position } from 'src/types';
import { useContractRead } from 'wagmi';
import * as stake from '@constants/Stake.json';

export function useAccruedInterest(position: Position) {
    const { symbol, name, createdDate, apy, tokenQuantity } =
        (position as Position) || {};

    const { data: numberOfDays, isLoading: isLoadingNumberOfDays } =
        useContractRead({
            address: stake?.address as never,
            abi: stake?.abi,
            functionName: 'calculateNumberDays',
            args: [createdDate]
        });

    const { data: accruedInterest, isLoading: isLoadingAccruedInterest } =
        useContractRead({
            address: stake?.address as never,
            abi: stake?.abi,
            functionName: 'calculateInterest',
            args: [apy, tokenQuantity, Number(numberOfDays)],
            enabled: !!numberOfDays
        });

    const isLoading = Boolean(
        isLoadingNumberOfDays || isLoadingAccruedInterest
    );

    return useMemo(() => {
        return {
            accruedInterest,
            numberOfDays,
            isLoading
        };
    }, [isLoading, numberOfDays, position]);
}
