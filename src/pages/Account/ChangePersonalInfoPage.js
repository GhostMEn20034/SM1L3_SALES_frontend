import {
    ChangeFullName, ChangeDateOfBirth, ChangeEmail,
    ChangeSex, ChangePhoneNumber, ChangePassword
} from "../../components/PersonalInfoComponents/PersonalInfoInputs";
import { useLocation } from "react-router-dom";
import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";
import { Box, Typography } from "@mui/material";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { fields } from "../../components/PersonalInfoComponents/PersonalInfoFields";


const appActionToComponentMapping = {
    "changeFullName": (userData) => <ChangeFullName userData={userData} />,
    "changeDateOfBirth": (userData) => <ChangeDateOfBirth userData={userData} />,
    "changeSex": (userData) => <ChangeSex userData={userData} />,
    "changePhoneNumber": (userData) => <ChangePhoneNumber userData={userData} />,
    "changePassword": () => <ChangePassword />,
    "changeEmail": (userData) => <ChangeEmail userData={userData} />
};

export default function ChangePersonalInfoPage() {

    const style = {
        bgcolor: 'background.paper',
        border: 1,
        borderRadius: "10px",
        borderColor: "#e3e1cf",
        mt: 1,
    };

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const appAction = params.get("appAction");

    const userData = location.state;

    const findFieldDisplayByAppAction = (appAction) => {
        let filtered = fields.filter(field => field.appAction === appAction);
        // check if the filtered array is not empty
        if (filtered.length > 0) {
            // return the lowercased fieldDisplay of the first element
            return filtered[0].fieldDisplay.toLowerCase();
        }
        // return null if no match is found
        return null;
    }


    const fieldNameToDisplay = appAction === "changeFullName" ?
        "full name" : findFieldDisplayByAppAction(appAction);

    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname, "Change " + fieldNameToDisplay);

    if (!appAction) {
        return <h1>SOMETHING WENT WRONG</h1>
    }

    return (
        <Box display={"flex"} justifyContent={"center"}>
            <Box sx={{width: "40%"}}>
                <Box
                    marginTop={2}
                >
                    <BreadCrumb breadCrumbData={breadCrumbData} />
                </Box>
                <Box
                    marginTop={2}
                >
                    <Typography variant="h4">Change {fieldNameToDisplay}</Typography>
                </Box>
                <Box>
                    <Box sx={style}>
                        {appActionToComponentMapping[appAction](userData)}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
} 
