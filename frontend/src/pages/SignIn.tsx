import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'auth';
import { SignInForm } from 'components/forms';
import React, { useEffect } from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { HomePath } from 'Routes';
import { LoginState } from 'types/Login';
import { UserLogin, userLoginSchema } from 'types/User';

export const SignIn: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();
    const [state, setState] = React.useState<LoginState>({
        loading: auth.loading,
        submissionError: '',
    });

    const signInFormMethod: UseFormMethods<UserLogin> = useForm({
        resolver: zodResolver(userLoginSchema),
    });
    const onSubmit = async (data: UserLogin) => {
        const status = await auth.signIn(data as UserLogin, () => history.push(HomePath));
        if (!status) {
            setState({
                loading: auth.loading,
                submissionError: 'Incorrect username or password',
            });
        } else {
            setState({ loading: auth.loading, submissionError: null });
        }
    };

    useEffect(() => {
        setState((prevState) => ({ ...prevState, loading: auth.loading }));
        console.log(`auth_loading: ${auth.loading}`, `state_loading: ${state.loading}`);
    }, [auth.loading]);

    return false ? (
        <div>loading...</div>
    ) : (
        <SignInForm
            formMethod={signInFormMethod}
            onSubmit={onSubmit}
            submissionError={state.submissionError}
        />
    );
};
