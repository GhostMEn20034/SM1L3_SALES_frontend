import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import AddAddress from "../../components/Address/AddAddress";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";

export default function AddAddressPage() {
    const location = useLocation();
    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{ my: 4, width: "60%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrumb breadCrumbData={breadCrumbData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Add a new address</Typography>
                <AddAddress />
            </Box>
        </Box>
    );
}