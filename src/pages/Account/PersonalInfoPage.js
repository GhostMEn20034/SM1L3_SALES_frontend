import PersonalInfo from "../../components/PersonalInfoComponents/PersonalInfo";
import { Box, Container, Typography } from "@mui/material";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { useLocation } from "react-router-dom";
import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";

export default function PersonalInfoPage() {
    const location = useLocation();
    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);

    return (
        <Container
            maxWidth='lg'
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box sx={{ mb: 4 }}>
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
        </Container>
    );
} 
