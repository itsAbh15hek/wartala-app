import React from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import SignIn from './pages/SignIn';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/home/index';
import PublicRoute from './components/PublicRoute';
import { ProfilePrvider } from './context/profile.context';

function App() {
  return (
    <ProfilePrvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfilePrvider>
  );
}

export default App;
