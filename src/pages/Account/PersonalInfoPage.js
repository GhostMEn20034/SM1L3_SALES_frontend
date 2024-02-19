import PersonalInfo from "../../components/PersonalInfoComponents/PersonalInfo";
import { Box, Typography } from "@mui/material";
import BreadCrump from "../../components/Navigation/BreadCrump";
import { useLocation } from "react-router-dom";
import { createBreadCrumpDataFromUrl } from "../../utils/breadCrump/createBreadCrumpData";

export default function PersonalInfoPage() {
    const location = useLocation();
    const breadCrumpData = createBreadCrumpDataFromUrl(location.pathname);

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{width: "40%", mb: 4}}>
                <Box
                    marginTop={2}
                >
                    <BreadCrump breadCrumpData={breadCrumpData} />
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
