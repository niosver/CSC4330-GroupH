import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import Title from './Title';

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

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    button: {
        background: 'white',
        color: '#3f51b5'
    }
}));

export default function Orders() {
    const classes = useStyles();
    return (
        <React.Fragment>
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
                            <TableCell><Button className={classes.button}>Rent</Button></TableCell>
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
        </React.Fragment>
    );
}
