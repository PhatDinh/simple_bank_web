
import ButtonAppBar from "../../Appbar"
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const CreateCustomer = () => {
    const navigate = useNavigate();
    const bearer = 'Bearer ' + localStorage.getItem('token')

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');


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

                

            </Box>
        </Box>
    )
}

export default CreateCustomer;