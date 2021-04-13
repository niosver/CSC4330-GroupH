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
import { Alert } from 'components/Alert';
import { ContentSpinner } from 'components/ContentSpinner';
import { FeeDialog } from 'components/FeeDialog';
import Title from 'components/Title';
import { useDashStyles } from 'context/styles';
import { FetchConfig, useFetch, UseFetchLifecycle } from 'hooks/UseFetch';
import React, { useCallback, useState } from 'react';
import type { DamageChargeRes, RecentReturnsRes } from 'types/Transactions';
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
    damage_fee: number;
};

export const VerifyPurchases: React.FC = () => {
    const rentStyles = useStyles();
    const dashStyles = useDashStyles();
    const classes = { ...dashStyles, ...rentStyles };

    /* State for transaction id, fee, and dialog modal */
    const [state, setState] = useState<State>({
        open: false,
        transaction_id: null,
        damage_fee: 0,
    });

    /* Fetch Request for Docks */
    const [returnsConfig, setReturnsConfig] = useState<FetchConfig>({
        url: '/api/transactions/recent_returns',
        method: 'GET',
    });
    const returnsRes = useFetch<RecentReturnsRes>(returnsConfig, UseFetchLifecycle.MountAndUpdate); // fetch when config initializes and updates

    /* Fetch Request for Rent */
    const [actionConfig, setActionConfig] = useState<FetchConfig>({
        url: '/api/transactions/damage_charge',
        method: 'POST',
        data: { transaction_id: state.transaction_id, damage_fee: state.damage_fee },
    });
    const actionRes = useFetch<DamageChargeRes>(actionConfig, UseFetchLifecycle.Update); // only fetch when config updates

    /* Handler functions for add fee button */
    const openDialogue = (id: number) => () => {
        setState((prevState) => ({
            ...prevState,
            open: true,
            transaction_id: id,
        }));
    };

    /* Handler function for dialog cancel button */
    const handleCancel = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };

    /* Handler function for dialog submit button */
    const handleSubmit = (damage_fee: number) => () => {
        setActionConfig((prevState) => ({
            ...prevState,
            data: { transaction_id: state.transaction_id, damage_fee: damage_fee },
        })); //config update triggers fetch
        setState((prevState) => ({
            ...prevState,
            open: false,
            transaction_id: null,
        }));
    };

    /* Callback ref for reloading Docks after renting */
    const ref = useCallback((node: HTMLDivElement) => {
        if (node != null) {
            setReturnsConfig((prevState) => ({ ...prevState })); // config update triggers fetch
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
                                <em>(DEV):</em> <strong>Damage Fee</strong>
                            </Typography>
                        </span>
                    )}
                    <ContentSpinner />
                </Container>
            )}
            {actionRes.error && (
                /*Trigger ref callback if div is rendered*/
                <div ref={ref}>
                    <Alert severity="error" message={`${actionRes.error.response?.data}`} />
                </div>
            )}
            {actionRes.response && (
                /*Trigger ref callback if div is rendered*/
                <div ref={ref}>
                    <Alert
                        severity="success"
                        message={`Success!: transaction ${actionRes.response.data.transaction_id} charged $${actionRes.response.data.damage_fee}`}
                    />
                </div>
            )}
            {/* TABLE WITH DOCKS */}
            {returnsRes.isLoading && (
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
            {returnsRes.error && (
                <Container>
                    <Title>Error retrieving recent transactions</Title>
                </Container>
            )}
            {returnsRes.response && (
                <Paper className={classes.paper}>
                    <Title>Recent Transactions</Title>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Transaction Id</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Origin Dock</TableCell>
                                <TableCell>Destination Dock</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <FeeDialog
                            isOpen={state.open}
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit}
                            value={state.damage_fee}
                            keepMounted
                            classes={{ paper: classes.dialogPaper }}
                        />

                        <TableBody>
                            {returnsRes.response.data.map((x, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{x.transaction_id}</TableCell>
                                    <TableCell>{formatDate(new Date(x.start_date))}</TableCell>
                                    <TableCell>{formatDate(new Date(x.end_date))}</TableCell>
                                    <TableCell>{x.origin_dock}</TableCell>
                                    <TableCell>{x.destination_dock}</TableCell>

                                    <TableCell>
                                        <Button
                                            className={classes.button}
                                            onClick={openDialogue(x.transaction_id)}
                                        >
                                            Add Fee
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </>
    );
};
