import { useAuth } from 'context/auth/AuthContext';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserPublic } from 'types/User';
import { Dashboard } from 'pages/Dashboard';
import Button from '@material-ui/core/Button';

export const Home: React.FC = () => {
    return <h1>Home works!</h1>;
};
