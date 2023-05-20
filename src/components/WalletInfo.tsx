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
            <div className="flex gap-2 pt-2 text-brand-primary font-medium text-2xl">
                {SigFigFormatter(formatted || 0)}
                {Boolean(symbol) && (
                    <Img
                        width={28}
                        height={28}
                        src={`/assets/images/coins/${symbol}.png`}
                    />
                )}
            </div>
        </Card>
    );
}
