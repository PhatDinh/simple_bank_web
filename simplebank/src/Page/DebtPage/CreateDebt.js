
import ButtonAppBar from "../../Appbar"
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const CreateDebt = () => {



    const navigate = useNavigate();
    const bearer = 'Bearer ' + localStorage.getItem('token')

    const [accountNumber, setAccountNumber] = useState();
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    //const [id, setId] = useState();

    

    const goBack = () => {
        navigate(-1);
    }

    const sendSubmit = async () => {


        const id = await getAccountId();

        const sendDebt = async () => {

            console.log(amount)

            fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({
                    "amount": amount,
                    "description": desc,
                    "receiver_bank_account_number": accountNumber,
                    "receiver_id": id,
                    "receiver_name": name
                })
            }).then(res => {
                if (!res.ok) {
                    throw console.error(res);
                }
                return res.json();
            }).then(data => {
                console.log(data)
                navigate('/debts')
            })
        }

        sendDebt();

    }


    const getAccountId = () => {
        return fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts/guest?account_number=${accountNumber}`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                return (data.results[0].id)
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
                    <Typography variant='h6' align='start'>Amount</Typography>
                    <TextField onChange={(event) => { setAmount(event.target.value) }} fullWidth value={amount}></TextField>
                </Box>
                <Box sx={{
                    width: '80vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,

                }}>
                    <Typography variant='h6' align='start'>description</Typography>
                    <TextField onChange={(event) => { setDesc(event.target.value) }} fullWidth value={desc}></TextField>
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
                        <Button variant="contained" size="medium" onClick={
                            sendSubmit
                        }>Submit</Button>
                    </Box>
                </Box>



            </Box>
        </Box>
    )
}

export default CreateDebt