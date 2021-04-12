import { Summary } from 'components/Summary';
import { useAuth } from 'context/auth/AuthContext';
import React from 'react';
import { useHistory } from 'react-router';
import { UserRole } from 'types/User';

export const Home: React.FC = () => {
    const auth = useAuth();
    const history = useHistory();
    const user = auth.user ? auth.user : { account_type: 'undefined' };
    switch (user.account_type) {
        case UserRole.Customer:
            return <Summary />;
        case UserRole.Manager:
            history.replace('/dashboard/verifypurchases');
            return null;
        case UserRole.Owner:
            history.replace('/dashboard/reports');
            return null;
        default:
            return <div>Error: not logged in</div>;
    }
};
