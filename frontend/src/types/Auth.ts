import type { UserPublic } from './User';

export enum AuthActionType {
    INIT = 'INIT',
    INIT_COMPLETE = 'INIT_COMPLETE',
    INIT_ERROR = 'INIT_ERROR',
    SIGNUP_REQUEST = 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_ERROR = 'SIGNUP_ERROR',
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT = 'LOGOUT',
}
export type AuthState = {
    user: UserPublic | null;
    loading: boolean;
    error: Error | null;
};
export type AuthPayload = {
    userPublic: UserPublic | null;
};
export type AuthAction = {
    type: AuthActionType;
    payload: AuthPayload;
    error: Error | null;
};
