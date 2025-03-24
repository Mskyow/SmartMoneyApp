import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddressPage from './components/addressPage/AddressPage';
import AuthRootComponent from './components/auth';
import Home from './components/home/';
import WatchList from './components/watchlist/watchlist';
import PrivateRoute from './utils/router/privateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>}/>
        </Route>

        <Route path='login' element={<AuthRootComponent/>}/>
        <Route path='register' element={<AuthRootComponent/>}/>

        <Route element={<PrivateRoute/>}>
          <Route path='/watchlist'>
            <Route index element={<WatchList/>}/>
            <Route path='address/:addressId' element={<AddressPage/>}>
            </Route>
          </Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
