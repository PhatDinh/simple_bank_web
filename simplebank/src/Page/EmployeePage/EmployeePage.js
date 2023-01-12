import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import ButtonAppBar from "../../Appbar"


import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../HomePage/Title';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';



const EmployeePage = () => {

    const [customers, setCustomers] = useState([]);

    const [open, setOpen] = useState(false);

    const [depositId, setDepositId] = useState('');


    const bearer = 'Bearer ' + localStorage.getItem('token');

    const navigate = useNavigate();

    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/employee/v1/customers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            console.log(data);
            setCustomers(data.results)
        })
    }


    useEffect(() => {
        fetchData();
    }, [])


    const movToCreate = () => {
        navigate('/create-customer')
    }

    const handleDepositDialog = (id) => {
        setOpen(true);
        setDepositId(id);
    }

    const handleDeposit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(depositId)
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/employee/v1/bank-accounts/${depositId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                "cash_in": 100
            })
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            console.log(data);
            setOpen(false)
        })
    }








    return <Box
        sx={{
            flexGrow: 1,
            height: '100vh',
            backgroundColor: '#f5f5f5',
            margin: 0

        }}>
        <ButtonAppBar />
        <Box sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Paper sx={{
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 5,
                paddingBottom: 5,
                marginTop: 20
            }}> <Box sx={{
                minWidth: '80vw',
                minHeight: '50vh'
            }}>
                    <Box>
                        <ButtonAppBar role={'Employee'} />
                        <React.Fragment>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Title>All Customer</Title>
                                <Button sx={{
                                }} variant='contained' size='small' onClick={movToCreate}>Create Account</Button>
                            </Box>
                            <Table size="large">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customers?.map((row) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.username}</TableCell>
                                                <TableCell>{row.first_name
                                                }</TableCell>
                                                <TableCell >{row.phone_number}</TableCell>
                                                <TableCell> {row.is_active ? 'Active' : 'Deactive'}</TableCell>
                                                <TableCell><IconButton onClick={() => handleDepositDialog(row.id)}><AddCardIcon /></IconButton></TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </React.Fragment>
                    </Box>
                </Box></Paper>
            <Dialog open={open} >
                <DialogTitle>Deposit Money</DialogTitle>
                <Box component="form"
                    onSubmit={handleDeposit} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                    <Box
                        sx={{
                            margin: 5
                        }}>

                        <Typography>Input how much cash</Typography>

                        <TextField placeholder="Input Cash" required name='cash' type="number"></TextField>

                    </Box>
                    <Button variant="contained" type='submit' sx={{

                        width: '50%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: 10,
                    }}>Submit</Button>
                </Box>

            </Dialog>

        </Box>
    </Box>
}



export default EmployeePage