import { AuthGuard, AuthProvider } from 'context/auth';
import { PageSpinner } from 'components/PageSpinner';
import { Landing, SignIn, SignUp } from 'pages';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DashStylesProvider } from 'context/styles';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Routes } from './Routes';
import { Transaction } from './views/customer';

const App: React.FC = () => {
    Routes.forEach((route) => console.log(route.path));
    return (
        <Router>
            <AuthProvider>
                <DashStylesProvider>
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
                        {/* AUTHENTICATED ROUTES BEGIN*/}
                        {Routes.map((route, idx) => (
                            <AuthGuard
                                path={route.path}
                                redirect="/"
                                authRedirect="/dashboard/home"
                                key={idx}
                                account_type={route.account_type}
                            >
                                <Dashboard>
                                    <route.content />
                                </Dashboard>
                            </AuthGuard>
                        ))}
                        {/* AUTHENTICATED ROUTES END*/}

                        {/* DEV ROUTES BEGIN*/}
                        <Route path="/dev/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/dev/transaction">
                            <Transaction />
                        </Route>
                        <Route path="/dev/spinner">
                            <PageSpinner />
                        </Route>
                        {/* DEV ROUTES END */}
                    </Switch>
                </DashStylesProvider>
            </AuthProvider>
        </Router>
    );
};
export default App;
