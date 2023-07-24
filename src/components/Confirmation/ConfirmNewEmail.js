import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxios from "../../utils/useAxios";
import { Box, Typography, TextField, Button, Alert, Link } from "@mui/material";

export default function ConfirmNewEmail() {
    const [OTP, setOTP] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

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

    const returnBack = () => {
        navigate(-1);
    }

    const sendOTP = async () => {
        try {
            await api.post('/api/verify/user/change-email/', {
                code: OTP,
                new_email: email
            });

            setSuccess("Email changed successfully");
    
            setTimeout(() => {
                navigate('/your-account/personal-info');
              }, 1000);
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    const resendOTP = async () => {
        try {
            await api.post(`/api/user/change-email/`, {
                new_email: email
            });
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
                            Verify email address
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1 }} display="flex">
                        <Typography variant="body1">
                            {email}
                        </Typography>
                        <Link component="button" variant="body2" onClick={returnBack} sx={{ ml: 1 }}>
                            Change
                        </Link>

                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1">
                            We've sent a One Time Password (OTP) to your email address. Please enter it below.
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