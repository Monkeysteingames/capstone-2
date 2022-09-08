import React from 'react';
import { Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { Redirect, Switch } from 'react-router-dom';

function Routes({ login, signup, getMoviesByQuery }) {
    return (
      <div>
      <Switch>
        <Route exact path="/"><Home login={login} signup={signup} getMoviesByQuery={getMoviesByQuery}/></Route>
        <Route exact path="/login"><Login login={login}/></Route>
        <Route exact path="/signup"><Signup signup={signup}/></Route>
        <ProtectedRoute exact path="/profile"><Profile /></ProtectedRoute>
        <ProtectedRoute exact path="/search"><Profile /></ProtectedRoute>
        <Redirect to="/" />
      </Switch>
      </div>
    );
  };

export default Routes;




