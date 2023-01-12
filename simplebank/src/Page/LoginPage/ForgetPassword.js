import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";



export default function ForgetPassword() {



    const [email, setEmail] = useState();
    //const [password, setPassword] = useState();


    const navigate = useNavigate();



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        sendOtp(data.get('email'))
    };

    function onChange(value) {
        console.log("Captcha value:", value);
    }


    const sendOtp = async (mail) => {
        fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/forget-password', {
            method:'POST',
            headers: {
                'content-type': 'application-json'
            },
            body: {
                'email': mail
            }
        }).then(res => {
            if (!res.ok) throw console.error(res);
            else return res;
        }).then(data => console.log(data))
    }

    return (
        <Box>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(https://img.freepik.com/free-vector/cartoon-illustration-bank-vault-inside-metallic-iron-safe-door_1441-2029.jpg?w=2000)",
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Forgot Password
                        </Typography>
                        <Typography>
                            Enter your email to receive an OTP to reset your passwrod
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={sendOtp}
                            >
                                SEND OTP
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}