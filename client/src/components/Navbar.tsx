import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Popover } from '@mui/material';
import { Button } from '@components/Buttons';
import { Img } from '@components/Img';
import { PrimaryText, SecondaryText, MutedText } from '@components/Text';
import { middleTruncation } from '@utils/string-utils';
import { MinterestLogo } from './MinterestLogo';

type NabarLinkProps = NavLinkProps & {
    to: string;
    label: string;
    props?: Object;
};
const NavbarLink = ({ to, label, props }: NabarLinkProps) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `px-3 py-1 flex items-center text-slate-400 hover:bg-slate-600/20 hover:text-slate-200 h-fit cursor-pointer transition-all rounded ${
                isActive ? '!text-slate-200 font-medium bg-slate-600/20' : ''
            }`
        }
        state={props ? props : null}
    >
        {label}
    </NavLink>
);

export function Navbar() {
    const { address, isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();
    const { disconnect } = useDisconnect();

    const [walletSettingsEl, setWalletSettingsEl] =
        React.useState<HTMLDivElement | null>(null);

    const metaMaskConnector = connectors?.find(
        (connector) => connector?.id === 'metaMask'
    );

    const openWalletSettings = Boolean(walletSettingsEl);
    const walletSettingsId = openWalletSettings
        ? 'wallet-settings-popover'
        : undefined;

    return (
        <div className="sticky w-full backdrop-blur h-16 top-0 left-0 z-30 px-4 shadow-xl bg-system/60 border-b-system/10 border-b">
            <div className="mx-auto h-full items-center flex justify-center gap-6 w-4/5">
                <MinterestLogo />
                <NavbarLink label="Stake" to="/" />
                <NavbarLink label="Mint" to="/mint" />
                {!isConnected && connectors ? (
                    <Button
                        className="ml-auto"
                        id={metaMaskConnector?.id}
                        disabled={!metaMaskConnector?.ready}
                        onClick={() =>
                            connect({ connector: metaMaskConnector })
                        }
                        label={metaMaskConnector?.name}
                    >
                        {isLoading &&
                            metaMaskConnector?.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </Button>
                ) : (
                    <React.Fragment>
                        <div
                            className="text-sm ml-auto rounded-full ring-1 ring-slate-600 px-3 py-1.5 bg-slate-800 cursor-pointer hover:bg-slate-700 transition-all"
                            onClick={(e) =>
                                setWalletSettingsEl(e.currentTarget)
                            }
                        >
                            <div className="text-xs">
                                {middleTruncation(address)}
                            </div>
                        </div>
                        <Popover
                            id={walletSettingsId}
                            open={openWalletSettings}
                            anchorEl={walletSettingsEl}
                            onClose={() => setWalletSettingsEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <div className="flex flex-col gap-3 text-sm">
                                <SecondaryText className="flex flex-col gap-1">
                                    Connected Wallet
                                    <PrimaryText className="flex items-center gap-3">
                                        <Img
                                            src="/assets/images/Metamask.png"
                                            width={14}
                                            height={14}
                                        />
                                        {middleTruncation(address)}
                                    </PrimaryText>
                                </SecondaryText>
                                <Button
                                    label="Disconnect Wallet"
                                    variant="secondary"
                                    className="!rounded-full"
                                    onClick={() => {
                                        disconnect();
                                        setWalletSettingsEl(null);
                                    }}
                                />
                            </div>
                        </Popover>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
