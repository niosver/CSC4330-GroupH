import { Container, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Header from '../components/LandingPage/Header';
import Slogan from '../components/LandingPage/Slogan'
import Strengths from '../components/LandingPage/Strengths'
import Features from '../components/LandingPage/Features'
import Testimonials from '../components/LandingPage/Testimonials'
import Owner from '../components/LandingPage/Owner'
import CallToAction from '../components/LandingPage/CallToAction'
import Pricing from '../components/LandingPage/Pricing'
import MeetTeam from '../components/LandingPage/MeetTeam'
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

const slogan = {
    title: 'Bike App slogan would go here',
    description:
      "Bike Application call to action goes here",
    image: 'https://images.pexels.com/photos/5807579/pexels-photo-5807579.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
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
            {/* <Testimonials /> */}

            <Pricing />
            <MeetTeam />
            {/* <Owner /> */}
            <CallToAction />
        </>
    );
};
