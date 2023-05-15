import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, Router } from 'react-router-dom';
import { Stake } from './pages/stake';
import { Mint } from './pages/mint';
import { Navbar } from './components';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<Stake />} />
                    <Route path="/mint" element={<Mint />} />
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
