import {
    Button,
    Container,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { ContentSpinner } from 'components/ContentSpinner';
import { ReturnDialog } from 'components/ReturnDialog';
import Title from 'components/Title';
import { useDashStyles } from 'context/styles';
import React, { useCallback, useState } from 'react';
import type { ActiveTransRes, DockRes, ReturnRes } from 'types/Transactions';
import { FetchConfig, useFetch, UseFetchLifecycle } from 'hooks/UseFetch';
import { Alert } from 'components/Alert';
import { formatDate } from '../../util';

const useStyles = makeStyles((theme) => ({
    button: {
        background: 'white',
        color: '#3f51b5',
    },
    dialogPaper: {
        width: '80%',
        maxHeight: 435,
    },
    title: {
        textAlign: 'center',
    },
}));

type State = {
    open: boolean;
    transaction_id: number | null;
    dock: number;
};

export const Return: React.FC = () => {
    const rentStyles = useStyles();
    const dashStyles = useDashStyles();
    const classes = { ...dashStyles, ...rentStyles };
    /* State for selected dock and dialog open */
    const [state, setState] = useState<State>({ open: false, transaction_id: null, dock: 1 });

    /* Fetch Request for Dock information (dock number, dock address) to pass to ReturnDialog */
    const dockConfig: FetchConfig = {
        url: '/api/docks/get_docks',
        method: 'GET',
    };
    const dockRes = useFetch<DockRes>(dockConfig, UseFetchLifecycle.Mount); // fetch only 1 time on mount

    /* Fetch Request for Active Transactions */
    const [transConfig, setTransConfig] = useState<FetchConfig>({
        url: '/api/transactions/active_transactions',
        method: 'GET',
    });
    const transRes = useFetch<ActiveTransRes>(transConfig, UseFetchLifecycle.MountAndUpdate); // fetch when config initializes and updates

    /* Fetch Request for Return */
    const [returnConfig, setReturnConfig] = useState<FetchConfig>({
        url: '/api/transactions/return',
        method: 'POST',
        data: {
            transaction_id: null,
            destination_dock: 1,
        },
    });
    const actionRes = useFetch<ReturnRes>(returnConfig, UseFetchLifecycle.Update); // only fetch when config updates

    /* Handler function for return button */
    const openDialogue = (transaction_id: number) => () => {
        setState((prevState) => ({ ...prevState, open: true, transaction_id }));
    };

    /* Handler function for dialog cancel button */
    const handleCancel = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };

    /* Handler function for dialog submit button */
    const handleSubmit = (dock: number) => () => {
        setState((prevState) => ({ ...prevState, open: false, dock: dock }));
        setReturnConfig((prevState) => ({
            ...prevState,
            data: {
                transaction_id: state.transaction_id,
                destination_dock: dock,
            },
        })); //config update triggers fetch
    };

    /* Callback ref for reloading active transactions after returning */
    const ref = useCallback((node: HTMLDivElement) => {
        if (node != null) {
            setTransConfig((prevState) => ({ ...prevState })); // config update triggers fetch
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
                                <em>(DEV):</em> <strong>Return</strong>
                            </Typography>
                        </span>
                    )}
                    <ContentSpinner />
                </Container>
            )}
            {actionRes.error && (
                /*Trigger ref callback if div is rendered*/
                <div ref={ref}>
                    <Alert
                        severity="error"
                        message={`${actionRes.error.response?.data} for transaction ${state.transaction_id}`}
                    />
                </div>
            )}
            {actionRes.response && (
                /*Trigger ref callback if div is rendered*/
                <div ref={ref}>
                    <Alert
                        severity="success"
                        message={`Total Cost: $${actionRes.response.data.price}`}
                    />
                </div>
            )}

            {/* TABLE WITH ACTIVE TRANSACTIONS */}
            {transRes.isLoading && (
                <Container>
                    {process.env.NODE_ENV === 'development' && (
                        <span>
                            <Typography>
                                <em>(DEV):</em> <strong>Active Transaction</strong>
                            </Typography>
                        </span>
                    )}
                    <ContentSpinner />
                </Container>
            )}
            {transRes.error && (
                <Container>
                    <Title>Error retrieving docks</Title>
                </Container>
            )}
            {transRes.response &&
                (transRes.response.data.active_transactions.length > 0 ? (
                    <Paper className={classes.paper}>
                        <Title>Active Transactions</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Origin Dock</TableCell>
                                    <TableCell>Rent Date</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <ReturnDialog
                                dockRes={dockRes}
                                isOpen={state.open}
                                handleCancel={handleCancel}
                                handleSubmit={handleSubmit}
                                value={state.dock}
                                keepMounted
                                classes={{ paper: classes.dialogPaper }}
                            />
                            <TableBody>
                                {transRes.response.data.active_transactions.map((trans, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{trans.origin_dock}</TableCell>
                                        <TableCell>
                                            {formatDate(new Date(trans.start_date))}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                className={classes.button}
                                                onClick={openDialogue(trans.transaction_id)}
                                            >
                                                Return
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                ) : (
                    <Paper className={classes.paper}>
                        <div className={classes.title}>
                            <Title>You currently have no active bike rentals</Title>
                        </div>
                    </Paper>
                ))}
        </>
    );
};
