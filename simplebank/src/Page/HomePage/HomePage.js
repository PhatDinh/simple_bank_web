import { AppBar, Button, CssBaseline, Dialog, DialogTitle, Grid, Paper, Typography, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonAppBar from "../../Appbar";
import tokenStore from '../tokenStore';

import Dashboard from "./Dashboard";
import Deposits from "./Deposits";
import Title from "./Title";



const HomePage = () => {

    const [profile, setProfile] = useState();


    const [open, setOpen] = useState(false);

    const navigate = useNavigate();




    const bearer = 'Bearer ' + tokenStore.accessToken;


    const fetchData = async () => {
        console.log('token: ' + tokenStore.accessToken)
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenStore.accessToken
            }
        }).then(res => {
            const oldToken = tokenStore.accessToken;
            const refresh = tokenStore.refreshToken;
            if (res.status == 499) {
                //tokenStore.getNewToken(oldToken,refresh);
                //fetchData();
            }
            return res.json();
        }).then(data => {
            console.log(data)
            setProfile(data.results[0])
        })
    }


    const deleteAccount = async (id) => {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new console.error(res);
            return res.json();
        }).then(data => {
            navigate('/')
        })
    }


    var reconnectFrequencySeconds = 1;
    var evtSource;

    var waitFunc = function () { return reconnectFrequencySeconds * 2000 };
    var tryToSetupFunc = function () {
        setupEventSource();
        reconnectFrequencySeconds *= 2;
        if (reconnectFrequencySeconds >= 64) {
            reconnectFrequencySeconds = 64;
        }
    };

    var reconnectFunc = function () { setTimeout(tryToSetupFunc, waitFunc()) };

    function setupEventSource() {
        evtSource = new EventSource(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/stream?token=${tokenStore.accessToken}`);
        evtSource.onmessage = function (e) {
            if (JSON.parse(e.data) != null) {
                setOpen(true)
            }

        };
        evtSource.onopen = function (e) {
            reconnectFrequencySeconds = 1;
        };
        evtSource.onerror = function (e) {
            evtSource.close();
            reconnectFunc();
        };
    }


    setupEventSource();


    const renderDebt = () => {
        return <Dialog open={open}>
            <DialogTitle>Debt </DialogTitle>
        </Dialog>
    }


    useEffect(() => {
        fetchData();
        //registerStream();
    }, [])

    return <Box>
        <ButtonAppBar />
        <Box sx={{
            width: '50vw',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: 1,
            marginTop: 30,
            padding: 5,
            borderRadius: 2
        }}>
            <Title>Account Balance:</Title>
            <Typography component="p" variant="h4">
                {profile?.cash_in}
            </Typography>
            <Title>Account Number:</Title>
            <Typography component="p" variant="h4">
                {profile?.account_number}
            </Typography>
            <Title>Account Status:</Title>
            <Typography component="p" variant="h4">
                {profile?.is_for_payment ? 'Active' : 'Deactive'}
            </Typography>



        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2
        }}>
            <Button variant="contained" sx={{
                marginRight: 2
            }}>Change Password</Button>
            <Button variant="contained" onClick={() => deleteAccount(profile?.id)}>Deactive Account</Button>
        </Box>
        <Dialog open={open}>
            <DialogTitle>Debt </DialogTitle>
        </Dialog>
    </Box>
}

export default HomePage;