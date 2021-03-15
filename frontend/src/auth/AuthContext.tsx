import React, { createContext } from 'react';
import { IAuth } from 'auth';
/**
 * Authentication context object to be supplied to Context.Provider.
 * Should only be used by Context.Provider
 *
 * @example
 * const auth = useAuth();
 * <AuthContext.Provider value={auth} children={...children}/>
 */
export const AuthContext = createContext<IAuth | undefined>(undefined);

/**
 * Authentication Context hook for global usage
 *
 * @example
 * const auth = useAuth();
 * const user: UserPublic = auth.user;
 */

export const useAuth = () => {
    const ctx = React.useContext(AuthContext);
    if (ctx === undefined) {
        throw new Error('useAuth must be used within a child component of AuthProvider');
    }
    return ctx;
};
