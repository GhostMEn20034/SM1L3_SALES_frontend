import PersonalInfo from "../../components/PersonalInfoComponents/PersonalInfo";
import { Box, Typography } from "@mui/material";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { useLocation } from "react-router-dom";
import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";

export default function PersonalInfoPage() {
    const location = useLocation();
    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{width: "40%", mb: 4}}>
                <Box
                    marginTop={2}
                >
                    <BreadCrumb breadCrumbData={breadCrumbData} />
                </Box>
                <Box
                >
                    <Typography variant='h4'>Personal information</Typography>
                </Box>
                <Box>
                    <PersonalInfo />
                </Box>
            </Box>
        </Box>
    );
} 
