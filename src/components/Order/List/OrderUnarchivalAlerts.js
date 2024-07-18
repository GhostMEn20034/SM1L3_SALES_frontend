import { Alert, AlertTitle, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


export default function OrderUnarchivalAlerts(props) {
    const {
        successOrderUnarchival, setSuccessOrderUnarchival,
    } = props;

    return (
        <Box>
            <Box>
                {successOrderUnarchival && (
                    <Alert severity="success" onClose={() => setSuccessOrderUnarchival(null)}>
                        <AlertTitle>
                            Your Order has been unarchived
                        </AlertTitle>
                            It will no longer appear in Your Archived Orders, you can view it in&nbsp;
                        <Link component={RouterLink} to='/your-account/order-history/'>
                            Your Orders
                        </Link>
                        &nbsp;from Your Account.
                    </Alert>
                )}
            </Box>
        </Box>
    )
}