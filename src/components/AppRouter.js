import React from 'react';
import { applyRouterMiddleware, hashHistory, Router, Route, IndexRoute } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppFrame from './AppFrame';
import AppContent from './AppContent';
import Home from '../view/Home';
import { browserHistory } from 'react-router';

export default function AppRouter() {
  return (
    <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
      <Route title="Dextra" path="/" component={AppFrame}>
        <IndexRoute dockDrawer component={Home} title={null} />

        <Route title="HOME" path="/home" nav component={AppContent}>
          <Route title="Visão Geral" path="/" nav component={AppContent} />
        </Route>

      </Route>
    </Router>
  );
}
