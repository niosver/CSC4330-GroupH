import { Box, Button, Container, CssBaseline, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormProps } from 'types/Login';

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
export type StyleFormProps<T> = Omit<FormProps<T>, 'classes'>;
export function makeStyledForm<T>(
    Component: React.FC<FormProps<T>>,
    args: { message: string; path: string }
) {
    return (props: StyleFormProps<T>) => {
        const classes = useStyles();
        const { submissionError, formMethod, onSubmit } = props;
        const { message, path } = args;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <div className={classes.paper}>
                    <Component
                        formMethod={formMethod}
                        classes={classes}
                        onSubmit={onSubmit}
                        submissionError={submissionError}
                    />

                    <Grid container>
                        <Grid item>
                            <Button component={Link} to={path}>
                                {message}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Box mt={8} />
            </Container>
        );
    };
}
