import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserCreation, userCreationSchema, UserLogin, userLoginSchema } from 'types/User';
import { useAuth } from 'hooks/AuthContext';
import { SignInForm } from 'components/SignInForm';
import { SignUpForm } from 'components/SignUpForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
type LoginState = {
    signIn: boolean;
    submission: {
        count: number;
        status: number;
        message: string;
    };
};
export const Login: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();
    const classes = useStyles();
    const [state, setState] = React.useState<LoginState>({
        signIn: true,
        submission: { count: 0, status: 0, message: '' },
    });

    const signInFormMethod: UseFormMethods<UserLogin> = useForm({
        resolver: zodResolver(userLoginSchema),
    });
    const signUpFormMethod: UseFormMethods<UserCreation> = useForm({
        resolver: zodResolver(userCreationSchema),
    });
    const onSubmit = async (data: UserLogin | UserCreation) => {
        console.log(data);
        if (state.signIn) {
            const status = await auth.signIn(data, () => history.push('/home'));
            if (!status) {
                setState((prevState) => ({
                    signIn: prevState.signIn,
                    submission: {
                        count: prevState.submission.count + 1,
                        status: 401,
                        message: 'Incorrect username or password',
                    },
                }));
            }
        } else {
            // TODO
            // auth.signUp(data, () => history.push('/home'));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                {state.signIn ? (
                    <SignInForm
                        formMethod={signInFormMethod}
                        classes={classes}
                        onSubmit={onSubmit}
                        setState={setState}
                        state={state}
                    />
                ) : (
                    <SignUpForm
                        formMethod={signUpFormMethod}
                        classes={classes}
                        onSubmit={onSubmit}
                        setState={setState}
                    />
                )}
            </div>
            <Box mt={8} />
        </Container>
    );
};
