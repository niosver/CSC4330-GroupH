import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider, AuthGuard } from 'auth';
import { Home, Landing, SignIn, SignUp } from 'pages';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <AuthGuard path="/home" redirect="/">
                        <Home />
                    </AuthGuard>
                </Switch>
            </AuthProvider>
        </Router>
    );
};
export default App;
