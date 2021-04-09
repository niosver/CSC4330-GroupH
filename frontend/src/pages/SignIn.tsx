import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'context/auth';
import { SignInForm } from 'components/forms';
import React from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { HomePath } from 'Routes';
import { LoginState } from 'types/Login';
import { UserLogin, userLoginSchema } from 'types/User';

export const SignIn: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();
    const [state, setState] = React.useState<LoginState>({
        submissionError: '',
    });

    const signInFormMethod: UseFormMethods<UserLogin> = useForm({
        resolver: zodResolver(userLoginSchema),
    });
    const onSubmit = async (data: UserLogin) => {
        const status = await auth.signIn(data as UserLogin, () => history.push(HomePath));
        if (!status) {
            setState({
                submissionError: 'Incorrect username or password',
            });
        }
    };

    return (
        <SignInForm
            formMethod={signInFormMethod}
            onSubmit={onSubmit}
            submissionError={state.submissionError}
        />
    );
};
