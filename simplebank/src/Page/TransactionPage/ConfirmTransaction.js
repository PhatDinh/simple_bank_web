import { Button, Dialog, DialogTitle, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react"
import { useNavigate } from "react-router-dom";



const ConfirmTransaction = (props) => {



    //value
    const { open, bearer, id, token, check, reciever, customerId } = props;

    const [otp, setOtp] = useState('');

    const [warning, setWarning] = useState(false)
    const navigate = useNavigate();

    const handleOtp = (event) => {
        setOtp(event.target.value)
    }

    const handleSubmit = async () => {
        console.log(otp);
        console.log(id);
        console.log(token);
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/transactions/confirm-success/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                "otp": otp,
                'token': token
            })
        }).then(res => {
            if (!res.ok) {
                setWarning(true);
                console.log(res)
            }
        }).then(data => {
            if (check==true)
            {
                addContact();
            }
            navigate('/transactions')
        })
    }

    const addContact = async () => {

        const name = await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/customers/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
        }).then(res => {
            console.log(res)
            return res.json();
        }).then(data => {
            return data.last_name
        })


        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                "account_number": reciever,
                "suggest_name": name
            })
        }).then(res => {
            console.log(res)
            return res.json();
        }).then(data => {
            console.log(data)
        })
    }



    return <Dialog open={open} sx={{
        textAlign: 'center',
    }} ><Box sx={{
    }}>
            <DialogTitle>Enter OTP</DialogTitle>
            <Box sx={{
                margin: 5
            }}>

                <Typography>Check your email for the OTP</Typography>

                <TextField placeholder="Input your OTP" onChange={handleOtp} ></TextField>
                {
                    warning && <Typography sx={{
                        marginTop: '3px',
                        fontSize: '12px',
                        color: 'red'
                    }}>Your OTP is wrong , Please try again</Typography>
                }

            </Box>
            <Button variant="contained" onClick={handleSubmit} sx={{

                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
            }}>Submit</Button>

        </Box>


    </Dialog>
}


export default ConfirmTransaction 