import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import ButtonAppBar from "../../Appbar"




const AdminPage = () => {

    const [employees, setEmployees] = useState([]);


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