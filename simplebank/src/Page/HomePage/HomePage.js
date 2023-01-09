import { AppBar, CssBaseline, Grid, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../Appbar";
import Dashboard from "./Dashboard";



const HomePage = () => {

    const [accounts, setAccounts] = useState([]);

    const bearer = localStorage.getItem('token')


    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts', {
            method: 'GET',
            mode: 'no-cors',
            Authorization: {
                'Bearer Token': bearer
            },
            headers: {

                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return Dashboard();
}

export default HomePage;