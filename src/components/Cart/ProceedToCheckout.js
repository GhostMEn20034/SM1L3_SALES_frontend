import { Box, Typography, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { currencySymbol } from "../../utils/consts";

export default function ProceedToCheckout(props) {
    const location = useLocation();

    return (
        <Box>
            <Box display={"flex"} justifyContent={"center"}>
                <Typography variant="h6">
                    Total ({props.cartItemCount ? props.cartItemCount : 0} items): <b>{currencySymbol}{props.total}</b>
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} sx={{ mt: 2 }}>
                {props.user ? (
                    <Button variant="contained" size="small"
                        sx={{
                            backgroundColor: '#000000',
                            ":hover": { backgroundColor: "#1f1f1f" },
                            color: '#D5D507',
                            borderRadius: "10px",
                            minWidth: "250px",
                        }}>
                        Proceed To Checkout
                    </Button>
                ) : (
                    <Box>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <Typography>To proceed checkout you need to:</Typography>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <Typography>
                                <Link component={RouterLink} underline="hover" to={`/signin?nextDestination=${location.pathname}`}>Sign in</Link> Or <Link component={RouterLink} underline="hover" to={`/signup?nextDestination=${location.pathname}`}>Sign Up</Link>
                            </Typography>
                        </Box>
                        <Box sx={{mt: 1}}>
                            <Alert severity="info">
                                If you want to move your cart items to your own account, don't use Authorization via Google
                            </Alert>
                        </Box>
                    </Box>

                )}
            </Box>
        </Box>
    );
}