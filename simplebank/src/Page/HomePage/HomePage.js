import { AppBar, Button, CssBaseline, Dialog, DialogTitle, Grid, Paper, TextField, Typography, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonAppBar from "../../Appbar";
import CancelDialog from "../NotifyDialog/CancelDialog";
import CreateDialog from "../NotifyDialog/CreateDialog";
import FulfillDialog from "../NotifyDialog/FulfillDialog";
import tokenStore from '../../store/tokenStore';

import Title from "./Title";



const HomePage = () => {

    const [profile, setProfile] = useState();

    const navigate = useNavigate();

    const [debt, setDebt] = useState({})
    const [debtToken, setDebtToken] = useState()
    const [otp, setOtp] = useState('')



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




    const bearer = 'Bearer ' + tokenStore.accessToken;


    const fetchData = async () => {
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

    var waitFunc = function () { return reconnectFrequencySeconds * 1000 };
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

        evtSource.onmessage = async function (e) {
            console.log(JSON.parse(e.data))
            console.log(tokenStore.notifyId)
            if (tokenStore.notifyId == '') {
                const temp = JSON.parse(e.data)
                tokenStore.notifyId = temp.message;

                if (temp.event == 'debt_created') {
                    tokenStore.typeDialog = 'create'
                } else if (temp.event == 'debt_canceled') {
                    console.log('cancel'
                    )
                    tokenStore.typeDialog = 'cancel'
                } else if (temp.event == 'debt_fulfilled') {
                    tokenStore.typeDialog = 'fulfill'
                }

                await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts/${tokenStore.notifyId}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application-json',
                        'Authorization': 'Bearer ' + tokenStore.accessToken
                    },
                }).then(res => {
                    if (!res.ok) throw new console.error(res);
                    else return res.json();
                }).then(data => {
                    setDebt(data)
                    tokenStore.openDialog = true;
                }
                )


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
                {profile?.cash_in - profile?.cash_out}
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
        {
            (tokenStore.typeDialog == 'create') ? <CreateDialog bearer={bearer} debt={debt} /> : (tokenStore.typeDialog == 'cancel') ? <CancelDialog debt={debt} /> : (tokenStore.typeDialog == 'fulfill') ? <FulfillDialog debt={debt} /> : ''
        }

    </Box>
}

export default HomePage;