import { useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { ethers } from 'ethers';
import { Button } from './Buttons';
import { MinterestIcon } from './Icons';

type NabarLinkProps = NavLinkProps & {
    to: string;
    label: string;
};
const NavbarLink = ({ to, label }: NabarLinkProps) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `px-3 py-1 flex items-center text-brand-primary-muted hover:bg-slate-600/20 hover:text-brand-primary h-fit cursor-pointer transition-all rounded ${
                isActive
                    ? '!text-brand-primary font-semibold bg-slate-600/20'
                    : ''
            }`
        }
    >
        {label}
    </NavLink>
);

export function Navbar() {
    const [defaultAcc, setDefaultAcc] = useState<string | null>(
        localStorage.getItem('connectedAcc') || null
    );
    const [accBalance, setAccBalance] = useState<string | null>(null);

    const openWallet = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    toggleAccount(String(result?.[0]));
                });
        } else {
            // no metamask extension installed
            window.open('https://metamask.io/download/', '_blank');
        }
    };

    const toggleAccount = (newAcc) => {
        setDefaultAcc(newAcc);
        getAccBalance(newAcc);
        localStorage.setItem('connectedAcc', newAcc);
    };

    const getAccBalance = (address: string) => {
        window.ethereum
            .request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then((balance) => {
                setAccBalance(ethers.formatEther(balance));
            });
    };

    window.ethereum.on('accountsChanged', toggleAccount);

    return (
        <div className="sticky w-full backdrop-blur h-16 top-0 left-0 z-30 px-4 shadow-xl">
            <div className="mx-auto h-full items-center flex justify-center gap-6 w-4/5">
                <MinterestIcon />
                <NavbarLink label="Stake" to="/" />
                <NavbarLink label="Mint" to="/mint" />
                {Boolean(defaultAcc) ? (
                    <div className="ml-auto rounded-full ring-2 ring-brand-primary px-3 py-1.5 bg-brand-primary-muted">
                        Connected
                    </div>
                ) : (
                    <Button
                        label="Connect Wallet"
                        className="ml-auto"
                        onClick={() => openWallet()}
                    />
                )}
            </div>
        </div>
    );
}
