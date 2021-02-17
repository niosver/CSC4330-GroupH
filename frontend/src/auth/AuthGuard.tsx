import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

type AuthGuardProps = {
    children: React.ReactNode;
    path: string;
};
export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const { children, path } = props;
    const auth = useAuth();
    return (
        <Route
            path={path}
            render={({ location }) =>
                auth.user ? (
                    { children }
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
