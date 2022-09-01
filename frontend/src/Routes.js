import React from 'react';
import { Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import { Redirect, Switch } from 'react-router-dom';

function Routes({ login, signup, getMoviesByQuery }) {
    return (
      <div>
      <Switch>
        <Route exact path="/"><Home login={login} signup={signup} getMoviesByQuery={getMoviesByQuery}/></Route>
        <Route exact path="/login"><Login login={login}/></Route>
        <Route exact path="/signup"><Signup signup={signup}/></Route>
        <ProtectedRoute exact path="/profile"><Profile /></ProtectedRoute>
        <Redirect to="/" />
      </Switch>
      </div>
    );
  };

export default Routes;




