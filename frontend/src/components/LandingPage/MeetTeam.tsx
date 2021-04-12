import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const managers = [
    {
        first: 'Yehochanan',
        last: 'Narcissus',
        dockNumber: 'Dock 1',
    },
    {
        first: 'Natalya',
        last: 'Dezső',
        dockNumber: 'Dock 2',
    },
    {
        first: 'Leo',
        last: 'Norberto',
        dockNumber: 'Dock 3',
    },
    {
        first: 'Ramesh',
        last: 'Tihomir',
        dockNumber: 'Dock 4',
    },
    {
        first: 'Ljerka',
        last: 'Hanna',
        dockNumber: 'Dock 5',
    },
    {
        first: 'Margalit',
        last: 'Toufik',
        dockNumber: 'Dock 6',
    },
    {
        first: 'Ludvig Ángeles',
        last: 'María',
        dockNumber: 'Dock 7',
    },
    {
        first: 'Rolando',
        last: 'Shevaun',
        dockNumber: 'Dock 8',
    },
    {
        first: 'Juantxo',
        last: 'Ampelio',
        dockNumber: 'Dock 9',
    },
    {
        first: 'Haleigh',
        last: 'Aileen',
        dockNumber: 'Dock 10',
    },
];

export default function MeetTeam() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Meet our team members
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something here that describes what the team will be in charge of and
                            what should be expected of them
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {managers.map((manager, idx) => (
                            <Grid item key={idx} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <Avatar style={{ alignSelf: 'center' }}>
                                        {manager.first[0] + manager.last[0]}
                                    </Avatar>
                                    <CardContent className={classes.cardContent}>
                                        <Typography
                                            align="center"
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {`${manager.first} ${manager.last}`}
                                        </Typography>
                                        <Typography align="center">{manager.dockNumber}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
