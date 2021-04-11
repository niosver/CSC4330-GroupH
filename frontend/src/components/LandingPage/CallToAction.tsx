import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        flexDirection: "column",
        display: "flex",
        position: 'relative',
        justifyContent: "center",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(2),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://media.discordapp.net/attachments/805944888121098311/830457397985673256/pexels-photo-5914907.png?width=1025&height=683)`,

    },
    mainFeaturedPostContent: {
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    button: {
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'center',
        margin: 'auto',
        display: 'grid',
        fontSize: '2rem'
    }
}));

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};

export default function MainFeaturedPost(props: { post: any }) {
    const classes = useStyles();
    const { post } = props;

    return (
        <Paper
            className={classes.mainFeaturedPost}
            
        >
            <Grid container alignContent='center' alignItems='center' justify='center'>
                <Grid item md={2}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h5" color="inherit" align='center' gutterBottom>
                            Are you ready bike?
                        </Typography>
                        <Button className={classes.button} href="#">
                            Sign up now!
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}
