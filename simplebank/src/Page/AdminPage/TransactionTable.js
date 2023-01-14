import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../HomePage/Title';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';




export default function TransactionTable(props) {

    const navigate = useNavigate();

    const data = props.transactions;


    const [bank, setBank] = React.useState('');

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Title>All Transaction</Title>
                <Box>
                    <TextField label="Input Bank" onChange={(e) => setBank(e.target.value)}></TextField>
                </Box>

            </Box>
            <Table size="large">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Reciever</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => {
                        const date = row.create_time.slice(0, row.create_time.indexOf('T'))

                        const table = (<TableRow key={row.id}>
                            <TableCell>{date}</TableCell>
                            <TableCell>{row.sender_name}</TableCell>
                            <TableCell>{row.receiver_name
                            }</TableCell>
                            <TableCell >{row.amount}</TableCell>
                            <TableCell> {row.description}</TableCell>
                        </TableRow>)

                        if (bank == '') {
                            return table
                        }
                        else if (row.receiver_bank_name == bank || row.sender_bank_name == bank) return table
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}