import { useMemo } from 'react';
import { TokenAddresses } from '@constants/addresses';
import { Address, useAccount, useBalance } from 'wagmi';
export function useWalletBalance() {
    const { address } = useAccount();

    // get sepolia eth balance
    const { data: sepoliaEthBalance, isLoading: isLoadingSepoliaEth } =
        useBalance({
            address,
            watch: true
        });

    const { data: linkBalance, isLoading: isLoadingLink } = useBalance({
        address,
        token: TokenAddresses['LINK'] as Address,
        watch: true
    });

    const isLoading = isLoadingSepoliaEth || isLoadingLink;

    return useMemo(() => {
        return {
            sepoliaEthBalance,
            linkBalance,
            isLoading
        };
    }, [isLoading, sepoliaEthBalance, linkBalance]);
}
