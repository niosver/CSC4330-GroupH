import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { CustomerView, ManagerView, OwnerView, SharedView } from './views';
import { UserRole } from 'types/User';
import React from 'react';

export const Routes = [
    /* Shared View */
    {
        title: 'Home',
        icon: <HomeRoundedIcon />,
        path: '/dashboard/home',
        content: SharedView.Home,
        account_type: UserRole.Any,
    },
    {
        title: 'Account',
        icon: <AccountBoxRoundedIcon />,
        path: '/dashboard/account',
        content: SharedView.Account,
        account_type: UserRole.Any,
    },

    /* Customer View */

    {
        title: 'Transactions',
        icon: <HistoryRoundedIcon />,
        path: '/dashboard/transactions',
        content: CustomerView.Transaction,
        account_type: UserRole.Customer,
    },
    {
        title: 'Rent',
        icon: <DirectionsBikeRoundedIcon />,
        path: '/dashboard/rent',
        content: CustomerView.Rent,
        account_type: UserRole.Customer,
    },
    {
        title: 'Return',
        icon: <LocalOfferRoundedIcon />,
        path: '/dashboard/return',
        content: CustomerView.Return,
        account_type: UserRole.Customer,
    },

    /* Manager View */

    {
        title: 'VerifyPurchases',
        icon: null, //tbd
        content: ManagerView.VerifyPurchases,
        path: '/dashboard/verifypurchases',
        account_type: UserRole.Manager,
    },
    /* Owner View */

    {
        title: 'Management',
        icon: null, //tbd
        content: OwnerView.Management,
        path: '/dashboard/management',
        account_type: UserRole.Owner,
    },
    {
        title: 'PriceControl',
        icon: null, //tbd
        content: OwnerView.PriceControl,
        path: '/dashboard/pricecontrol',
        account_type: UserRole.Owner,
    },
    {
        title: 'Reports',
        icon: null, //tbd
        content: OwnerView.Reports,
        path: '/dashboard/reports',
        account_type: UserRole.Owner,
    },
];
export const HomePath = '/dashboard/home';
