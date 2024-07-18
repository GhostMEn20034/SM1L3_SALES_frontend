import { Alert, AlertTitle, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


export default function OrderArchivalAlerts(props) {
    const {
        successOrderArchival, setSuccessOrderArchival,
    } = props;

    return (
        <Box>
            <Box>
                {successOrderArchival && (
                    <Alert severity="success" onClose={() => setSuccessOrderArchival(null)}>
                        <AlertTitle>
                            Your Order has been archived
                        </AlertTitle>
                        Even though it will no longer appear in Your Orders, you can still view it in&nbsp;
                        <Link component={RouterLink} to='/your-account/archived-orders/'>
                            Archived Orders
                        </Link>
                        &nbsp;from Your Account.
                    </Alert>
                )}
            </Box>
        </Box>
    )
}