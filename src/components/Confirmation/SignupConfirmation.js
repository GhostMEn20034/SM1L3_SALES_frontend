import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import useAxios from "../../utils/useAxios";
import { Box, Typography, TextField, Button, Alert, Link } from "@mui/material";
import jwt_decode from 'jwt-decode';
import AuthContext from "../../context/AuthContext";

export default function ConfirmSignup() {
    const [OTP, setOTP] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const {setAuthTokens, setUser} = useContext(AuthContext);

    const location = useLocation();

    const email = location.state.email;

    const api = useAxios();

    const style = {
        width: '30%',
        bgcolor: 'background.paper',
        border: 1,
        borderRadius: "10px",
        borderColor: "#e3e1cf",
        mt: 1,
        padding: 3
    };

    const sendOTP = async () => {
        try {
            let response = await api.post('/api/verification/signup-confirmation/', {
                code: OTP,
                token: sessionStorage.getItem("token")
            });
            let response_data = await response.data;
            setSuccess("Account verified successfully");
    
            setTimeout(() => {
                setAuthTokens(response_data);
                setUser(jwt_decode(response_data.access));
                localStorage.setItem("authTokens", JSON.stringify(response_data));
                localStorage.removeItem("cartUuid");
                window.location.assign("/");
              }, 1000);
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    const resendOTP = async () => {
        try {
            let response = await api.post(`/api/verification/resend-otp/`, {
                token: sessionStorage.getItem("token"),
                action_type: 'signup-confirmation'
            });

            let response_data = await response.data;
            sessionStorage.setItem("token", response_data.token);
            

            setSuccess("A new One Time Password (OTP) has been sent.")
        } catch (error) {
            setError(error.response.data.error)
        }
    }


    return (
        <>
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 5 }}>
                <Box sx={style}>
                    <Box>
                        <Typography variant="h4">
                            Verify account
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1">
                            We've sent a One Time Password (OTP) to your {email}. Please enter it below.
                        </Typography>
                    </Box>
                    {success && (
                        <Box sx={{ mt: 2 }}>
                            <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert>
                        </Box>
                    )}
                    {error && (
                        <Box sx={{ mt: 2 }}>
                            <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <TextField label='Enter OTP' size="small" value={OTP} onChange={(e) => setOTP(e.target.value)} fullWidth />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" fullWidth onClick={sendOTP}
                            sx={{ borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}
                        >
                            Continue
                        </Button>
                    </Box>
                    <Box sx={{ mt: 4 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Link component="button" variant="body2" onClick={resendOTP}>
                            Resend OTP
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}