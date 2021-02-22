import { UseFormMethods } from 'react-hook-form/dist/types';

/** Type for state held in Login component */
export type LoginState = {
    signIn: boolean;
    submission: {
        count: number;
        status: number;
        message: string;
    };
};
/** Type for required props of React child components rendered by Login component*/
export type LoginChildProps<T, U> = {
    formMethod: UseFormMethods<T>;
    onSubmit: (data: T | U) => void;
    classes: any;
};
