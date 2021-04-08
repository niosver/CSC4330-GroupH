import type { Styles } from '@material-ui/styles';
import React, { createContext, useContext } from 'react';
import { DashStyles } from './DashStyles';

export const DashStylesContext = createContext<DashStyles | undefined>(undefined);

export const useDashStyles = () => {
    const ctx = useContext(DashStylesContext);
    if (ctx === undefined) {
        throw new Error(
            'useDashStyles must be used within a child component of DashSytlesProvider'
        );
    }
    return ctx;
};
