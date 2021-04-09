import { DashStylesContext } from './DashStylesContext';
import { useStyles } from './DashStyles';
export const DashStylesProvider: React.FC = ({ children }) => {
    const dashStyles = useStyles();
    return <DashStylesContext.Provider value={dashStyles}>{children}</DashStylesContext.Provider>;
};
