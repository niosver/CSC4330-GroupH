import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { SignUpPath } from 'Routes';
import strengths_img from '../../assets/strengths_img.png';
const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        // justifyContent: 'center',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${strengths_img})`,
        height: '50vh',
        marginBottom: '0vh',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,.6)',
        height: 'inherit',
    },
    mainFeaturedPostContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transform: 'translateY(60%)',

        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    button: {
        color: 'white',
        // backgroundColor: 'transparent',
        fontSize: '2rem',
        margin: '0 auto',
        display: 'block',
        zIndex: 1,
        '&:hover': {
            borderColor: 'white',
        },
    },
}));

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};

export default function MainFeaturedPost(props: { post: any }) {
    const classes = useStyles();
    const { post } = props;

    return (
        <div className={classes.mainFeaturedPost}>
            <div className={classes.overlay}>
                <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                        Are you ready to bike?
                    </Typography>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        component={Link}
                        to={SignUpPath}
                    >
                        Sign up now!
                    </Button>
                </div>
            </div>
        </div>
    );
}
