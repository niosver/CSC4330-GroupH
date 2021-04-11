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

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    paper: {
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(https://media.discordapp.net/attachments/805944888121098311/830457397985673256/pexels-photo-5914907.png?width=1025&height=683)`,
        marginBottom: theme.spacing(5),
    },
    heroContent: {
        padding: theme.spacing(6, 0, 6),
    },
    card: {
        opacity: '.7'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(4),
    },
    sectionTitle: {
        color: 'white',
    },
}));

// component="h1"
// variant="h2"
// align="center"
// color="textPrimary"
// gutterBottom

const strengths = [
    {
        title: 'Strength 1',
        attribute: 'Attribute 1',
        description: ["Description of attribute and why it's special"],
    },
    {
        title: 'Strength 2',
        attribute: 'Attribute 2',
        description: ["Description of attribute and why it's special"],
    },
    {
        title: 'Strength 3',
        attribute: 'Attribute 3',
        description: ["Description of attribute and why it's special"],
    },
];

export default function Strengths() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            {/* Hero unit */}
            <Paper className={classes.paper}>
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <Typography className={classes.sectionTitle} align="center" variant="h3">
                        What makes us special?
                    </Typography>
                </Container >
                {/* End hero unit */}
                <Grid container spacing={5} alignItems="flex-end">
                    {strengths.map((strength) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={strength.title} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title={strength.title}
                                    titleTypographyProps={{ align: 'center' }}
                                />
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            {strength.attribute}
                                        </Typography>
                                    </div>
                                    <ul>
                                        {strength.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
