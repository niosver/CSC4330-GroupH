import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContext, useAuth } from './hooks/AuthContext';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';

type AuthGuardProps = {
    Component: React.FC;
    path: string;
};
const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const { Component, path } = props;
    const auth = useAuth();
    return (
        <Route
            path={path}
            render={({ location }) =>
                auth.user ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
const App: React.FC = () => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <AuthGuard path="/home" Component={Home} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};
export default App;
