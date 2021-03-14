import { useAuth } from 'auth/AuthContext';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserPublic } from 'types/User';
import { Dashboard } from 'components/Dashboard';
import Button from '@material-ui/core/Button';
export const Home: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();

    const temp = (user: UserPublic) => (
        <>
            <h1>{user!.username}</h1>
            <Button
                color="secondary"
                type="button"
                onClick={() => auth.signOut(() => history.push('/'))}
            >
                sign out
            </Button>
        </>
    );

    return (
        <>{auth.user ? <Dashboard>{temp(auth.user)}</Dashboard> : <h1>Error not logged in</h1>}</>
    );
};
