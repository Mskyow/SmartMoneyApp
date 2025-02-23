import React from 'react';
import Home from  './components/home/'
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootComponent from './components/auth';
import WatchList from './components/watchlist/watchlist';

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
          <Route path='/watchlist' element={<WatchList/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
