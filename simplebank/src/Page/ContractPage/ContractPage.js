import { TableContainer, Table, TableRow, TableCell, TableBody, TableHead, InputAdornment, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../Appbar";
import SearchIcon from '@mui/icons-material/Search';

const ContactPage = () => {


    const [Contacts, setContacts] = useState([]);

    const bearer = 'Bearer ' + localStorage.getItem('token')
    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/contacts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new console.error(res);
            return res.json();
        }).then(data => {

            setContacts(data.results)
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <Box>
        <ButtonAppBar />
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            marginTop: 15
        }}>
            <Box sx={{
                marginTop: 5,
                marginLeft: 40,
                marginBottom: 5,
                alignSelf: 'start',
                display: 'flex',
                justifyContent: 'space-between',
                width: '65vw'
            }}>
                <TextField id="outlined-basic" variant="outlined" placeholder='name ' InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>

                    ),
                }} />

                <Box sx={{
                    alignSelf: 'center',

                }}>
                    <Button variant='contained' size='medium' >Add Contact</Button>
                </Box>

            </Box>
            <TableContainer sx={{
                width: '70vw',
                marginLeft: 'auto',
                marginRight: 'auto'
            }} >
                <Table sx={{}} aria-label="simple table" size="medium">
                    <TableHead>
                        <TableRow sx={{
                            border: 1,
                            borderColor: '#E0E0E0'
                        }}>
                            <TableCell sx={{
                                borderBottom: 'none',
                                background: '#F4F5FF'
                            }}>
                                NAME
                            </TableCell>
                            <TableCell sx={{
                                borderBottom: 'none',
                                background: '#F4F5FF'
                            }}>
                                ACCOUNT NUMBER
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Contacts?.map((e) => {

                                return <TableRow key={e} sx={{
                                    border: 1,
                                    borderColor: '#E0E0E0'
                                }}>
                                    <TableCell sx={{
                                        borderBottom: 'none',
                                    }}>{e.suggest_name}
                                    </TableCell>
                                    <TableCell sx={{
                                        borderBottom: 'none',
                                    }}>{e.account_number}
                                    </TableCell>
                                </TableRow>
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    </Box>
}


export default ContactPage;