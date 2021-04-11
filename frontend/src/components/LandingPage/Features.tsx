import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useIntersection, useInterval } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import feature_img from '../../assets/strengths_img.png';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${feature_img})`,
        height: '40vh',
    },
    heroContent: {
        padding: theme.spacing(6, 0, 6),
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(4),
        color: 'inherit',
    },
    sectionTitle: {
        color: 'white',
    },
    gridSize: {
        width: '75%',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,.6)',
        height: 'inherit',
    },
    cardRoot: {
        background: 'transparent',
        color: 'white',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        transform: 'translateY(60%)',
    },
}));

const stats = [
    {
        number: 10,
        unit: 'Locations in service',
    },
    {
        number: 30,
        unit: 'Bikes to choose from',
    },
    {
        number: 12,
        unit: 'years of experience',
    },
];

export default function Strengths() {
    const classes = useStyles();
    const [start, setStart] = useState(false);
    const counts = stats.map((stat) => useInterval(stat.number, start));
    const ref = useRef<HTMLDivElement | null>(null);
    const inViewport = useIntersection(ref);

    useEffect(() => {
        console.log('viewport: ', inViewport);
        if (inViewport) {
            setStart(true);
        }
    }, [inViewport]);
    useEffect(() => {
        console.log('start: ', start);
    }, [start]);
    return (
        <React.Fragment>
            <CssBaseline />
            {/* Hero unit */}
            <Paper className={classes.paper}>
                <div className={classes.overlay}>
                    {/* <Container maxWidth="sm" component="main" className={classes.heroContent}>
                        <Typography className={classes.sectionTitle} align="center" variant="h3">
                            Bike App Features
                        </Typography>
                    </Container> */}
                    {/* End hero unit */}
                    <Grid
                        container
                        className={classes.container}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        ref={ref}
                    >
                        {stats.map((strength, idx) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid item key={idx} xs={3} sm={3} md={3} lg={3}>
                                <Card className={classes.cardRoot} elevation={0}>
                                    <CardHeader
                                        className={classes.cardHeader}
                                        title={counts[idx]}
                                        titleTypographyProps={{ align: 'center', variant: 'h3' }}
                                    />
                                    <CardContent>
                                        <div className={classes.cardContent}>
                                            <Typography variant="h5" align="center">
                                                {strength.unit}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Paper>
        </React.Fragment>
    );
}
