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

//TODO: update and extract
type Props<T, U> = {
    formMethod: UseFormMethods<T>;
    onSubmit: (data: T | U) => void;
    classes: any;
    setState: any;
};
/* TODO
    - implement auth signup methods
    - update input fields to match expected data
        - birthday -> date picker
        - phone number -> number only field
    - implement error for existing account
*/
export const SignUpForm: React.FC<Props<UserCreation, UserLogin>> = (props) => {
    const { formMethod, onSubmit, classes, setState } = props;
    const { handleSubmit, errors, register } = formMethod;
    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h1" variant="h5">
                Sign Up
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                inputRef={register}
            />
            <p color="red">{errors.address?.message}</p>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone"
                inputRef={register}
            />
            <p color="red">{errors.phoneNumber?.message}</p>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="birthday"
                label="Birthday"
                name="birthday"
                autoComplete="birthday"
                inputRef={register}
            />
            <p color="red">{errors.birthday?.message}</p>

            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit(onSubmit)}
            >
                Sign Up
            </Button>
            <Grid container>
                <Grid item>
                    <Link variant="body2" onClick={() => setState({ signIn: true })}>
                        Already have an account? Sign In
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};
