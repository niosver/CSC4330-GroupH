import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Typography,
    Paper,
} from '@material-ui/core';
import { useAuth } from 'context/auth/AuthContext';
import React from 'react';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import { Return } from 'views/customer';
import { UserRole } from 'types/User';
const managers = [
    {
        first: 'Yehochanan',
        last: 'Narcissus',
        dockNumber: 1,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Natalya',
        last: 'Dezső',
        dockNumber: 2,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Leo',
        last: 'Norberto',
        dockNumber: 3,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Ramesh',
        last: 'Tihomir',
        dockNumber: 4,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Ljerka',
        last: 'Hanna',
        dockNumber: 5,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Margalit',
        last: 'Toufik',
        dockNumber: 6,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Ludvig Ángeles',
        last: 'María',
        dockNumber: 7,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Rolando',
        last: 'Shevaun',
        dockNumber: 8,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Juantxo',
        last: 'Ampelio',
        dockNumber: 9,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
    {
        first: 'Haleigh',
        last: 'Aileen',
        dockNumber: 10,
        phoneArea: 225,
        phoneNumber: 1234567,
    },
];

const useStyles = makeStyles((theme) => ({
    welcome: {
        paddingBottom: theme.spacing(6),
        textAlign: 'center',
    },
    return: {
        marginBottom: theme.spacing(6),
    },
    title: {
        textAlign: 'center',
        padding: theme.spacing(4, 4, 4, 4),
    },
    cardRoot: {
        width: '100%',
        height: '100%',
    },
    contactContainer: {
        display: 'flex',
    },
    contactContent: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(2),
    },
    icon: {
        color: theme.palette.primary.main,
    },
}));
export const Summary: React.FC = () => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <>
            <div className={classes.welcome}>
                <Typography variant="h3">Welcome back {auth.user?.username}</Typography>
            </div>
            <div className={classes.return}>
                <Return />
            </div>
            <div>
                <Paper>
                    <Typography variant="h4" className={classes.title}>
                        Contact a Manager
                    </Typography>
                    <Grid container direction="row" spacing={3}>
                        {managers.map((manager, idx) => (
                            <Grid item key={idx} xs={4}>
                                <Card className={classes.cardRoot}>
                                    <CardHeader
                                        avatar={
                                            <Avatar> {manager.first[0] + manager.last[0]}</Avatar>
                                        }
                                        title={`${manager.first} ${manager.last}`}
                                        titleTypographyProps={{ variant: 'h6' }}
                                    />
                                    <CardContent>
                                        <div className={classes.contactContainer}>
                                            <div className={classes.contactContent}>
                                                <ContactPhoneRoundedIcon className={classes.icon} />
                                            </div>

                                            <Typography
                                                variant="subtitle1"
                                                className={classes.contactContent}
                                            >
                                                {`${
                                                    manager.phoneArea
                                                }-${manager.phoneNumber
                                                    .toString()
                                                    .slice(
                                                        0,
                                                        3
                                                    )}-${manager.phoneNumber.toString().slice(3)}`}
                                            </Typography>
                                        </div>
                                        <div className={classes.contactContainer}>
                                            <div className={classes.contactContent}>
                                                <ContactMailRoundedIcon className={classes.icon} />
                                            </div>
                                            <Typography
                                                variant="subtitle1"
                                                className={classes.contactContent}
                                            >
                                                {`manager${manager.dockNumber}@bikeshop.com`}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </div>
        </>
    );
};
