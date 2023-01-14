import ButtonAppBar from "../../Appbar"
import { Button, Checkbox, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ConfirmTransaction from "./ConfirmTransaction";
import ConfirmBankTransfer from "./ConfirmBankTransfer";


const BankTransfer = () => {


    const navigate = useNavigate();


    //account_id
    const [receiverId, setReceiverId] = useState();


    const [amount, setAmount] = useState('');
    const [contacts, setContacts] = useState([]);
    const [description, setDescription] = useState('');



    //account_number
    const [reciever, setReciever] = useState();


    //reciever_bank_account
    const [receiverAccount, setRecieverAccount] = useState();





    //open confirm otp dialog
    const [open, setOpen] = useState(false)
    //new transaction id just create
    const [transactionId, setTransctionId] = useState('');
    //new token id just create
    const [transactionToken, setTransactionToken] = useState('');
    //saved contact

    const [saved, setSaved] = useState(false)


    const bearer = 'Bearer ' + localStorage.getItem('token')





    const fetchContacts = async () => {
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/contacts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            if (!res.ok) throw new console.error(res);
            return res.json();
        }).then(data => {

            setContacts(data.results)
        })
    }

    useEffect(() => {
        fetchContacts();
    }, [])


    const sendSubmit = async () => {
        //const id = await getAccountId();
        //console.log('id' + id)
        const sendData = async () =>
        {
            await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/transactions/tp-bank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({
                    "account_number": reciever,
                    "amount": amount,
                    "description": "test",
                    "is_fee_paid_by_me": true
                })
            }).then(res => {
                console.log(res)
                return res.json();
            }).then(async (data) => {
                console.log(data)
                setTransctionId(data.id)
                setTransactionToken(data.token)
                setOpen(true)
            })
        }
       sendData();
    }

    const goBack = () => {
        navigate(-1);
    }


    const selectContact = async (event) => {
        setReciever(event.target.value)
        //getAccountId(event.target.value)
        getBankAccount(receiverId);

    }

    const getBankAccount = async (id) => {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts/guest/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setRecieverAccount(data)
        })

    }

    const getAccountId = () => {
        return fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/bank-accounts/tp-bank/${reciever}`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                //setReceiverId(data.results[0].id)
                console.log(data)
                //return data.results[0].id
            })
    }

    // const addContact = async () => {
    //     await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/contacts', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': bearer
    //         },
    //         body: JSON.stringify({
    //             "account_number": reciever,
    //             "bank_name": bankName,
    //             "suggest_name": name
    //         })
    //     }).then(res => {
    //         console.log(res)
    //         return res.json();
    //     }).then(data => {
    //         console.log(data)
    //     })
    // }



    return <Box sx={{
        backgroundColor: 'white', minHeight: '100vh'
    }}>
        <ButtonAppBar />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                width: '80vw',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,

            }}>
                <Typography variant='h6' align='start'>Reciever</Typography>
                <TextField onChange={(event) => { setReciever(event.target.value) }} fullWidth value={reciever}></TextField>
            </Box>
            <Box sx={{
                width: '80vw',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,

            }}>
                <Typography variant='h6' align='start'>Contact</Typography>
                <Select placeholder='Choose contact' onChange={selectContact} fullWidth>
                    {contacts?.map(e => {
                        return <MenuItem value={e.account_number} key={e.suggest_name} >{e.suggest_name}</MenuItem>
                    })}
                </Select>
            </Box>
            <Box sx={{
                width: '80vw',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,

            }}>
                <Typography variant='h6' align='start'>Amount</Typography>
                <TextField onChange={(event) => { setAmount(event.target.value) }} fullWidth value={amount}></TextField>

            </Box>
            <Box sx={{
                width: '80vw',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'

            }}>
                <Checkbox label="Save Contact" onChange={() => setSaved(prev => !prev)} /><Typography variant="button">Save Contact</Typography>

            </Box>
            <Box sx={{
                width: '80vw',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingTop: 5

            }}>

                <Box sx={{
                    marginTop: 5,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}>
                    <Button variant="contained" size="medium" onClick={goBack} sx={{
                        marginRight: 4,
                    }}>Cancel</Button>
                    <Button variant="contained" size="medium" onClick={sendSubmit}>Submit</Button>
                </Box>
                <ConfirmBankTransfer open={open} bearer={bearer} id={transactionId} token={transactionToken}></ConfirmBankTransfer>

            </Box>



        </Box>
    </Box>
}


export default BankTransfer