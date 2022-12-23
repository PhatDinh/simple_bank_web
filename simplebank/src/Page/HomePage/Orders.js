import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        300,
        'Chuyen tien',
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        300,
        'Chuyen tien',
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 300,
        'Chuyen tien',),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        300,
        'Chuyen tien',
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        300,
        'Chuyen tien',
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title>Recent Transactions</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Reciever</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more transactions
            </Link>
        </React.Fragment>
    );
}