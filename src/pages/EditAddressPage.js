import EditAddress from "../components/Addresses/EditAddress";
import BreadCrumpOtherPages from "../components/BreadCrumpOtherPages";
import { Box, Typography } from "@mui/material";

export default function EditAddressPage () {
    return (
        <Box sx={{ mx: 40, my: 4 }}>
            <Box sx={{ mb: 1 }}>
                <BreadCrumpOtherPages />
            </Box>
            <Typography sx={{ mb: 1 }} variant="h4">Edit your address</Typography>
            <EditAddress />
        </Box>
    )
}