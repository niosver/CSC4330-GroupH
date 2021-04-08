import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function Title(props: { children: React.ReactNode }) {
    return (
        <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            style={{ paddingLeft: 16, paddingBottom: 16 }} // temp styling adjustment
        >
            {props.children}
        </Typography>
    );
}
