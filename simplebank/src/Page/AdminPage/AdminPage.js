import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import ButtonAppBar from "../../Appbar"
import EmployeeTable from "./EmployeeTable";
import TransactionTable from "./TransactionTable";




const AdminPage = () => {

    const [employees, setEmployees] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);
    const labels = ["Transaction", "Employee"];

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    }


    const bearer = 'Bearer ' + localStorage.getItem('token');

    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/admin/v1/employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (res.status == 498) {

            }
            else if (!res.ok) console.log(res)
            else return res.json();
        }).then(data => {
            setEmployees(data.results)
            console.log(data)
        })
    }

    const fetchTransaction = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/admin/v1/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (res.status == 498) {

            }
            else if (!res.ok) console.log(res)
            else return res.json();
        }).then(data => {
            setTransactions(data.results)
            console.log(data)
        })
    }


    useEffect(() => {
        fetchData();
        fetchTransaction();
    }, [])



    return <Box
        sx={{
            height: '100vh',
            backgroundColor: '#f5f5f5',
            margin: 0

        }}>
        <ButtonAppBar role={'Admin'} />
        <Tabs sx={{
            marginTop: 15,
            width: '50vw',
            marginLeft: 'auto',
            marginRight: 'auto'
        }} value={tabIndex} onChange={handleTabChange} variant="fullWidth" textColor='primary'>

            {labels.map((value, index) => {
                const tabColor = index === tabIndex ? '#ccffd1' : 'white'
                return <Tab label={value} sx={{ border: 0.25, backgroundColor: tabColor, color: 'black' }} ></Tab>
            })}
        </Tabs>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Box sx={{
                minWidth: '80vw',
                minHeight: '50vh',
                marginTop: 15
            }}>
                {tabIndex == 1 ? <EmployeeTable employees={employees} bearer={bearer}/> : <TransactionTable transactions={transactions} />}
            </Box>

        </Box>


    </Box>

}


export default AdminPage 