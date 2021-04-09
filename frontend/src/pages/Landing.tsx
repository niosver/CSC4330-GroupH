import { Container, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex start',
    },
}));

const sections = [
    { title: 'About us', url: '#'},
    { title: 'Locations', url: '#' },
    { title: 'Contact Us', url: '#' },
];


export const Landing: React.FC = () => {
    const classes = useStyles();
    return (
        <>
            <Header title="BikeApp" sections={sections}/>
            <Container className={classes.paper}>
                <Typography variant="h1">Bike App</Typography>
                <Typography variant="body1">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente odit
                    repellat numquam. Quae rerum minima fugit ab consequuntur corporis fugiat
                    tempore, beatae quidem dignissimos est necessitatibus? Ex, dolores quam!
                </Typography>
            </Container>
        </>
    );
};
