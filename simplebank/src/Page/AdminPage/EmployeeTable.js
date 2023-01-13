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



export default function EmployeeTable(props) {

    const navigate = useNavigate();

    const data = props.employees;

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Title>All Employee</Title>
                <Box>
                    <Button sx={{
                    }} variant='contained' size='small' >Create Employee</Button>
                </Box>

            </Box>
            <Table size="large">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.username
                                }</TableCell>
                                <TableCell >{row.is_active ? 'Active' : 'Unactive'}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}