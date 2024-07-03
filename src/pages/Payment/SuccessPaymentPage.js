import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";


export default function SuccessPaymentPage() {
    const [searchParams] = useSearchParams();
    const paymentMethod = searchParams.get("paymentMethod");


    const [errorMsg, setErrorMsg] = useState(null);
    const [success, setSuccess] = useState(false);
    const [captureLoading, setCaptureLoading] = useState(false);


    const ordersApi = useAxios("orders");


    const capturePaypalPayment = async (token, orderId) => {
        setCaptureLoading(true);
        
        let requestBody = {
            order_id: orderId,
        };

        try {
            await ordersApi.post(`/api/v1/payments/paypal/${token}/capture/`, requestBody);
            setSuccess(true);
        } catch (e) {
            setErrorMsg("Unable to confirm payment");
        }

        setCaptureLoading(false);
    };

    useEffect(() => {
        if (paymentMethod === 'paypal') {
            let token = searchParams.get("token");
            let orderId = searchParams.get("orderId");
            capturePaypalPayment(token, orderId);
        } else {
            setErrorMsg("Unable to confirm payment");
        };
    }, []);


    if (captureLoading) {
        return (
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Container sx={{py: 2}}>
            {success && (
                <Alert>
                    Payment #{searchParams.get("token")} captured successfully
                </Alert>
            )}
            {errorMsg && (
                <Alert severity="error">
                    {errorMsg}
                </Alert>
            )}
        </Container>
    );
}