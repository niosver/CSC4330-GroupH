import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HomePath } from 'Routes';
import { Auth } from './Auth';
import { AuthContext, useAuth } from './AuthContext';

const AuthInitializer: React.FC = ({ children }) => {
    const location = useLocation();
    const history = useHistory();
    const auth = useAuth();
    useEffect(() => {
        console.log(history);
        console.log(location);
        if (auth.user == null) {
            const path =
                location.pathname.match(/\/dashboard/) || location.pathname.match(/\/dev/)
                    ? location.pathname
                    : HomePath;
            auth.init(() => history.replace(path));
        }
    }, []);
    /* TODO: make loading work to fix bug */
    if (auth.loading) {
        // return <div>loading...</div>;
        return <>{children}</>;
    } else {
        return <>{children}</>;
    }
};
const auth = new Auth();
export const AuthProvider: React.FC = ({ children }) => {
    return (
        <AuthContext.Provider value={auth}>
            <AuthInitializer>{children}</AuthInitializer>
        </AuthContext.Provider>
    );
};
