import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useAuth } from 'context/auth';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDashStyles } from 'context/styles';
import { UserPublic } from 'types/User';
import { NavDrawer } from '../components/NavDrawer';

// function preventDefault(event: { preventDefault: () => void }) {
//     event.preventDefault();
// }

export const Dashboard: React.FC = ({ children }) => {
    const classes = useDashStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const auth = useAuth();
    const history = useHistory();

    const temp = (user: UserPublic) => (
        <>
            <h1>{user!.username}</h1>
            <Button
                color="secondary"
                type="button"
                onClick={() => auth.signOut(() => history.push('/'))}
            >
                sign out
            </Button>
        </>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <NavDrawer
                variant="permanent"
                classes={{
                    ...classes,
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
                handleDrawerClose={handleDrawerClose}
                account_type={auth.user?.account_type}
            />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {/* BEGIN temporary email + sign-out button */}
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {auth.user ? temp(auth.user) : <h1>Error not logged in</h1>}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                {/* END */}
                <Container maxWidth="lg" className={classes.container}>
                    {/* BEGIN CONTENT*/}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                    {/* END CONTENT*/}
                    {/* <Box pt={4}>
                        <Link color="primary" href="#" onClick={preventDefault}>
                            About us
                        </Link>
                    </Box> */}
                </Container>
            </main>
        </div>
    );
};
