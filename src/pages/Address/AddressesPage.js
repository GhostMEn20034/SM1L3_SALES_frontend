import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";
import AddressesList from "../../components/Address/AddressesList";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";


export default function AddressesPage() {
    const location = useLocation();
    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);
    return (
        <Box display="flex" justifyContent="center" py={1} px={6}>
            <Box sx={{ my: 4, width: "100%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrumb breadCrumbData={breadCrumbData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Your addresses</Typography>
                <AddressesList />
            </Box>
        </Box>
    )
}