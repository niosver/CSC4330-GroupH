import { makeStyles } from '@material-ui/core';
import React from 'react';
import Loader from 'react-loader-spinner';
import type { LoaderProps } from 'react-loader-spinner';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'block',
        textAlign: 'center',
    },
    spinner: {
        position: 'relative',
        margin: 'auto',
    },
}));
const loaderProps: LoaderProps = {
    type: 'TailSpin',
    radius: 1,
    height: '50px',
    color: '#3f51b5',
    width: '50px',
};
export const ContentSpinner: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Loader
                {...loaderProps}
                /* @ts-ignore: react-loader-spinner uses outdated type definitions */
                className={classes.spinner}
                // style={{  } as React.CSSProperties}
            />
        </div>
    );
};
