export enum AuthActionType {
    BEGIN_LOADING = 'BEGIN_LOADING',
    END_LOADING = 'END_LOADING',
}
export type AuthLoadingState = {
    loading: boolean;
};
export type AuthAction = {
    type: AuthActionType;
};
