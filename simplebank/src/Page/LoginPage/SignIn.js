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
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import { Tab, Tabs } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha'
import tokenStore from '../tokenStore';






export default function SignInSide(props) {



  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [check, setCheck] = useState(false)



  //const [forgot] = props;


  const [tabIndex, setTabIndex] = useState(0);
  const labels = ["Customer", "Employee", "Admin",];

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  }




  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (tabIndex == 0) {
      handleCustomer(data);
    } else if (tabIndex == 1) {
      handleEmployee(data);
    } else if (tabIndex == 2) {
      handleAdmin(data);
    }
  };

  const handleCustomer = async (data) => {
    const login = await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application-json',
      },
      body: JSON.stringify({
        'username': data.get("email"),
        'password': data.get("password")
      })
    }).then(res => {
      console.log(res);
      if (!res.ok) throw new Error(res.status);
      else return res.json();
    }).then(data => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refesh', data.refresh_token);
      tokenStore.accessToken = data.access_token;
      tokenStore.refreshToken = data.refresh_token

      navigate('/home');
    })
  }



  const handleEmployee = async (data) => {
    const login = await fetch('https://infinite-beyond-71487.herokuapp.com/api/employee/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application-json',
      },
      body: JSON.stringify({
        'username': data.get("email"),
        'password': data.get("password")
      })
    }).then(res => {
      console.log(res);
      if (!res.ok) throw new Error(res.status);
      else return res.json();
    }).then(data => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refesh', data.refresh_token);
      navigate('/employee');
    })
  }

  const handleAdmin = async (data) => {
    const login = await fetch('https://infinite-beyond-71487.herokuapp.com/api/admin/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application-json',
      },
      body: JSON.stringify({
        'username': data.get("email"),
        'password': data.get("password")
      })
    }).then(res => {
      console.log(res);
      if (!res.ok) throw new Error(res.status);
      else return res.json();
    }).then(data => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refesh', data.refresh_token);
      navigate('/admin');
    })
  }

  const handleCaptcha = () => {

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
              Sign in
            </Typography>
            <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" textColor='primary'>

              {labels.map((value, index) => {
                const tabColor = index === tabIndex ? '#ccffd1' : 'white'
                return <Tab label={value} sx={{ border: 0.25, backgroundColor: tabColor, color: 'black' }} ></Tab>
              })}
            </Tabs>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box sx={{

              }}>
                <ReCAPTCHA
                  sitekey="6LcoOfIjAAAAAOhntIUdgpSEvpBZrDkPw-Phe0nA"
                  onChange={handleCaptcha}
                  size='normal'
                  style={{ display: 'flex', justifyContent: 'center' }}
                />
              </Box>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={props.forgot}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}