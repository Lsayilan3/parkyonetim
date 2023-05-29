import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import OrAcilises from './components/pages/orAcilises/OrAcilises';
import SpotCategory from './components/pages/spotCategory/SpotCategory'
import Spot from './components/pages/spot/Spot';
import AuthService from './components/pages/login/autservice';
import Pratik from './components/pages/orAcilises/Pratik';

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
  
  return (
    <>
    <Route exact path="/" component={Login} />
      <PrivateRoute path="/orAcilises" component={OrAcilises} />
      <PrivateRoute path="/spotCategory" component={SpotCategory} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/spot" component={Spot} />
      <PrivateRoute path="/pratik" component={Pratik} />
    </>      
  );
}

export default App;
