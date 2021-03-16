import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormProps } from 'types/Login';
import { UserCreation, UserLogin } from 'types/User';

type SignUpFormProps = FormProps<UserCreation>;
/**
 * @description Sign-up form component that renders account creation fields and maps the appropriate
 * props from passed from Login to the form onSubmit prop
 *
 * @todo
 * - implement auth signup methods
 * - update input fields to match expected data
 *      - phone number -> number only field
 * - implement error for existing account
 *
 * Adapted from:
 * @link {https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in}
 *
 * Autocomplete reference
 * @link {https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete-name}
 */
export const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const { formMethod, onSubmit, classes } = props;
    const { handleSubmit, errors, register } = formMethod;
    const defaultValue = {
        email: 'user2@email.com',
        username: 'user2',
        password: 'password',
        address: 'address',
        phoneNumber: '0123456789',
        firstName: 'first',
        lastName: 'last',
        cc_name: 'First Last',
        cc_number: 411111111111111,
        billing_address: 'address2',
    };
    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <TextField
                defaultValue={defaultValue.email} //test only
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
            <span className={classes.error}>{errors.email?.message}</span>
            <TextField
                defaultValue={defaultValue.username} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                inputRef={register}
            />
            <span className={classes.error}>{errors.username?.message}</span>
            <TextField
                defaultValue={defaultValue.password} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputRef={register}
            />
            <span className={classes.error}>{errors.password?.message}</span>
            <TextField
                defaultValue={defaultValue.password} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                inputRef={register}
            />
            <span className={classes.error}>{errors.confirmPassword?.message}</span>
            <TextField
                defaultValue={defaultValue.firstName} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="first_name"
                autoComplete="given-name"
                inputRef={register}
            />
            <span className={classes.error}>{errors.first_name?.message}</span>
            <TextField
                defaultValue={defaultValue.lastName} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                inputRef={register}
            />
            <span className={classes.error}>{errors.last_name?.message}</span>
            <TextField
                defaultValue={defaultValue.address} //test only
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
            <span className={classes.error}>{errors.address?.message}</span>
            <TextField
                defaultValue={defaultValue.phoneNumber} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel-national"
                type="tel"
                inputRef={register}
            />
            <span className={classes.error}>{errors.phoneNumber?.message}</span>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="birthdate"
                id="birthDate"
                defaultValue="1980-01-01"
                autoComplete="bday"
                inputRef={register}
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <span className={classes.error}>{errors.birthdate?.message}</span>
            <TextField
                defaultValue={defaultValue.cc_name} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cc_name"
                label="Cardholder Name"
                name="cc_name"
                autoComplete="name"
                inputRef={register}
            />
            <span className={classes.error}>{errors.cc_name?.message}</span>
            <TextField
                defaultValue={defaultValue.billing_address} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="billing_address"
                label="Billing Address"
                name="billing_address"
                autoComplete="billing street-address"
                inputRef={register}
            />
            <span className={classes.error}>{errors.billing_address?.message}</span>
            <TextField
                defaultValue={defaultValue.cc_number} //test only
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cc_number"
                label="CreditCard Number"
                name="cc_number"
                autoComplete="cc-number"
                inputRef={register}
            />
            <span className={classes.error}>{errors.cc_number?.message}</span>
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
        </form>
    );
};
