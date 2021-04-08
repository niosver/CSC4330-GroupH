import Typography, { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';

type Props = TypographyProps;
const Title: React.FC<Props> = ({ children }, props) => {
    return (
        <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            {...props}
            style={{ paddingLeft: 16, paddingBottom: 16 }} // temp styling adjustment
        >
            {children}
        </Typography>
    );
};
export default Title;
