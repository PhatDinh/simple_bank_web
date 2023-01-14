import { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../HomePage/Title';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import PaymentIcon from '@mui/icons-material/Payment';
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmDebt from "./ConfirmDebt";



export default function DebtTable(props) {

    const navigate = useNavigate();


    const movToCreate = () => {
        navigate('/create-debt')
    }

    const data = props.debt;

    const bearer = props.bearer;


    //open confirm otp dialog
    const [open, setOpen] = useState(false)

    const [debtToken, setDebtToken] = useState('');

    const [debtId, setDebtId] = useState('');


    const fulfillDebt = async (id) => {
        console.log(id)
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts/fulfill/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            console.log(data);
            setDebtId(id);
            setDebtToken(data.token)
            setOpen(true)
        })
    }

    const removeDebt = async (id) => {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts/cancel/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                "description": "test"
            })
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            console.log(data);
        })
    }





    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Title>All Debts</Title>
                <Button sx={{
                }} variant='contained' size='small' onClick={movToCreate}>Create Debt</Button>
            </Box>
            <Table size="large">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Reciever</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.debt?.map((row) => {
                        const date = row.create_time.slice(0, row.create_time.indexOf('T'))
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{date}</TableCell>
                                <TableCell>{row.owner_name}</TableCell>
                                <TableCell>{row.receiver_name
                                }</TableCell>
                                <TableCell >{row.amount}</TableCell>
                                <TableCell> {row.description}</TableCell>
                                <TableCell> {row.status}</TableCell>
                                <TableCell><IconButton onClick={() => fulfillDebt(row.id)}><PaymentIcon /></IconButton><IconButton onClick={() => removeDebt(row.id)}><ClearIcon /></IconButton></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <ConfirmDebt open={open} bearer={bearer} id={debtId} token={debtToken}></ConfirmDebt>
        </Box>
    );
}