import {
    Avatar,
    Divider,
    Drawer,
    DrawerProps,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React from 'react';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link, useHistory } from 'react-router-dom';
import { UserPublic, UserRole } from 'types/User';
import { Routes } from '../Routes';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { useAuth } from 'context/auth';
import { useDashStyles } from 'context/styles';

const navRoutes_DEV = [
    //to be deprecated

    {
        title: 'Account',
        icon: <AccountBoxRoundedIcon />,
        path: '/dev/dashboard/account',
    },
    {
        title: 'Home',
        icon: <HomeRoundedIcon />,
        path: '/dev/dashboard/home',
    },
    {
        title: 'Transactions',
        icon: <HistoryRoundedIcon />,
        path: '/dev/dashboard/transactions',
    },
    {
        title: 'Docks',
        icon: <DirectionsBikeRoundedIcon />,
        path: '/dev/dashboard/docks',
    },
];
const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
    },
    avatar: {
        paddingLeft: theme.spacing(1.1),
    },
}));

type Props = {
    classes: any;
    handleDrawerClose: () => void;
};
type NavDrawerProps = DrawerProps & Props;

export const NavDrawer: React.FC<NavDrawerProps> = (props: NavDrawerProps) => {
    const { handleDrawerClose, classes: dashStyles, ...drawerProps } = props;
    const navDrawerStyles = useStyles();
    const classes = { ...dashStyles, ...navDrawerStyles };
    const auth = useAuth();
    const history = useHistory();
    const user = auth.user
        ? auth.user
        : ({ username: 'undefined', account_type: UserRole.Customer } as UserPublic);
    console.log(drawerProps);

    /* To be deprecated and replaced with error handling */
    const navRoutes = user.account_type
        ? Routes.filter(
              (route) =>
                  route.account_type === user.account_type || route.account_type === UserRole.Any
          ).map(({ title, icon, path }) => ({ title, icon, path }))
        : navRoutes_DEV;

    return (
        <Drawer {...drawerProps} classes={{ paper: classes.paper }}>
            <div className={classes.toolbarIcon}>
                {/* <div className={classes.avatar}>
                    <Avatar className={classes.small}>{user.username[0]}</Avatar>
                </div> */}
                <List>
                    <ListItem className={classes.avatar}>
                        <ListItemIcon>
                            <Avatar className={classes.small}>{user.username[0]}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                    </ListItem>
                </List>

                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />

            <List>
                {navRoutes.map(({ title, icon, path }, idx) => (
                    <ListItem button key={idx} component={Link} to={path}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
                <Divider />
                <ListItem
                    button
                    key={navRoutes.length}
                    onClick={() => auth.signOut(() => history.push('/'))}
                >
                    <ListItemIcon>
                        <ExitToAppRoundedIcon />
                    </ListItemIcon>
                    <ListItemText color="secondary" primary="Sign Out" />
                </ListItem>
            </List>
        </Drawer>
    );
};
