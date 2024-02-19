import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import EditAddress from "../../components/Addresses/EditAddress";
import BreadCrump from "../../components/Navigation/BreadCrump";
import { createBreadCrumpDataFromUrl } from "../../utils/breadCrump/createBreadCrumpData";

export default function EditAddressPage() {
    const location = useLocation();
    const breadCrumpData = createBreadCrumpDataFromUrl(location.pathname);

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{ my: 4, width: "60%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrump breadCrumpData={breadCrumpData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Edit your address</Typography>
                <EditAddress />
            </Box>
        </Box>
    );
}