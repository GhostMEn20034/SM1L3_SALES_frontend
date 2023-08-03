import AddAddress from "../components/Addresses/AddAddress";
import BreadCrumpOtherPages from "../components/BreadCrumpOtherPages";
import { Box, Typography } from "@mui/material";

export default function AddAddressPage() {
    return (
        <Box sx={{ mx: 40, my: 4 }}>
            <Box sx={{ mb: 1 }}>
                <BreadCrumpOtherPages />
            </Box>
            <Typography sx={{ mb: 1 }} variant="h4">Add a new address</Typography>
            <AddAddress />
        </Box>
    )
}