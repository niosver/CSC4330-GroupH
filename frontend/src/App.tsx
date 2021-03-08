import { AuthGuard } from 'auth/AuthGuard';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useFetch, FetchConfig } from 'UseFetch';
import './App.css';
import { AuthContext, useAuth } from './auth/AuthContext';

const App: React.FC = () => {
    const auth = useAuth();
    const config: FetchConfig = {
        url: './api/hello',
        method: 'GET',
    };
    const response = useFetch<string>(config);
    console.log('env=', process.env.NODE_ENV);
    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <AuthGuard path="/home">
                        <Home />
                    </AuthGuard>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};
export default App;
