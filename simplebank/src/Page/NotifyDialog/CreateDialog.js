import { AppBar, Button, CssBaseline, Dialog, DialogTitle, Grid, Paper, TextField, Typography, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonAppBar from "../../Appbar";
//import CreateDialog from "../NotifyDialog/CreateDialog";
import tokenStore from '../../store/tokenStore';




const CreateDialog = (props) => {
    const debt = props.debt
    const bearer = props.bearer

    const navigate = useNavigate();

    const [otp, setOtp] = useState('')
    const [debtToken, setDebtToken] = useState()

    const getOTP = async () => {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts/fulfill/${tokenStore.notifyId}`, {
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
            setDebtToken(data.token)
        })
    }


    const handleSubmit = async () => {
        console.log(debtToken)
        console.log(otp)
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts/fulfill-with-token/${tokenStore.notifyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({
                "otp": otp,
                'token': debtToken
            })
        }).then(res => {
            if (!res.ok) {
                console.log(res)
                navigate('/home')
            }
        })
    }



    return <Dialog open={tokenStore.openDialog}>
        <DialogTitle>Debt Notify </DialogTitle>
        <Box sx={{
            margin: 5
        }}>
            <Typography sx={{

            }}>Name: {debt.owner_name} </Typography>
            <Typography sx={{
                marginTop: 1,
                marginBottom: 1
            }}>Amount: {debt.amount}</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextField placeholder="Input your OTP" variant="outlined" onChange={(e) => setOtp(e.target.value)} ></TextField>
                <Button onClick={getOTP}>Send OTP</Button>
            </Box>

        </Box>

        <Box sx={{
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Button variant="contained" onClick={handleSubmit} sx={{
                marginRight: 2

            }}>Submit</Button>
            <Button variant="contained" onClick={() => {
                tokenStore.resetNotify();
                navigate('/debts')
            }}>Close</Button>
        </Box>

    </Dialog>
}

export default CreateDialog 