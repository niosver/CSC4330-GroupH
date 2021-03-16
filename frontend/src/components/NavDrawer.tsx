import {
    Drawer,
    DrawerProps,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React from 'react';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
const NavRoutes = [
    {
        title: 'Account',
        icon: <AccountBoxRoundedIcon />,
        path: '/dashboard/account',
    },
    {
        title: 'Home',
        icon: <HomeRoundedIcon />,
        path: '/dashboard/home',
    },
    {
        title: 'Transactions',
        icon: <HistoryRoundedIcon />,
        path: '/dashboard/transactions',
    },
    {
        title: 'Docks',
        icon: <DirectionsBikeRoundedIcon />,
        path: '/dashboard/docks',
    },
];

type Props = { classes: any; handleDrawerClose: () => void };
type NavDrawerProps = DrawerProps & Props;
export const NavDrawer: React.FC<NavDrawerProps> = (props: NavDrawerProps) => {
    const { classes, handleDrawerClose, ...drawerProps } = props;
    console.log(drawerProps);

    return (
        <Drawer {...drawerProps} classes={{ paper: classes.paper }}>
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                {NavRoutes.map(({ title, icon, path }, idx) => (
                    <ListItem button key={idx} component={Link} to={path}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
