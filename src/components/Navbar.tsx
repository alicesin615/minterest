import { useAccount, useConnect } from 'wagmi';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Popover } from '@mui/material';
import { Button } from '@components/Buttons';
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

    const metaMaskConnector = connectors?.find(
        (connector) => connector?.id === 'metaMask'
    );

    return (
        <div className="sticky w-full backdrop-blur h-16 top-0 left-0 z-30 px-4 shadow-xl bg-system/60 border-b-system/10 border-b">
            <div className="mx-auto h-full items-center flex justify-center gap-6 w-4/5">
                <MinterestLogo />
                <NavbarLink label="Stake" to="/" />
                <NavbarLink label="Mint" to="/mint" />
                {!isConnected ? (
                    <Button
                        disabled={!metaMaskConnector?.ready}
                        onClick={() => connect({ metaMaskConnector })}
                        label={metaMaskConnector?.name}
                    >
                        {isLoading &&
                            metaMaskConnector?.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </Button>
                ) : (
                    <div className="text-sm ml-auto rounded-full ring-1 ring-slate-700 px-3 py-1.5 bg-slate-800">
                        <div className="text-xs">
                            {middleTruncation(address)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
