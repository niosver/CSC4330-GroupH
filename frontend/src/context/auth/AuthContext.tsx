import React, { createContext } from 'react';
import { IAuth } from 'context/auth';
import { AuthAction, AuthLoadingState } from 'types/Auth';
import type { Dispatch } from 'react';
/**
 * Authentication context object to be supplied to React context provider.
 * Should only be used by Context.Provider inside auth module
 */
export const AuthContext = createContext<IAuth | undefined>(undefined);

/**
 * Authentication context hook for global usage
 *
 * @returns {IAuth} instance of Auth class
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

/**
 * Authentication loading state context object to be supplied to React context provider.
 * Should only be used by Context.Provider inside auth module
 */
export const AuthLoadingStateContext = createContext<AuthLoadingState | undefined>(undefined);

/**
 * Authentication loading state context hook for private usage inside auth module
 * @returns {AuthLoadingState} instance of {loading: boolean} object
 */
export const useAuthLoadingState = () => {
    const ctx = React.useContext(AuthLoadingStateContext);
    if (ctx === undefined) {
        throw new Error(
            'useAuthLoadingState must be used within a child component of AuthProvider'
        );
    }
    return ctx;
};

/**
 * Authentication loading dispatch context object to be supplied to React context provider.
 * Should only be used by AuthDispatchContext.Provider inside auth module
 */
export const AuthDispatchContext = createContext<Dispatch<AuthAction> | undefined>(undefined);

/**
 * Authentication Loading Dispatch Context hook for private usage inside auth module
 * @returns {Dispatch<AuthAction>} React dispatch function for React.useReducer
 */
export const useAuthDispatch = () => {
    const ctx = React.useContext(AuthDispatchContext);
    if (ctx === undefined) {
        throw new Error('useAuthDispatch must be used within a child component of AuthProvider');
    }
    return ctx;
};
