import PersonalInfo from "../components/PersonalInfoPageComponents/PersonalInfo";
import { Box, Typography } from "@mui/material";
import BreadCrump from "../components/BreadCrump";

export default function PersonalInfoPage() {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginLeft="-27%"
                marginTop={2}
            >
                <BreadCrump />
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginLeft="-20%"
            >
                <Typography variant='h4'>Personal information</Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <PersonalInfo />
            </Box>
        </>
    )
} 
