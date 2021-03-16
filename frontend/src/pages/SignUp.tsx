import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'auth';
import { SignUpForm } from 'components/forms';
import React, { useEffect } from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { HomePath } from 'Routes';
import { LoginState } from 'types/Login';
import { UserCreation, userCreationSchema } from 'types/User';

/**
 * @todo
 *  - display errors on failed sign-up
 *
 */
export const SignUp: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();
    const [state, setState] = React.useState<LoginState>({
        loading: false,
        submissionError: null,
    });

    const formMethod: UseFormMethods<UserCreation> = useForm({
        resolver: zodResolver(userCreationSchema),
    });
    const onSubmit = async (data: UserCreation) => {
        const status = await auth.signUp(data, () => history.push(HomePath));
        if (!status) {
            setState((prevState) => ({
                ...prevState,
                submissionError: 'Error',
            }));
        } else {
            setState((prevState) => ({ ...prevState, submissionError: null }));
        }
    };
    useEffect(() => {
        setState((prevState) => ({ ...prevState, loading: auth.loading }));
        console.log(`auth_loading: ${auth.loading}`, `state_loading: ${state.loading}`);
    }, [auth.loading]);

    return (
        <>
            {state.loading ? (
                <div>loading</div>
            ) : (
                <SignUpForm
                    formMethod={formMethod}
                    onSubmit={onSubmit}
                    submissionError={state.submissionError}
                />
            )}
        </>
    );
};
