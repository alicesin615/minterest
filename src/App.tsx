import './App.css';
import {
    WagmiConfig,
    createConfig,
    configureChains,
    sepolia,
    mainnet
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { infuraProvider } from 'wagmi/providers/infura';
import { Route, Routes, Router } from 'react-router-dom';
import { Stake } from './pages/stake';
import { Mint } from './pages/mint';
import { Navbar, WalletInfo } from './components';

function App() {
    const { chains, publicClient } = configureChains(
        [mainnet],
        [
            infuraProvider({ apiKey: process.env.INFURA_PUBLIC_KEY }),
            publicProvider()
        ]
    );

    const config = createConfig({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({
                chains
            })
        ],
        publicClient
    });

    return (
        <WagmiConfig config={config}>
            <Navbar />
            <main className="p-6 pt-12 flex flex-col gap-6 w-3/5 mx-auto">
                <WalletInfo />
                <Routes>
                    <Route path="/" element={<Stake />} />
                    <Route path="/mint" element={<Mint />} />
                </Routes>
            </main>
        </WagmiConfig>
    );
}

export default App;
