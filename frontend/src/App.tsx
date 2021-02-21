import { AuthGuard } from 'auth/AuthGuard';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContext, useAuth } from './auth/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Transaction } from './pages/Transaction';

const App: React.FC = () => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard children={null}/>
                    </Route>
                    <Route exact path="/transaction">
                        <Transaction children={null}/>
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
