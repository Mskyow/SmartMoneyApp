import React from 'react';
import Home from  './components/home/'
import { Outlet, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootComponent from './components/auth';
import WatchList from './components/watchlist/watchlist';
import AddressPage from './components/addressPage/AddressPage';

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
