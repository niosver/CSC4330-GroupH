import type { Dispatch } from 'react';
import { AuthActionType } from 'types/Auth';
import type { AuthAction } from 'types/Auth';

/**
 * Wrapper for dispatching change in AuthLoadingState setting loading to true.
 *
 * @param {Dispatch<ActionType>} dispatch
 */
export const beginLoading = (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionType.BEGIN_LOADING });
};

const MINIMUM_LOADING_TIME = 0; // minimum loading time for smooth transition

/**
 * Wrapper for dispatching change in AuthLoadingState setting loading to false.
 *
 * @param {Dispatch<ActionType>} dispatch
 */
export const endLoading = (dispatch: Dispatch<AuthAction>) => {
    setTimeout(() => dispatch({ type: AuthActionType.END_LOADING }), MINIMUM_LOADING_TIME);
};
