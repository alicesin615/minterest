import { useAccount, useBalance } from 'wagmi';
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
            <div className="flex gap-4 pt-4 text-brand-primary font-medium text-2xl items-center">
                {Boolean(symbol) && (
                    <Img
                        width={32}
                        height={32}
                        src={`/assets/images/coins/ETH.png`}
                    />
                )}
                {SigFigFormatter(formatted || 0)}
            </div>
        </Card>
    );
}
