import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'auth';

type AuthGuardProps = {
    children: React.ReactNode;
    path: string;
    redirect: string;
};
export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const { children, path, redirect } = props;
    const auth = useAuth();
    return (
        <Route
            path={path}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: redirect,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
