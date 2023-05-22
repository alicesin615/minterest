import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance
} from 'wagmi';
import { Card, Img } from '.';
import { SigFigFormatter } from '@utils/number-utils';

export function WalletInfo() {
    const { address } = useAccount();
    const { data: balanceData, isLoading } = useBalance({
        address
    });
    const { formatted, symbol } = balanceData || {};

    return (
        <Card title="Wallet">
            <div className="flex gap-4 pt-2 text-brand-primary font-medium text-2xl items-center">
                {Boolean(symbol) && (
                    <Img
                        width={24}
                        height={24}
                        src={`/assets/images/coins/${symbol}.png`}
                    />
                )}
                {SigFigFormatter(formatted || 0)}
            </div>
        </Card>
    );
}
