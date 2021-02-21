import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const times = [
    {
        value: '30',
        label: '30 minutes',
    },
    {
        value: '1',
        label: '1 Hour',
    },
    {
        value: '2',
        label: '2 Hours',
    },
    {
        value: '3',
        label: '3 Hours +',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    dropdown: {
        margin: theme.spacing(1),
        width: '25ch',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export const Transaction: React.FC = () => {
    const classes = useStyles();
    const [time, setCurrency] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="lg">
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                    Bike Transaction
                </Typography>
            </Container>
            <Container component="main" className={classes.main} maxWidth="lg">
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="time-rented"
                            select
                            label="Rent Time"
                            value={time}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select time rented"
                        >
                            {times.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>
                </form>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">My sticky footer can be found here.</Typography>
                </Container>
            </footer>
        </div>
    );
};
