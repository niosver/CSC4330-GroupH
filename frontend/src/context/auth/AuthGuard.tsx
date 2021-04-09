import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'context/auth';
import { UserRole } from 'types/User';

type AuthGuardProps = {
    children: React.ReactNode;
    path: string;
    authRedirect: string;
    redirect: string;
    account_type: UserRole;
};
/**
 * Controller component for managing user access to restricted routes. Redirects unauthorized users to "authRedirect" path and
 * unauthenticated users to "redirect" path specified by props.
 *
 * Note: This component is for hiding page layouts to unauthenticated users. Child components should not contain sensitive data
 * or make any unsecure requests. Authentication is handled server-side and accessing any data should require authentication with the
 * server through requests with an attatched http-only cookie.
 *
 * @param {AuthGuardProps} props
 * @returns {React.ReactNode}
 *   Child component if user is authenticated and has access to route
 * | AuthRedirect component if user is authenticated and does NOT have access to route
 * | Redirect component if user is NOT authenticated
 */
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
