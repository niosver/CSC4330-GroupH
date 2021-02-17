import { AuthGuard } from 'auth/AuthGuard';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContext, useAuth } from './auth/AuthContext';

const App: React.FC = () => {
    const auth = useAuth();
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
