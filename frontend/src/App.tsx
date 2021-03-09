import { AuthGuard } from 'auth/AuthGuard';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { AuthContext, useAuth } from './auth/AuthContext';

const App: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();
    React.useEffect(() => {
        auth.init(() => history.push('./home'));
    }, []);
    return (
        <AuthContext.Provider value={auth}>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <AuthGuard path="/home">
                    <Home />
                </AuthGuard>
            </Switch>
        </AuthContext.Provider>
    );
};
export default App;
