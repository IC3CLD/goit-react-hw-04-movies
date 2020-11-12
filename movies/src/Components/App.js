import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Loader from './Loader';
import Header from "./Header";

const HomePage = lazy(()=>import('../Pages/HomePage'));
const MoviesPage =  lazy(()=>import('../Pages/MoviesPage'));
const MovieDetailsPage =  lazy(()=>import('../Pages/MovieDetailsPage'));

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Suspense fallback={<Loader/>}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage}></Route>
        </Suspense>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
