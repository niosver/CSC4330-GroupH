import { useAuth } from 'client/AuthContext';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Home: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();

    return (
        <>
            {auth.user ? (
                <>
                    <h1>{auth.user.email}</h1>
                    <button type="button" onClick={() => auth.signOut(() => history.push('/'))}>
                        sign out
                    </button>
                </>
            ) : (
                <h1>Error not logged in</h1>
            )}
        </>
    );
};
