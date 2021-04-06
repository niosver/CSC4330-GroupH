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
import type { ActiveTransRes, DockRes, RentRes, ReturnRes } from 'types/Transactions';
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
    trans_id: number | null;
};

export const Return: React.FC = () => {
    const classes = useStyles();
    /* State for selected dock and dialog open */

    const [state, setState] = React.useState<State>({ open: false, trans_id: null });

    /* Fetch Request for Docks */

    const [transConfig, setTransConfig] = React.useState<FetchConfig>({
        url: '/api/transactions/active_transactions',
        method: 'GET',
    });
    const transRes = useFetch<ActiveTransRes>(transConfig, UseFetchLifecycle.MountAndUpdate); // fetch when config initializes and updates

    /* Fetch Request for Rent */

    const [actionConfig, setActionConfig] = React.useState<FetchConfig>({
        url: '/api/transactions/return',
        method: 'POST',
        data: {
            trans_id: null,
        },
    });
    const actionRes = useFetch<ReturnRes>(actionConfig, UseFetchLifecycle.Update); // only fetch when config updates

    /* Handler functions for buttons/dialog */

    const openDialogue = (dockNumber: number) => () => {
        setState((prevState) => ({ ...prevState, open: true, dock: dockNumber }));
    };

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };
    const handleSubmit = () => {
        setState((prevState) => ({ ...prevState, open: false }));
        setTransConfig((prevState) => ({ ...prevState })); // config update triggers fetch
        setActionConfig((prevState) => ({ ...prevState, data: { dock: state.trans_id } })); //config update triggers fetch
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
                    <Title>{`${actionRes.error.response?.data} for bike at dock ${state.trans_id}`}</Title>
                </Container>
            )}
            {actionRes.response && (
                <Container>
                    {/* @ts-ignore */}
                    <Title>{actionRes.response.data.trans_id}</Title>
                </Container>
            )}
            {/* TABLE WITH ACTIVE TRANSACTIONS */}
            {transRes.isLoading && (
                <Container>
                    <ContentSpinner />
                </Container>
            )}
            {transRes.error && (
                <Container>
                    <Title>Error retrieving docks</Title>
                </Container>
            )}
            {transRes.response && (
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
                            {transRes.response.data.transaction_ids.map((trans, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{trans}</TableCell>
                                    <TableCell>
                                        <Button
                                            className={classes.button}
                                            onClick={openDialogue(trans)}
                                        >
                                            Return
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
