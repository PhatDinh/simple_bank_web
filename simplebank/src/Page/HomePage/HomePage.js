import { AppBar, CssBaseline, Grid, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../Appbar";
import Dashboard from "./Dashboard";



const HomePage = () => {

    const [account, setAccount] = useState();

    const bearer = 'Bearer ' + localStorage.getItem('token')
    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new console.error(res);
            return res.json();
        }).then(data => console.log(data.results))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return Dashboard();
}

export default HomePage;