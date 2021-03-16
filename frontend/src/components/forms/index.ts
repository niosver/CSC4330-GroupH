import { SignInForm as _SignInForm } from './SignInForm';
import { SignUpForm as _SignUpForm } from './SignUpForm';
import { makeStyledForm } from './StyledForm';

const signInConstructorArgs = { message: "Don't have an account? Sign Up", path: './signup' };
const signUpConstructorArgs = { message: 'Already have an account? Sign In', path: './signin' };

export const SignInForm = makeStyledForm(_SignInForm, signInConstructorArgs);
export const SignUpForm = makeStyledForm(_SignUpForm, signUpConstructorArgs);
