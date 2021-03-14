import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormProps, LoginState } from 'types/Login';
import { UserCreation, UserLogin } from 'types/User';

/** Extends LoginChildProps type to specify property LoginState */
type SignInProps = FormProps<UserLogin>;

/**
 * @description Sign-in form component that renders login fields and maps the appropriate
 * props from passed from Login to the form onSubmit prop
 *
 * Adapted From:
 * @link {https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in}
 */
export const SignInForm: React.FC<SignInProps> = (props) => {
    const { formMethod, onSubmit, classes, submissionError } = props;
    const { handleSubmit, errors, register } = formMethod;
    // Log state on change
    // React.useEffect(() => {
    //     console.log(state);
    // }, [state]);
    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                inputRef={register}
            />
            <p color="red">{errors.username?.message}</p>
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
            {submissionError != null ? <p>{submissionError}</p> : null}
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
        </form>
    );
};
