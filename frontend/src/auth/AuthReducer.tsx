import type { Reducer } from 'react';
import { AuthAction, AuthLoadingState } from 'types/Auth';
import { AuthActionType } from 'types/Auth';

export const AuthReducer: Reducer<AuthLoadingState, AuthAction> = (prevState: any, action: any) => {
    switch (action.type) {
        case AuthActionType.BEGIN_LOADING:
            return { ...prevState, loading: true };
        case AuthActionType.END_LOADING:
            return { ...prevState, loading: false };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
