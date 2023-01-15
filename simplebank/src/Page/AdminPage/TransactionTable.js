import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../HomePage/Title';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';



export default function TransactionTable(props) {

    const navigate = useNavigate();

    const [data, setData] = React.useState([]);
    const bearer = props.bearer;


    const [bank, setBank] = React.useState('');


    const [banks, setBanks] = React.useState([]);

    const today = new Date () ;
    today.setMonth(today.getMonth()-1);
    today.setHours(0,0,0,0)


    const [startDate, setStartDate] = React.useState(today/1000|0);
    const [endDate, setEndDate] = React.useState(Math.round(Date.now() / 1000));

    const fetchBanks = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/options', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setBanks(() => {
                const temp = data.partners;
                temp.push(data.prod_owner_name)
                return temp
            })
        })
    }


    const fetchTransaction = async (bankName, dateStart, dateEnd) => {
        console.log(dateStart)
        console.log(dateEnd)
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/admin/v1/transactions?bank_name=${bankName}&date_start=${dateStart}&date_end=${dateEnd}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
        }).then(res => {
            if (!res.ok) console.log(res)
            else return res.json();
        }).then(temp => {
            setData(temp.results)
        })
    }




    const selectBank = (e) => {
        setBank(e.target.value);
        fetchTransaction(e.target.value, startDate, endDate);
    }

    const setStart = (e) => {
        setStartDate((Date.parse(e.$d.toUTCString())) / 1000 + (7 * 3600))
        fetchTransaction(bank, (Date.parse(e.$d.toUTCString())) / 1000 , endDate);
    }

    const setEnd = (e) => {
        setEndDate((Date.parse(e.$d.toUTCString())) / 1000 + (7 * 3600))
        fetchTransaction(bank, startDate, (Date.parse(e.$d.toUTCString())) / 1000 );
    }


    React.useEffect(() => {
        fetchBanks();
        const fetchData = async () => {
            await fetch(`https://infinite-beyond-71487.herokuapp.com/api/admin/v1/transactions`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
            }).then(res => {
                if (!res.ok) console.log(res)
                else return res.json();
            }).then(temp => {
                setData(temp.results)
            })
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Title>All Transaction</Title>
                <Box>
                    <Select placeholder='Choose contact' onChange={selectBank}>
                        {banks?.map(e => {
                            console.log('Choice:' + e)
                            return <MenuItem value={e} key={e} label={'Select Bank'}>{e}</MenuItem>
                        })}
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Start " onChange={setStart} />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="End" onChange={setEnd} />
                    </LocalizationProvider>

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
                        return table
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}