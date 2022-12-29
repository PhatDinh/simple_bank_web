import { Box, Paper } from "@mui/material";
import ButtonAppBar from "../../Appbar";
import Title from "../HomePage/Title";


const ProfilePage = () => {
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
                        <Title>Profile</Title>
                    </Box></Paper>
            </Box>
        </Box>
    )
}


export default ProfilePage;