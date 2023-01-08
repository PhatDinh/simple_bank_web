
import ButtonAppBar from "../../Appbar";
import Dashboard from "../HomePage/Dashboard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Orders from "../HomePage/Orders";
import { createTheme, Paper } from "@mui/material";
import { Box } from "@mui/system";
import TransactionTable from "./TransactionTable";
import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";


const mdTheme = createTheme();

const TransactionPage = () => {



    useEffect(() =>{
        
    },[])


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
                justifyContent: 'center',
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
                        <TransactionTable />
                    </Box></Paper>

            </Box>


        </Box>

    )
}

export default TransactionPage;