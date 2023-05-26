import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance,
    useContractRead
} from 'wagmi';
import { ethers } from 'ethers';
import { Card, Img } from '.';
import * as priceConsumer from '@constants/PriceConsumer.json';
import { SigFigFormatter } from '@utils/number-utils';

export function WalletInfo() {
    const { address } = useAccount();
    const { data: balanceData, isLoading } = useBalance({
        address
    });
    const { formatted, symbol } = balanceData || {};

    const { data: latestPrice } = useContractRead({
        address: priceConsumer?.address,
        abi: priceConsumer?.abi,
        functionName: 'getLatestPrice'
    });

    const formattedLatestPrice =
        Boolean(latestPrice) &&
        ethers.formatUnits(latestPrice as ethers.BigNumberish, 8);

    return (
        <Card title="Wallet">
            <div className="flex gap-4 pt-2 text-brand-primary font-medium text-2xl items-center">
                {Boolean(symbol) && (
                    <Img
                        width={24}
                        height={24}
                        src={`/assets/images/coins/ETH.png`}
                    />
                )}
                {SigFigFormatter(formatted || 0)}
            </div>
        </Card>
    );
}
