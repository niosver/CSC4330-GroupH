import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({}));

const testimonials = [
    {
        avatar: 'P1',
        content:
            't labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
            ' quis nostrud exercitation ullamco laboris nisi ut aliquip ' +
            ' cupidatat non proident, sunt in culpa qui officia ' +
            ' deserunt mollit anim id est laborum.',
    },
    {
        avatar: 'P2',
        content:
            ' eu fugiat nulla pariatur. Excepteur sint occaecat ' +
            ' cupidatat non proident, sunt in culpa qui officia ' +
            ' deserunt mollit anim id est laborum.',
    },
    {
        avatar: 'P3',
        content:
            'ex ea commodo consequat. Duis aute irure dolor in ' +
            ' reprehenderit in voluptate velit esse cillum dolore ' +
            ' eu fugiat nulla pariatur. Excepteur sint occaecat ',
    },
];

export default function Testimonials() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container>

            </Container>
            <Paper>
                <Grid spacing={5} alignItems='flex-end'>
                {testimonials.map((testimonial) => (
                    <Grid item key={testimonial.content}>
                        <Paper>
                            <Avatar>{testimonial.avatar}</Avatar>
                            <Typography>{testimonial.content}</Typography>
                        </Paper>
                    </Grid>
                ))}
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
