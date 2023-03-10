import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../HomePage/Title';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';



export default function EmployeeTable(props) {

    const navigate = useNavigate();

    const data = props.employees;
    const bearer = props.bearer;



    const deleteEmployee = async (id) => {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/admin/v1/employees/${id}`, {
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
        })
    }

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
                                <TableCell><IconButton onClick={()=>deleteEmployee(row.id)}><ClearIcon/></IconButton></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}