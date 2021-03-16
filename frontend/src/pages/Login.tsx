import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'auth/AuthContext';
import { SignInForm } from 'components/SignInForm';
import { SignUpForm } from 'components/SignUpForm';
import React from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LoginState } from 'types/Login';
import { UserCreation, userCreationSchema, UserLogin, userLoginSchema } from 'types/User';

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
    error: {
        color: '#f44336',
    },
}));
/**
 * Controller component for sign-in and sign-up forms. Manages state for which form should be rendered
 * and submission count/status/response. Maps corresponding zod resolver to appropriate form and defines
 * submission handler for both forms.
 */
export const Login: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();
    const classes = useStyles();
    const [state, setState] = React.useState<LoginState>({
        signIn: true,
        submission: { count: 0, status: 0, message: '' },
    });
    const loginMessage = {
        signIn: "Don't have an account? Sign Up",
        signUp: 'Already have an account? Sign In',
    };
    const signInFormMethod: UseFormMethods<UserLogin> = useForm({
        resolver: zodResolver(userLoginSchema),
    });
    const signUpFormMethod: UseFormMethods<UserCreation> = useForm({
        resolver: zodResolver(userCreationSchema),
    });
    const onSubmit = async (data: UserLogin | UserCreation) => {
        console.log(data);
        if (!state.signIn) {
            const status = await auth.signUp(data as UserCreation);
            if (!status) {
                setState((prevState) => ({
                    signIn: prevState.signIn,
                    submission: {
                        count: prevState.submission.count + 1,
                        status: 401,
                        message: 'Error',
                    },
                }));
            }
        }
        if (state.signIn) {
            const status = await auth.signIn(data as UserLogin, () => history.push('/home'));
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
                        state={state}
                    />
                ) : (
                    <SignUpForm
                        formMethod={signUpFormMethod}
                        classes={classes}
                        onSubmit={onSubmit}
                    />
                )}
                <Grid container>
                    <Grid item>
                        <Link
                            variant="body2"
                            onClick={() =>
                                setState((prevState) => ({
                                    signIn: !prevState.signIn,
                                    submission: prevState.submission,
                                }))
                            }
                        >
                            {state.signIn ? loginMessage.signIn : loginMessage.signUp}
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8} />
        </Container>
    );
};
