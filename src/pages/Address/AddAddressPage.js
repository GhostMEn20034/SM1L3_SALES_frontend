import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import AddAddress from "../../components/Addresses/AddAddress";
import BreadCrump from "../../components/Navigation/BreadCrump";
import { createBreadCrumpDataFromUrl } from "../../utils/breadCrump/createBreadCrumpData";

export default function AddAddressPage() {
    const location = useLocation();
    const breadCrumpData = createBreadCrumpDataFromUrl(location.pathname);

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{ my: 4, width: "60%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrump breadCrumpData={breadCrumpData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Add a new address</Typography>
                <AddAddress />
            </Box>
        </Box>
    );
}