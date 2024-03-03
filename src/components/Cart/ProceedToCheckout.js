import { currencySymbol } from "../../utils/consts";
import { Box, Typography, Button } from "@mui/material";

export default function ProceedToCheckout(props) {
    return (
        <Box>
            <Box display={"flex"} justifyContent={"center"}>
                <Typography variant="h6">
                    Total ({props.cartItemCount ? props.cartItemCount : 0} items): <b>{currencySymbol}{props.total}</b>
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} sx={{ mt: 2 }}>
                <Button variant="contained" size="small"
                    sx={{
                        backgroundColor: '#000000',
                        ":hover": { backgroundColor: "#1f1f1f"},
                        color: '#D5D507',
                        borderRadius: "10px",
                        minWidth: "250px",
                    }}>
                    Proceed To Checkout
                </Button>
            </Box>
        </Box>
    );
}