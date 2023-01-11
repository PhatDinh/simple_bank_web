
import ButtonAppBar from "../../Appbar"
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const CreateContact = (props) => {



    const navigate = useNavigate();
    const bearer = 'Bearer ' + localStorage.getItem('token')

    const [accountNumber, setAccountNumber] = useState('');
    const [name, setName] = useState('');
    const [bankName, setBankName] = useState('');


    const goBack = () => {
        navigate(-1);
    }

    const sendSubmit = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                "account_number": accountNumber,
                "bank_name": bankName,
                "suggest_name": name
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
            <ButtonAppBar />
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
                    <Typography variant='h6' align='start'>Account Number</Typography>
                    <TextField onChange={(event) => { setAccountNumber(event.target.value) }} fullWidth value={accountNumber}></TextField>
                </Box>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,

                }}>
                    <Typography variant='h6' align='start'>Name</Typography>
                    <TextField onChange={(event) => { setName(event.target.value) }} fullWidth value={name}></TextField>
                </Box>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,

                }}>
                    <Typography variant='h6' align='start'>Bank Name</Typography>
                    <TextField onChange={(event) => { setBankName(event.target.value) }} fullWidth value={bankName}></TextField>
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

export default CreateContact