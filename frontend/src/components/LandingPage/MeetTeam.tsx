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
import Avatar from '@material-ui/core/Avatar'
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
        name: 'Yehochanan Narcissus',
        dockNumber: 'Dock 1'
      },
      {
        name: 'Natalya Dezső',
        dockNumber: 'Dock 2'
      },
      {
        name: 'Leo Norberto',
        dockNumber: 'Dock 3'
      },
      {
        name: 'Ramesh Tihomir',
        dockNumber: 'Dock 4'
      },
      {
        name: 'Ljerka Hanna',
        dockNumber: 'Dock 5'
      },
      {
        name: 'Margalit Toufik',
        dockNumber:'Dock 6'
      },
      {
        name: 'Ludvig María Ángeles',
        dockNumber: 'Dock 7'
      },
      {
        name: 'Rolando Shevaun',
        dockNumber: 'Dock 8'
      },
      {
        name: 'Juantxo Ampelio',
        dockNumber: 'Dock 9'
      },
      {
        name: 'Haleigh Aileen',
        dockNumber: 'Dock 10'
      }
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
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
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
              {managers.map((manager) => (
                <Grid item key={manager.name} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <Avatar style={{alignSelf: 'center'}}>{manager.name}</Avatar>
                    <CardContent className={classes.cardContent}>
                      <Typography align='center' gutterBottom variant="h5" component="h2">
                        {manager.name}
                      </Typography>
                      <Typography align='center'>
                        {manager.dockNumber}
                      </Typography>
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