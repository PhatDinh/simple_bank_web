
import ButtonAppBar from "../../Appbar"
import { Button, TextField, Typography, Dialog, DialogTitle, } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import tokenStore from "../../store/tokenStore";


const CreateCustomer = () => {
    const navigate = useNavigate();
    const bearer = 'Bearer ' + tokenStore.accessToken

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');

    const [open,setOpen] = useState(false)
    const [depositId,setDepositId] =useState('')


    const goBack = () => {
        navigate(-1);
    }

    const sendSubmit = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/employee/v1/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({

                "email": email,
                "phone_number": phoneNumber,
                "username": username

            })
        }).then(res => {
            console.log(res)
            return res.json();
        }).then(data => {
            console.log(data)
            setDepositId(data.bank_account_id)
            setOpen(true)
        })
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
                "cash_in": parseInt(data.get('cash'))
            })
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            console.log(data);
            navigate('/employee')
        })
    }



    return (
        <Box sx={{
            backgroundColor: 'white', minHeight: '100vh'
        }}>
            <ButtonAppBar role="Employee" />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,

                }}>
                    <Typography variant='h6' align='start'>Email</Typography>
                    <TextField onChange={(event) => { setEmail(event.target.value) }} fullWidth></TextField>
                </Box>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,

                }}>
                    <Typography variant='h6' align='start'>Username</Typography>
                    <TextField onChange={(event) => { setUsername(event.target.value) }} fullWidth></TextField>
                </Box>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,

                }}>
                    <Typography variant='h6' align='start'>Phone Number</Typography>
                    <TextField onChange={(event) => { setPhoneNumber(event.target.value) }} fullWidth ></TextField>
                </Box>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: 5

                }}>

                    <Box sx={{
                        marginTop: 5,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                        <Button variant="contained" size="medium" onClick={goBack} sx={{
                            marginRight: 4,
                        }}>Cancel</Button>
                        <Button variant="contained" size="medium" onClick={sendSubmit}>Submit</Button>
                    </Box>
                </Box>

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
    )
}

export default CreateCustomer;