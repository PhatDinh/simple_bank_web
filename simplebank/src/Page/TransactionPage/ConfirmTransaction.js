import { Button, Dialog, DialogTitle, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react"



const ConfirmTransaction = (props) => {



    //value
    const { open, bearer, id } = props;
    const token = localStorage.getItem('token')

    const [otp, setOtp] = useState('');

    const [warning, setWarning] = useState(false)

    const handleOtp = (event) => {
        setOtp(event.target.value)
    }

    const handleSubmit = async () => {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/transactions/${id}}`, {
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
            console.log(res)
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
            <Button variant="contained" sx={{

                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
            }}>Submit</Button>

        </Box>


    </Dialog>
}


export default ConfirmTransaction 