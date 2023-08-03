import { ChangeFullName, ChangeDateOfBirth, ChangeEmail,
    ChangeSex, ChangePhoneNumber, ChangePassword 
} from "../components/PersonalInfoPageComponents/PersonalInfoInputs";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import BreadCrump from "../components/BreadCrumpEditInfo";
import { fields } from "../components/PersonalInfoPageComponents/PersonalInfoFields";


const appActionToComponentMapping = {
    "changeFullName": (userData) => <ChangeFullName userData={userData} />,
    "changeDateOfBirth": (userData) => <ChangeDateOfBirth userData={userData}/>,
    "changeSex": (userData) => <ChangeSex userData={userData} />,
    "changePhoneNumber": (userData) => <ChangePhoneNumber userData={userData} />,
    "changePassword": () => <ChangePassword />,
    "changeEmail": (userData) => <ChangeEmail userData={userData} />
};


export default function ChangePersonalInfoPage({}) {


    const style = {
        width: '50%',
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

    if (!appAction) {
        return <h1>SOMETHING WENT WRONG</h1>
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginLeft="-19%"
                marginTop={2}
            >
                <BreadCrump fieldNameTochange={appAction === "changeFullName" ? "full name" : findFieldDisplayByAppAction(appAction)}/>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginRight="27.5%"
                marginTop={2}
            >
                <Typography variant="h4">Change {appAction === "changeFullName" ? "full name" : findFieldDisplayByAppAction(appAction) }</Typography>
            </Box>
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <Box sx={style}>
                    {appActionToComponentMapping[appAction](userData)}
                </Box>
            </Box>
        </>
    )
} 
