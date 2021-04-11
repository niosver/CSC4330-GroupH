import { Container, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Header from '../components/LandingPage/Header';
import Slogan from '../components/LandingPage/Slogan';
import Strengths from '../components/LandingPage/Strengths';
import Features from '../components/LandingPage/Features';
import Testimonials from '../components/LandingPage/Testimonials';
import Pricing from '../components/LandingPage/Pricing';
import MeetTeam from '../components/LandingPage/MeetTeam';
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
    { title: 'About us', url: '#' },
    { title: 'Locations', url: '#' },
    { title: 'Contact Us', url: '#' },
];

const slogan = {
    title: 'Go the extra mile',
    description: 'Ride safe. Ride comfortable. Ride confident.',
    imgText: 'main image description',
    linkText: 'Sign up today',
};

export const Landing: React.FC = () => {
    const classes = useStyles();
    return (
        <>
            <Header title="BikeApp" sections={sections} />
            <Slogan post={slogan} />
            <Strengths />
            <Features />
            <Testimonials />
            <Pricing />
            <MeetTeam />
        </>
    );
};
