import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import ButtonAppBar from "../../Appbar"




const AdminPage = () => {

    const [transactions, setTransactions] = useState([]);


    const bearer = 'Bearer ' + localStorage.getItem('token');

    const fetchData = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/admin/v1/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new Error(res.status);
            else return res.json();
        }).then(data => {
            console.log(data);
            setTransactions(data)
        })
    }


    useEffect(() => {
        fetchData();
    }, [])



    return <Box>
        <ButtonAppBar role={'Admin'} />

    </Box>

}


export default AdminPage 