import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useDashStyles } from 'context/styles';
import React from 'react';
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
                    {/* <IconButton color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
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
            />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
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
