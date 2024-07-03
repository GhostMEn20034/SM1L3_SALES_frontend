import { Box, Typography } from "@mui/material";
import PaymentMethodToIconMapping from "../../Payments/PaymentMethodToIconMapping";
import PaymentMethodToButtonMapping from "../../Payments/PaymentMethodToButtonMapping";

export default function CompleteOrderStep(props) {
    const { paymentMethod, address, completePayment } = props;

    return (
        <Box>
            <Box>
                <Typography variant="body1">
                    <b>Shipping Address:</b> {address}
                </Typography>
            </Box>
            <Box display="flex" sx={{mt: 2}}>
                <Typography variant="body1" sx={{mr: 0.5}}>
                    <b>Payment Method:</b>
                </Typography>
                <PaymentMethodToIconMapping
                    paymentMethod={paymentMethod}
                    iconProps={{ width: "80px" }}
                />
            </Box>
            <Box sx={{mt: 2}}>
                <Box sx={{mb: 1}}>
                    <Typography variant="body1">
                        Click Button below to complete the order:
                    </Typography>
                </Box>
                <Box>
                    <PaymentMethodToButtonMapping paymentMethod={paymentMethod} onClick={completePayment} />
                </Box>
            </Box>
        </Box>
    )
}