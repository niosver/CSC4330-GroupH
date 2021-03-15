import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'auth';
import { UserRole } from 'types/User';

type AuthGuardProps = {
    children: React.ReactNode;
    path: string;
    authRedirect: string;
    redirect: string;
    account_type: UserRole;
};
export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const { children, path, authRedirect, redirect, account_type } = props;
    const auth = useAuth();
    return (
        <Route
            path={path}
            render={({ location }) => {
                if (
                    auth.user &&
                    (account_type == UserRole.Any || auth.user.account_type == account_type)
                ) {
                    /* IF user is authenticated and has access to route
                       THEN render route
                    */
                    return children;
                } else if (auth.user) {
                    /* IF user is authenticated but does NOT have access to route
                       THEN render redirected route to authenticated home
                    */
                    return (
                        <Redirect
                            to={{
                                pathname: authRedirect,
                                state: { from: location },
                            }}
                        />
                    );
                } else {
                    /* IF user is NOT authenticated
                       THEN render redirected route to unauthenticated home
                    */
                    return (
                        <Redirect
                            to={{
                                pathname: redirect,
                                state: { from: location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
