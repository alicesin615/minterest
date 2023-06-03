import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useWalletBalance } from '@hooks/useWalletBalance';
import { Card, Img, PrimaryText } from '.';
import { SigFigFormatter } from '@utils/number-utils';

export function WalletInfo() {
    const { address, isConnected } = useAccount();

    const { sepoliaEthBalance, linkBalance } = useWalletBalance();

    return (
        <Card title="Wallet">
            <div className="flex gap-8 pt-4 text-brand-primary font-medium text-2xl items-center">
                {!isConnected && (
                    <PrimaryText className="text-sm !text-brand-secondary">
                        Please connect your wallet first
                    </PrimaryText>
                )}
                {isConnected && (
                    <React.Fragment>
                        <div className="flex gap-2 items-center">
                            <Img
                                width={24}
                                height={24}
                                src={`/assets/images/coins/ETH.png`}
                            />
                            {SigFigFormatter(sepoliaEthBalance?.formatted || 0)}
                        </div>
                        <div className="flex gap-2 items-center">
                            {Boolean(linkBalance?.symbol) && (
                                <Img
                                    width={24}
                                    height={24}
                                    src={`/assets/images/coins/${linkBalance?.symbol}.png`}
                                />
                            )}
                            {SigFigFormatter(linkBalance?.formatted || 0)}
                        </div>
                    </React.Fragment>
                )}
            </div>
        </Card>
    );
}
