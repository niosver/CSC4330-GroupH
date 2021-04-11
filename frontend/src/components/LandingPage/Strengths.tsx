import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import strengths_img from '../../assets/strengths_img.png';
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded';
import SecurityRoundedIcon from '@material-ui/icons/SecurityRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundImage: `url(${strengths_img})`,
        //spacing(top, right, bottom, left )
        padding: theme.spacing(8, 0, 8, 0),
    },
    heroContent: {
        padding: theme.spacing(6, 0, 6),
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
        transform: 'scale(0.8)',
    },
    cardTitle: {
        paddingLeft: theme.spacing(1),
    },
    cardRoot: {
        transform: 'scale(0.8)',
        backgroundColor: 'transparent',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        // marginBottom: theme.spacing(1),
        transform: 'scale(0.9)',
    },
    sectionTitle: {
        color: 'white',
    },
    container: {
        flexGrow: 1,
    },
}));

// component="h1"
// variant="h2"
// align="center"
// color="textPrimary"
// gutterBottom

const strengths = [
    {
        title: ' Instant Booking',
        description:
            'Guaranteed reservations in the time and place you need it. Get instant confirmation of your bike.',
        icon: FlashOnRoundedIcon,
    },
    {
        title: 'Competitive Rates',
        description:
            'We keep track of our competitors to make sure you get the best rate for bikes in our area.',
        icon: MonetizationOnRoundedIcon,
    },
    {
        title: ' Safe & Secure',
        description:
            'We qualify and only work with the best bike stores in the nation. Easy secure online check-out.',
        icon: SecurityRoundedIcon,
    },
];

export default function Strengths() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.paper}>
                {/* Hero unit */}
                {/* <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <Typography className={classes.sectionTitle} align="center" variant="h3">
                        What makes us special?
                    </Typography>
                </Container> */}
                {/* End hero unit */}
                <Grid
                    container
                    className={classes.container}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {strengths.map((strength) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={strength.title} xs={3} md={3} lg={3}>
                            <Card elevation={0} className={classes.cardRoot}>
                                <CardHeader
                                    title={
                                        <div className={classes.cardHeader}>
                                            <strength.icon fontSize="large" />
                                            <Typography
                                                variant="h4"
                                                align="center"
                                                className={classes.cardTitle}
                                            >
                                                {strength.title}
                                            </Typography>
                                        </div>
                                    }
                                ></CardHeader>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h5" align="center">
                                        {strength.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </React.Fragment>
    );
}
