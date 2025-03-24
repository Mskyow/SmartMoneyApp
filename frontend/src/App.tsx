import { ThemeProvider, createTheme } from '@mui/material/styles';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddressPage from './components/addressPage/AddressPage';
import AuthRootComponent from './components/auth';
import Home from './components/home/';
import WatchList from './components/watchlist/watchlist';
import PrivateRoute from './utils/router/privateRoute';

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