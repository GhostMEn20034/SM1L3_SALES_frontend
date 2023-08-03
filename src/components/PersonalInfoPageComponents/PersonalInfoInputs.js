import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField, Box, Button, Typography,
    InputLabel, Select, MenuItem, FormControl,
    Alert
} from "@mui/material";
import MyDatePicker from "../MyDatePicker";
import PhoneField from '../PhoneNumberField';
import useAxios from '../../utils/useAxios';
import dayjs from "dayjs";
import useUserInfo from "../../utils/useUserInfo";






const updatePersonalInfo = async (fields, setError, setSuccess, navigate, api) => {
    
    /// params:
    ///    - fields -- fields to update
    ///    - setError -- useState object for setting error
    ///    - setSuccess -- useState object for setting success
    ///    - navigate -- useNavigate hook
    ///    - api -- useAxios hook (located in utils/useAxios.js)
    
    try {
        let response = await api.patch(`/api/user/update-info/`, 
            {
            ...fields
            });

        let data = await response.data.success;
        
        setSuccess(data);

        setTimeout(() => {
            navigate(-1);
          }, 2000);

    } catch (error) {
        setError(error.response.data.error)
    }
}

export function ChangeFullName({ userData }) {
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { userInfo, updateUserInfo } = useUserInfo();

    const api = useAxios();
    const navigate = useNavigate();

    const updateFullName = async () => {
        try {
            let response = await api.patch(`/api/user/update-info/`, 
                {
                "first_name": firstName,
                "last_name": lastName 
                });
    
            let data = await response.data.success;
            
            setSuccess(data);
            
            // Call the updateUserInfo function with the new first name and last name
            updateUserInfo({ first_name: firstName, last_name: lastName });

            setTimeout(() => {
                navigate(-1);
              }, 2000);
    
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <>
            <Box sx={{ padding: 4 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                        If you want to change the full name associated with your Smile sales account, you may do so below. Be sure to click the <b>Save Changes</b> button when you are done.
                    </Typography>
                </Box>
                {success && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert> 
                </Box>
                )}
                {error && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert> 
                </Box>
                )}
                <Box sx={{mt: 3}}>
                    <TextField label='First name' size="small" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField label='Last name' size="small" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                </Box>
                <Box>
                    <Button variant="contained" onClick={updateFullName}
                    sx={{ mt: 3, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>Save changes</Button>
                </Box>
            </Box>
        </>
    )
}


export function ChangeDateOfBirth({ userData }) {
    const [dateOfBirth, setDateOfBirth] = useState(dayjs(userData.date_of_birth));
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const api = useAxios();

    const updateDateOfBirth = () => {
        updatePersonalInfo(
            {"date_of_birth": dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : null}, setError, setSuccess,
            navigate, api
            );
    }

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1">
                        If you want to change date of birth in your account, you may do so below. Be sure to click the <b>Save Changes</b> button when you are done.
                    </Typography>
                </Box>
                {success && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert> 
                </Box>
                )}
                {error && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert> 
                </Box>
                )}
                <Box sx={{mt: 3}}>
                    <MyDatePicker value={dateOfBirth} setValue={setDateOfBirth} />
                </Box>
                <Box>
                    <Button variant="contained" onClick={updateDateOfBirth}
                    sx={{ mt: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>Save changes</Button>
                </Box>
            </Box>
        </>
    )

}


export function ChangeSex({ userData }) {
    const [gender, setGender] = useState(userData.sex_display);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const api = useAxios();

    const updateSex = () => {
        updatePersonalInfo(
            {"sex": gender}, setError, setSuccess,
            navigate, api
            );
    }


    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1">
                        If you want to change sex in your account, you may do so below. Be sure to click the <b>Save Changes</b> button when you are done.
                    </Typography>
                </Box>
                {success && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert> 
                </Box>
                )}
                {error && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert> 
                </Box>
                )}
                <Box sx={{mt: 3}}>
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Sex</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={gender.toUpperCase()}
                            onChange={(e) => setGender(e.target.value)}
                            label="Sex"
                        >
                            <MenuItem value="">
                                <em>Unspecified</em>
                            </MenuItem>
                            <MenuItem value={"MALE"}>Male</MenuItem>
                            <MenuItem value={"FEMALE"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Button variant="contained" onClick={updateSex}
                    sx={{ mt: 2, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>Save changes</Button>
                </Box>
            </Box>
        </>
    )
}

export function ChangePhoneNumber({ userData }) {
    const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const api = useAxios();

    const updatePhoneNumber = () => {
        updatePersonalInfo(
            {"phone_number": phoneNumber}, setError, setSuccess,
            navigate, api
            );
    }

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1">
                        If you want to change phone number associated with your Smile sales account, you may do so below. Be sure to click the <b>Save Changes</b> button when you are done.
                    </Typography>
                </Box>
                {success && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert> 
                </Box>
                )}
                {error && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert> 
                </Box>
                )}
                <Box sx={{mt: 3}}>
                    <PhoneField value={phoneNumber} onChange={setPhoneNumber} size="medium" />
                </Box>
                <Box>
                    <Button variant="contained" onClick={updatePhoneNumber}
                        sx={{ mt: 3, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>Save changes</Button>
                </Box>
            </Box>
        </>
    )
}


export function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const api = useAxios();

    const changePassword = async () => {
        try {
            let response = await api.patch(`/api/user/change-password/`, 
                {
                "old_password": oldPassword,
                "new_password": newPassword,
                "new_password_confirmation": newPasswordConfirmation
                });
    
            let data = await response.data.success;
            
            setSuccess(data);
    
            setTimeout(() => {
                navigate(-1);
              }, 2000);
    
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1">
                        If you want to change password associated with your Smile sales account, you may do so below. Be sure to click the <b>Save Changes</b> button when you are done.
                        Note that new password should contain <b>at least 8 characters long</b>.
                    </Typography>
                </Box>
                {success && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert> 
                </Box>
                )}
                {error && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert> 
                </Box>
                )}
                <Box sx={{ mt: 3 }}>
                    <TextField label="Old password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} sx={{ minWidth: 250 }} />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <TextField label="New password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ minWidth: 250 }} />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <TextField label="New password confirmation" type="password" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} sx={{ minWidth: 250 }} />
                </Box>
                <Box>
                    <Button variant="contained" onClick={changePassword}
                        sx={{ mt: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>Save changes</Button>
                </Box>
            </Box>
        </>
    )
}



export function ChangeEmail({ userData }) {
    const [currentEmail, setCurrentEmail] = useState(userData.email);
    const [newEmail, setNewEmail] = useState(userData.email);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const api = useAxios();

    const updateEmail = async () => {
        try {
            await api.post(`/api/user/change-email/`, {
                new_email: newEmail
            });
            
            await navigate({
                pathname: '/change-email/verify'
            },
            {
                state: {email: newEmail}
            }
            );
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1">
                        Your current email address: {currentEmail} <br/>
                        Enter the new email address you would like to associate with your account below. <br />
                        We will send you OTP (One Time Password) to that email.
                    </Typography>
                </Box>
                {success && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert> 
                </Box>
                )}
                {error && (
                <Box sx={{mt: 2}}> 
                    <Alert severity="error" onClose={() => setError(null)}>{error}</Alert> 
                </Box>
                )}
                <Box sx={{mt: 3}}>
                    <TextField value={newEmail} onChange={(e) => setNewEmail(e.target.value)} sx={{minWidth: "300px"}} label="New email address"/>
                </Box>
                <Box>
                    <Button variant="contained" onClick={updateEmail}
                    sx={{ mt: 3, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>Continue</Button>
                </Box>
            </Box>
        </>
    )
}
