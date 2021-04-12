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
import type { ActiveTransRes, CompleteTransRes, DockRes, ReturnRes } from 'types/Transactions';
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
}));

type State = {
    open: boolean;
    transaction_id: number | null;
    dock: number;
};

export const Transaction: React.FC = () => {
    const tranStyles = useStyles();
    const dashStyles = useDashStyles();
    const classes = { ...dashStyles, ...tranStyles };

    /* Fetch Request for Complete Transactions */
    const transConfig: FetchConfig = {
        url: '/api/transactions/complete_transactions',
        method: 'GET',
    };
    const transRes = useFetch<CompleteTransRes>(transConfig, UseFetchLifecycle.Mount); // fetch when config initializes and updates

    return (
        <>
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
                (transRes.response.data.complete_transactions.length > 0 ? (
                    <Paper className={classes.paper}>
                        <Title>Transaction History</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Origin Dock</TableCell>
                                    <TableCell>Return Dock</TableCell>

                                    <TableCell>Rent Date</TableCell>
                                    <TableCell>Return Date</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Fees</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {transRes.response.data.complete_transactions.map((trans, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{trans.origin_dock}</TableCell>
                                        <TableCell>{trans.destination_dock}</TableCell>
                                        <TableCell>
                                            {formatDate(new Date(trans.start_date))}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(new Date(trans.end_date))}
                                        </TableCell>
                                        <TableCell>{trans.price}</TableCell>
                                        <TableCell>{trans.damage_fee}</TableCell>
                                        <TableCell>{trans.price + trans.damage_fee}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                ) : (
                    <Title>You currently have no history of bike rentals</Title>
                ))}
        </>
    );
};
