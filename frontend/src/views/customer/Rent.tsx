import {
    Button,
    Container,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { ContentSpinner } from 'components/ContentSpinner';
import { RentDialog } from 'components/RentDialog';
import Title from 'components/Title';
import React from 'react';
import type { DockRes, RentRes } from 'types/Transactions';
import { FetchConfig, useFetch, UseFetchLifecycle } from 'UseFetch';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    button: {
        background: 'white',
        color: '#3f51b5',
    },
}));

type State = {
    open: boolean;
    dock: number | null;
};

export const Rent: React.FC = () => {
    const classes = useStyles();
    /* State for selected dock and dialog open */

    const [state, setState] = React.useState<State>({ open: false, dock: 0 });

    /* Fetch Request for Docks */

    const [dockConfig, setDockConfig] = React.useState<FetchConfig>({
        url: '/api/docks/get_docks',
        method: 'GET',
    });
    const dockRes = useFetch<DockRes>(dockConfig, UseFetchLifecycle.MountAndUpdate); // fetch when config initializes and updates

    /* Fetch Request for Rent */

    const [actionConfig, setActionConfig] = React.useState<FetchConfig>({
        url: '/api/transactions/rent',
        method: 'POST',
        data: {
            dock: null,
        },
    });
    const actionRes = useFetch<RentRes>(actionConfig, UseFetchLifecycle.Update); // only fetch when config updates

    /* Handler functions for buttons/dialog */

    const openDialogue = (dockNumber: number) => () => {
        setState((prevState) => ({ ...prevState, open: true, dock: dockNumber }));
    };

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };
    const handleSubmit = () => {
        setState((prevState) => ({ ...prevState, open: false }));
        setDockConfig((prevState) => ({ ...prevState })); // config update triggers fetch
        setActionConfig((prevState) => ({ ...prevState, data: { dock: state.dock } })); //config update triggers fetch
    };
    return (
        <React.Fragment>
            {/* RESPONSE */}
            {actionRes.isLoading && (
                <Container>
                    <ContentSpinner />
                </Container>
            )}
            {actionRes.error && (
                <Container>
                    <Title>{`${actionRes.error.response?.data} for bike at dock ${state.dock}`}</Title>
                </Container>
            )}
            {actionRes.response && (
                <Container>
                    {/* @ts-ignore */}
                    <Title>{actionRes.response.data.trans_id}</Title>
                </Container>
            )}
            {/* TABLE WITH DOCKS */}
            {dockRes.isLoading && (
                <Container>
                    <ContentSpinner />
                </Container>
            )}
            {dockRes.error && (
                <Container>
                    <Title>Error retrieving docks</Title>
                </Container>
            )}
            {dockRes.response && (
                <Container>
                    <Title>Docks</Title>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dock</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Bikes Available</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <RentDialog
                            isOpen={state.open}
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                        />
                        <TableBody>
                            {dockRes.response.data.bike_docks.map((dock, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{dock.bikedock_number}</TableCell>
                                    <TableCell>{dock.location}</TableCell>
                                    <TableCell>{dock.number_of_bikes}</TableCell>
                                    <TableCell>
                                        <Button
                                            className={classes.button}
                                            onClick={openDialogue(dock.bikedock_number)}
                                        >
                                            Rent
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            )}
        </React.Fragment>
    );
};
