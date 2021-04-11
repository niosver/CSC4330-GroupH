import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import slogan_img from '../../assets/slogan_img.jpeg';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(2),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${slogan_img})`,
        height: '60vh',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,.4)',
        height: 'inherit',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        transform: 'translateY(60%)',

        justifyContent: 'center',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    button: {
        color: 'white',
        backgroundColor: 'black',
    },
}));

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};

export default function MainFeaturedPost(props: { post: any }) {
    const classes = useStyles();
    const { post } = props;

    return (
        <Paper className={classes.mainFeaturedPost} style={{}}>
            {/* Increase the priority of the hero background image */}
            <div className={classes.overlay}>
                <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        {post.description}
                    </Typography>
                    <Button className={classes.button} href="#">
                        {post.linkText}
                    </Button>
                </div>
            </div>
        </Paper>
    );
}
