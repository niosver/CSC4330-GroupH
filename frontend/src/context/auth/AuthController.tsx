import { useAuth } from 'context/auth';
import { PageSpinner } from 'components/PageSpinner';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HomePath } from 'Routes';
import { useAuthLoadingState } from './AuthContext';
/**
 * Controller component for conditionally rendering children components when Auth is not loading
 *
 * @returns {React.ReactNode}
 *   Spinner component if authState.loading = true
 * | Children components if authState.loading = false
 */
export const AuthController: React.FC = ({ children }) => {
    const location = useLocation();
    const history = useHistory();
    const auth = useAuth();
    const authState = useAuthLoadingState();
    const [loading, setLoading] = useState<boolean>(true);

    /* invoked on mount in component lifecycle */
    useEffect(() => {
        (async () => {
            if (auth.user == null) {
                // small hack for using location/history hooks to keep track of relevant url paths
                const path =
                    location.pathname.match(/\/dashboard/) || location.pathname.match(/\/dev/)
                        ? location.pathname
                        : HomePath;
                // attempt sign-in using http-only cookie
                await auth.init(() => history.replace(path));
            }
        })();
    }, []);

    /* invoked when authState updates. invoking setLoading triggers component update */
    useEffect(() => {
        setLoading(authState.loading);
    }, [authState.loading]);

    if (loading) {
        return <PageSpinner />;
    } else {
        return <>{children}</>;
    }
};
