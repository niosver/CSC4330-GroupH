import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { UseFormMethods } from 'react-hook-form/dist/types/form';
import { UserCreation, UserLogin } from 'types/User';

type LoginState = {
    signIn: boolean;
    submission: {
        count: number;
        status: number;
        message: string;
    };
};
type Props<T, U> = {
    formMethod: UseFormMethods<T>;
    onSubmit: (data: T | U) => void;
    classes: any;
    setState: React.Dispatch<React.SetStateAction<LoginState>>;
    state: LoginState;
};
export const SignInForm: React.FC<Props<UserLogin, UserCreation>> = (props) => {
    const { formMethod, onSubmit, classes, setState, state } = props;
    const { handleSubmit, errors, register, formState } = formMethod;
    React.useEffect(() => {
        console.log(state);
    }, [state]);
    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit, undefined)}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register}
            />
            <p color="red">{errors.email?.message}</p>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
            />
            <p color="red">{errors.password?.message}</p>

            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            {state.submission.count > 0 && state.submission.message ? (
                <p>{state.submission.message}</p>
            ) : null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit(onSubmit)}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                    <Link
                        variant="body2"
                        onClick={() =>
                            setState((prevState) => ({
                                signIn: false,
                                submission: prevState.submission,
                            }))
                        }
                    >
                        Don&#39;t have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};
