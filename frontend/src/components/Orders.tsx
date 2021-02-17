import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import Title from "./Title";

// Generate Order Data
function createData(id: number, dockNumber: number, address: string) {
  return { id, dockNumber, address };
}

const rows = [
  createData(0, 1, "12345 Nutty Avenue"),
  createData(1, 2, "4421 Pillar Street"),
  createData(2, 3, "5560 Candycane Lane"),
  createData(3, 4, "21234 Billy Jean Road"),
  createData(4, 5, "2134 Bruce Springsteen Road"),
];

function preventDefault(event: { preventDefault: () => void }) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dockNumber}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
