import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect } from 'react';
import Title from '../../components/Title';
import { useFetch, UseFetchLifecycle } from '../../UseFetch';
import type { FetchConfig } from '../../UseFetch';

// Generate Order Data
function createData(id: number, dockNumber: number, address: string, bikesAvailable: number) {
    return { id, dockNumber, address, bikesAvailable };
}

const rows = [
    createData(0, 1, '12345 Nutty Avenue', 1),
    createData(1, 2, '4421 Pillar Street', 2),
    createData(2, 3, '5560 Candycane Lane', 3),
    createData(3, 4, '21234 Billy Jean Road', 4),
    createData(4, 5, '2134 Bruce Springsteen Road', 5),
    createData(5, 1, '22222 Apple Avenue', 1),
    createData(6, 2, '33333 Orange Street', 2),
    createData(7, 3, '44444 Banana Lane', 3),
    createData(8, 4, '55555 Michael J Road', 4),
    createData(9, 5, '77777 Coconut Road', 5),
];

function preventDefault(event: { preventDefault: () => void }) {
    event.preventDefault();
}

const rentState = {
    text: 'Rent',
};

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
    dock: number;
    open: boolean;
    action: 'Rent' | 'Return';
};
export const Docks: React.FC = () => {
    const classes = useStyles();
    const [state, setState] = React.useState<State>({ open: false, dock: 0, action: 'Rent' });
    const [config, setConfig] = React.useState<FetchConfig>({
        url: '/api/transactions/rent',
        method: 'POST',
        data: {
            dock: null,
        },
    });

    const openDialogue = (dockNumber: number) => () => {
        setState((prevState) => ({ ...prevState, open: true, dock: dockNumber }));
    };

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };
    const handleSubmit = () => {
        setState((prevState) => ({ ...prevState, open: false, action: 'Return' }));
        setConfig((prevState) => ({ ...prevState, data: { dock: state.dock } }));
    };
    const res = useFetch<string>(config, UseFetchLifecycle.Update);
    return (
        <React.Fragment>
            {res.isLoading && (
                <Container>
                    <Title>Loading...</Title>
                </Container>
            )}
            {res.error && (
                <Container>
                    <Title>{`${res.error.response?.data} for bike at dock ${state.dock}`}</Title>
                </Container>
            )}
            {res.response && (
                <Container>
                    <Title>{res.response.data}</Title>
                </Container>
            )}
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
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.dockNumber}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.bikesAvailable}</TableCell>
                                <TableCell>
                                    <Button
                                        className={classes.button}
                                        onClick={openDialogue(row.dockNumber)}
                                    >
                                        {state.action}
                                    </Button>
                                </TableCell>
                                <Dialog
                                    open={state.open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {'Bike Rental Agreement'}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Rental Cost and fees
                                            <ul>
                                                <li>$5 per half hour</li>
                                                <li>$9 per hour</li>
                                                <li>
                                                    portion of hour used charged full price of hour
                                                    $25 if returned to different dock
                                                </li>
                                                <li>$500 if bike is not returned </li>
                                                <li>$200 if bike is damaged depending on damage</li>
                                            </ul>
                                            1. Assumption of Risk. Renter acknowledges that the
                                            activities for which the bicycle is designed include
                                            inherent dangers, including the risk of bodily injury
                                            and/or death. Renter assumes and accepts all risks
                                            associated with the use of the bicycle.
                                            <br></br>
                                            <br></br>
                                            2. If at any time THE BICYCLE SELLER determines that
                                            Renter has engaged in an unsafe or hazardous use of the
                                            bicycle, THE BICYCLE SELLER may immediately terminate
                                            the rental. Upon notification of termination, Renter
                                            must return the bicycle to the designated return area
                                            immediately. If the rental is terminated for unsafe or
                                            hazardous use, Renter will not be refunded his/her
                                            security deposit. THE BICYCLE SELLER shall determine, in
                                            its sole discretion, whether any behavior or activity is
                                            “unsafe or hazardous.”
                                            <br></br>
                                            <br></br>
                                            3. Condition of Bicycle upon Return. The Renter shall
                                            return the bicycle to the designated return area clean
                                            and in the same condition as it was in when given to
                                            Renter, excepting ordinary wear and tear. Renter shall
                                            be responsible for any damage caused to the bicycle
                                            during the rental period.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Disagree
                                        </Button>
                                        <Button onClick={handleSubmit} color="primary" autoFocus>
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/*TODO: We need this button to expand the next 5 rows */}
                <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={preventDefault}>
                        See more docks
                    </Link>
                </div>
            </Container>
        </React.Fragment>
    );
};
