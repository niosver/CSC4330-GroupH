import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from './Auth';
import { AuthContext, useAuth } from './AuthContext';

const AuthInitializer: React.FC = ({ children }) => {
    const history = useHistory();
    const auth = useAuth();
    useEffect(() => {
        if (auth.user == null) {
            auth.init(() => history.push('./home'));
        }
    }, []);
    useEffect(() => {}, [auth.loading]);
    if (auth.loading) {
        return <div>loading...</div>;
    } else {
        return <>{children}</>;
    }
};
export const AuthProvider: React.FC = ({ children }) => {
    const auth = new Auth();
    return (
        <AuthContext.Provider value={auth}>
            <AuthInitializer>{children}</AuthInitializer>
        </AuthContext.Provider>
    );
};
