import { useEffect, useState } from "react";
import DebtTable from "./DebtTable";

import ButtonAppBar from "../../Appbar";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import tokenStore from "../../store/tokenStore";


const DebtPage = () => {

    const bearer = 'bearer ' + tokenStore.accessToken;

    const [debts, setDebts] = useState([]);


    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            setDebts(data.results)
        })
    }





    useEffect(() => {
        fetchData();
    }, [])




    return (
        <Box
            sx={{
                flexGrow: 1,
                height: '100vh',
                backgroundColor: '#f5f5f5',
                margin: 0

            }}>
            <ButtonAppBar />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Paper sx={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    marginTop: 20
                }}> <Box sx={{
                    minWidth: '80vw',
                    minHeight: '50vh'
                }}>
                        <DebtTable debt={debts} bearer={bearer} />
                    </Box></Paper>

            </Box>


        </Box>
    )

}

export default DebtPage