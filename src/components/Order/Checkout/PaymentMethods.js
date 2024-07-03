import { Box, Typography } from "@mui/material";
import PaymentMethodToButtonMapping from "../../Payments/PaymentMethodToButtonMapping";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';


export default function PaymentMethods({ paymentMethod, choosePaymentMethod }) {
    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                    Select your preferred payment method from the available options below.
                    For your security, all transactions are processed through a secure payment gateway.
                    Then click the "Next" button to go to the next checkout step.
                </Typography>
            </Box>
            <Box>
                <Box display="flex" alignItems="center" >
                    <PaymentMethodToButtonMapping
                        paymentMethod="paypal"
                        onClick={() => choosePaymentMethod('paypal')}
                    />
                    {paymentMethod === 'paypal' && (
                        <Box sx={{ ml: 1 }} display="flex" alignItems="center">
                            <CheckCircleOutlinedIcon fontSize="large" color="primary" />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}