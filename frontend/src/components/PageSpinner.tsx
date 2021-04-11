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
        top: '40%',
        left: '45%',
        position: 'absolute',
        margin: 'auto',
    },
}));
const loaderProps: LoaderProps = {
    type: 'TailSpin',
    radius: 1,
    height: '200px',
    color: '#3f51b5',
    width: '200px',
};
export const PageSpinner: React.FC = () => {
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
