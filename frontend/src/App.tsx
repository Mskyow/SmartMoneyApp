import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootComponent from './components/auth';
import WatchList from './components/watchlist/watchlist';
import AddressPage from './components/addressPage/AddressPage';
import Home from './components/home/';

// Создаем тему Material-UI
const theme = createTheme();

function App() {
    // Используем devnet для тестирования
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Подключаем кошельки
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                        <div className="App">
                            <Routes>
                                <Route element={<PrivateRoute />}>
                                    <Route path="/" element={<Home />} />
                                </Route>

                                <Route path="login" element={<AuthRootComponent />} />
                                <Route path="register" element={<AuthRootComponent />} />

                                <Route element={<PrivateRoute />}>
                                    <Route path="/watchlist">
                                        <Route index element={<WatchList />} />
                                        <Route path="address/:addressId" element={<AddressPage />} />
                                    </Route>
                                </Route>
                            </Routes>
                        </div>
                    </WalletDialogProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    );
}

export default App;