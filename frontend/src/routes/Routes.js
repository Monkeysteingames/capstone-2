import React from 'react';
import { Route } from "react-router-dom";
import Home from '../pages/Home';
import Search from '../pages/Search';
import LikedMovies from '../pages/LikedMovies';
import ProtectedRoute from '../routes/ProtectedRoute';
import Profile from '../pages/Profile';
import { Redirect, Switch } from 'react-router-dom';

function Routes() {
    return (
      <div>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <ProtectedRoute exact path="/profile"><Profile /></ProtectedRoute>
        <ProtectedRoute exact path="/search"><Search /></ProtectedRoute>
        <ProtectedRoute exact path="/liked-movies"><LikedMovies /></ProtectedRoute>
        <Redirect to="/" />
      </Switch>
      </div>
    );
  };

export default Routes;




