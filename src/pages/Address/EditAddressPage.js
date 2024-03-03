import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import EditAddress from "../../components/Address/EditAddress";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";

export default function EditAddressPage() {
    const location = useLocation();
    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{ my: 4, width: "60%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrumb breadCrumbData={breadCrumbData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Edit your address</Typography>
                <EditAddress />
            </Box>
        </Box>
    );
}