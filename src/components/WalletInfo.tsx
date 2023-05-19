import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance
} from 'wagmi';
import { Card } from '.';
import { SigFigFormatter } from '../utils';

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
                    <img
                        alt="icon"
                        style={{ width: 28, height: 28 }}
                        src={`/public/assets/images/coins/${symbol}.png`}
                    />
                )}
            </div>
        </Card>
    );
}
