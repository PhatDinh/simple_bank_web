import { AppBar, CssBaseline, Dialog, DialogTitle, Grid, } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../Appbar";
import Dashboard from "./Dashboard";



const HomePage = () => {

    const [profile, setProfile] = useState();


    const [open, setOpen] = useState(false);




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
        }).then(data => {
            console.log(data)
            setProfile(data[0])
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
        evtSource = new EventSource(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/stream?token=${localStorage.getItem('token')}`);
        evtSource.onmessage = function (e) {
            console.log(JSON.parse(e.data));
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
        <Dialog open={open}>
            <DialogTitle>Debt </DialogTitle>
        </Dialog>
    </Box>
}

export default HomePage;