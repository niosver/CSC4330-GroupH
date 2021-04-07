import { UseFormMethods } from 'react-hook-form/dist/types';

/** Type for state held in Login component */
export type LoginState = {
    submissionError: string | null;
};
/** Type for required props of React child components rendered by Login component*/
export type FormProps<T> = {
    formMethod: UseFormMethods<T>;
    onSubmit: (data: T) => void;
    classes: any;
    submissionError: string | null;
};
