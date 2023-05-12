import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { Stake } from './pages/stake';
import { Home } from './pages/home';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stake" element={<Stake />} />
            </Routes>
            {/* <Navbar /> */}
        </QueryClientProvider>
    );
}

export default App;
