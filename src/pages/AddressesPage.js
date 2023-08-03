import AddressesList from "../components/Addresses/AddressesList";
import { Box, Typography } from "@mui/material";
import BreadCrumpOtherPages from "../components/BreadCrumpOtherPages";


export default function AddressesPage () {
    return (
        <Box sx={{ml: 14, my: 4}}>
            <Box sx={{mb: 1}}>
                <BreadCrumpOtherPages />
            </Box>
            <Typography sx={{mb: 1}} variant="h4">Your addresses</Typography>
            <AddressesList />
        </Box>
    )
}