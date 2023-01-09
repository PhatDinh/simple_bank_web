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



export default function TransactionTable(props) {

    const navigate = useNavigate();


    const movToCreate = () => {
        navigate('/create-transaction')
    }

    const data = props.transaction;
    console.log(props.transaction)

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Title>All Transactions</Title>
                <Button sx={{
                }} variant='contained' size='small' onClick={movToCreate}>Create Transaction</Button>
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
                    {props.transaction?.map((row) => {
                        const date = row.create_time.slice(0, row.create_time.indexOf('T'))
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{date}</TableCell>
                                <TableCell>{row.sender_name}</TableCell>
                                <TableCell>{row.receiver_name
                                }</TableCell>
                                <TableCell >{row.amount}</TableCell>
                                <TableCell> {row.description}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}