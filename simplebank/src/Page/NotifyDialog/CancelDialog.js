


import { AppBar, Button, CssBaseline, Dialog, DialogTitle, Grid, Paper, TextField, Typography, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonAppBar from "../../Appbar";
//import CreateDialog from "../NotifyDialog/CreateDialog";
import tokenStore from '../tokenStore';



const CancelDialog = (props) => {
    const debt = props.debt


    const navigate = useNavigate();



    return <Dialog open={tokenStore.openDialog}>
        <DialogTitle>Debt Cancel Notify </DialogTitle>
        <Box sx={{
            margin: 5
        }}>
            <Typography sx={{

            }}>Name: {debt.owner_name} </Typography>
            <Typography sx={{
                marginTop: 1,
                marginBottom: 1
            }}>Amount: {debt.amount}</Typography>
        </Box>
        <Box sx={{
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Button variant="contained" onClick={() => {
                tokenStore.resetNotify();
                navigate('/debts')
            }}>Close</Button>
        </Box>

    </Dialog>
}

export default CancelDialog