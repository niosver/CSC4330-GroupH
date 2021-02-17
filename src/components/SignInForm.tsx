import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { LoginChildProps, LoginState } from 'types/Login';
import { UserCreation, UserLogin } from 'types/User';

type SignInProps = LoginChildProps<UserLogin, UserCreation> & { state: LoginState };

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
