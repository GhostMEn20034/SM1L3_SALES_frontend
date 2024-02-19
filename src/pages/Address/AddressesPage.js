import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { createBreadCrumpDataFromUrl } from "../../utils/breadCrump/createBreadCrumpData";
import AddressesList from "../../components/Addresses/AddressesList";
import BreadCrump from "../../components/Navigation/BreadCrump";


export default function AddressesPage() {
    const location = useLocation();
    const breadCrumpData = createBreadCrumpDataFromUrl(location.pathname);
    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{ my: 4, width: "90%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrump breadCrumpData={breadCrumpData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Your addresses</Typography>
                <AddressesList />
            </Box>
        </Box>
    )
}