import React from 'react';
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import AuthProvider from './hook/AuthProvider';
import PublicRoute from './components/PublicRoute';
import NotFoundPage from './pages/NotFoundPage'
import LogIn from './LogIn'
import Dashboard from './Dashboard';
import {routes} from './routes'
import LogInRoute from './components/LogInRoute';

export default function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
      <Switch>
          <PublicRoute exact path={routes.login} component={LogIn} />
          <LogInRoute extact path={routes.home} component={Dashboard}/>
          <Route path="*" component={NotFoundPage} />
      </Switch>
      </AuthProvider>
    </BrowserRouter> 
  );
}
