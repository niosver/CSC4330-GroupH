import {
    Button,
    Container,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { ContentSpinner } from 'components/ContentSpinner';
import { RentDialog } from 'components/RentDialog';
import Title from 'components/Title';
import React, { useCallback, useRef, useState } from 'react';
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
    const [state, setState] = useState<State>({ open: false, dock: 0 });

    /* Fetch Request for Docks */
    const [dockConfig, setDockConfig] = useState<FetchConfig>({
        url: '/api/docks/get_docks',
        method: 'GET',
    });
    const dockRes = useFetch<DockRes>(dockConfig, UseFetchLifecycle.MountAndUpdate); // fetch when config initializes and updates

    /* Fetch Request for Rent */
    const [actionConfig, setActionConfig] = useState<FetchConfig>({
        url: '/api/transactions/rent',
        method: 'POST',
        data: {
            dock: null,
        },
    });
    const actionRes = useFetch<RentRes>(actionConfig, UseFetchLifecycle.Update); // only fetch when config updates

    /* Handler functions for rent button */
    const openDialogue = (dockNumber: number) => () => {
        setState((prevState) => ({ ...prevState, open: true, dock: dockNumber }));
    };

    /* Handler function for dialog cancel button */
    const handleCancel = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };

    /* Handler function for dialog submit button */
    const handleSubmit = () => {
        setState((prevState) => ({ ...prevState, open: false }));
        setActionConfig((prevState) => ({ ...prevState, data: { dock: state.dock } })); //config update triggers fetch
    };

    /* Callback ref for reloading Docks after renting */
    const ref = useCallback((node: HTMLDivElement) => {
        if (node != null) {
            setDockConfig((prevState) => ({ ...prevState })); // config update triggers fetch
        }
    }, []);

    return (
        <>
            {/* RESPONSE */}
            {actionRes.isLoading && (
                <Container>
                    {process.env.NODE_ENV === 'development' && (
                        <span>
                            <Typography>
                                <em>(DEV):</em> <strong>Rent</strong>
                            </Typography>
                        </span>
                    )}
                    <ContentSpinner />
                </Container>
            )}
            {actionRes.error && (
                /*Trigger ref callback if Container is rendered*/
                <Container ref={ref}>
                    <Title>{`${actionRes.error.response?.data} for bike at dock ${state.dock}`}</Title>
                </Container>
            )}
            {actionRes.response && (
                /*Trigger ref callback if Container is rendered*/
                <Container ref={ref}>
                    <Title>{actionRes.response.data.transaction_id}</Title>
                </Container>
            )}
            {/* TABLE WITH DOCKS */}
            {dockRes.isLoading && (
                <Container>
                    {process.env.NODE_ENV === 'development' && (
                        <span>
                            <Typography>
                                <em>(DEV):</em> <strong>Docks</strong>
                            </Typography>
                        </span>
                    )}
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
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit}
                            keepMounted
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
        </>
    );
};
