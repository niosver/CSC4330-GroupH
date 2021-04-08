import React, { useReducer } from 'react';
import { AuthLoadingState } from 'types/Auth';
import { Auth } from './Auth';
import {
    AuthContext,
    AuthDispatchContext,
    AuthLoadingStateContext,
    useAuthDispatch,
} from './AuthContext';
import { AuthController } from './AuthController';
import { AuthReducer } from './AuthReducer';

/**
 * React context provider for useAuthLoadingState and useAuthDispatch hooks.
 *
 * @returns {React.ReactNode} child components
 */
const AuthLoadingProvider: React.FC = ({ children }) => {
    const initialAuthLoadingState: AuthLoadingState = { loading: true };
    const [state, dispatch] = useReducer(AuthReducer, initialAuthLoadingState);

    return (
        <AuthLoadingStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
        </AuthLoadingStateContext.Provider>
    );
};

/**
 * React context provider for useAuth hook.
 *
 * @returns {React.ReactNode} child components
 */
const AuthStateProvider: React.FC = ({ children }) => {
    const dispatch = useAuthDispatch();
    const auth = new Auth(dispatch);

    return (
        <AuthContext.Provider value={auth}>
            <AuthController>{children}</AuthController>
        </AuthContext.Provider>
    );
};

/**
 * Wrapper for React context providers to initialize Auth hooks. Should only be rendered once in App.tsx
 *
 * @returns {React.ReactNode} child components
 */
export const AuthProvider: React.FC = ({ children }) => {
    return (
        <AuthLoadingProvider>
            <AuthStateProvider>{children}</AuthStateProvider>
        </AuthLoadingProvider>
    );
};
