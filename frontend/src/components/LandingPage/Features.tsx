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
        backgroundImage: `url(https://cdn.discordapp.com/attachments/805944888121098311/830458595179102218/pexels-photo-5465176.png)`,
        marginBottom: theme.spacing(5),
    },
    heroContent: {
        padding: theme.spacing(6, 0, 6),
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
    gridSize: {
        width: '75%',
    },
}));

const strengths = [
    {
        feature: '10 Docks with 3 bikes',
        description: ["Description of feature and why it's special"],
    },
    {
        feature: '30 bikes to choose from',
        description: ["Description of feature and why it's special"],
    },
    {
        feature: 'x years of experience',
        description: ["Description of feature and why it's special"],
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
                        Bike App Features
                    </Typography>
                </Container>
                {/* End hero unit */}
                <Grid container spacing={10} alignItems="flex-end">
                    {strengths.map((strength) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={strength.feature} xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader />
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <Typography
                                            component="h2"
                                            variant="h4"
                                            color="textPrimary"
                                            align="center"
                                        >
                                            {strength.feature}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
