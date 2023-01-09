import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../HomePage/Title';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

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

export default function TransactionTable(props) {

    const navigate = useNavigate();


    const movToCreate = () => {
        navigate('/create-transaction')
    }


    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Title>All Transactions</Title>
                <Button sx={{
                }} variant='contained' onClick={movToCreate}>Create Transaction</Button>
            </Box>
            <Table size="large">
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
        </React.Fragment>
    );
}