import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Color } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));
type Props = {
    severity: Color;
    message: string;
};

export const Alert: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { severity, message } = props;
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        console.log(reason);
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert elevation={6} variant="filled" severity={severity} onClose={handleClose}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};
