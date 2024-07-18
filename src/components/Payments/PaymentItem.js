import { Alert, Box, Typography } from "@mui/material";
import PaymentMethodToIconMapping from "./PaymentMethodToIconMapping";

export default function PaymentItem({ payment }) {
    const paymentTypeToTextMapping = {
        'payment': 'Regular Payment',
        'refund': 'Refund',
    };

    const paymentStatusToColorMapping = {
        'pending': "info",
        'success': "success",
        'canceled': "warning",
        'failed': "error",
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" boxShadow={3} padding={1} borderRadius="12px">

            <Box>
                <Typography variant="body1">
                    <b>Payment number:</b> {payment.provider_payment_id}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography variant="body1">
                        <b>Payment method:</b>
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" ml={0.5}>
                    <PaymentMethodToIconMapping paymentMethod={payment.provider} iconProps={{ width: "75px" }} />
                </Box>
            </Box>
            <Box>
                <Typography variant="body1">
                    <b>Payment type:</b> {paymentTypeToTextMapping[payment.type]}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <Alert
                        variant="outlined"
                        icon={false}
                        severity={paymentStatusToColorMapping[payment.status]}
                        sx={{ "padding": "1px !important" }}
                    >
                        <Typography color="green" variant="overline">
                            {payment.status}
                        </Typography>
                    </Alert>
                </Box>
                <Box>
                    <Typography variant="body1">
                        <b>{payment.gross_amount + " " + payment.currency}</b>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}