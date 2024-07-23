import { Alert, Box, CircularProgress, Container, Link, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

import UserContext from "../../context/UserContext";
import useAxios from "../../utils/useAxios";
import PaymentMethodToIconMapping from "../../components/Payments/PaymentMethodToIconMapping";


export default function SuccessPaymentPage() {
    const { userInfo } = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const paymentMethod = searchParams.get("paymentMethod");

    let orderId = searchParams.get("orderId");
    let orderDate = searchParams.get("orderDate")

    const orderSummaryTitles = ["Order number", "Order date", "Estimated delivery", "Payment number"];

    const [errorMsg, setErrorMsg] = useState(null);
    const [success, setSuccess] = useState(false);
    const [orderSummaryValues, setOrderSummaryValues] = useState(null);

    const [captureLoading, setCaptureLoading] = useState(false);


    const ordersApi = useAxios("orders");


    const capturePaypalPayment = async (token) => {
        setCaptureLoading(true);

        let requestBody = {
            order_id: orderId,
        };

        try {
            await ordersApi.post(`/api/v1/payments/paypal/${token}/capture/`, requestBody);

            setOrderSummaryValues([orderId, dayjs(orderDate).format("LL"), "Within 4-7 business days", token]);
            setSuccess(true);
        } catch (e) {
            setErrorMsg("Error. Unable to confirm payment");
            console.log(e.response.data);
        }

        setCaptureLoading(false);
    };

    useEffect(() => {
        if (!userInfo) {
            return;
        }

        if (paymentMethod === 'paypal') {
            let token = searchParams.get("token");
            capturePaypalPayment(token);
        } else {
            setErrorMsg("Error. Unable to confirm payment");
        };
        setSuccess(true)
    }, [userInfo]);

    console.log(errorMsg);

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

    if (errorMsg) {
        return (
            <Container maxWidth="xl" sx={{ py: 2 }}>
                <Alert severity="error" sx={{ alignItems: "center" }}>
                    <Box>{errorMsg}</Box>
                    <Box display="flex" alignItems="center">
                        <Link
                            component={RouterLink}
                            underline="hover"
                            to="/"
                        >
                            Go to main page
                        </Link>
                    </Box>
                </Alert>
            </Container>
        );
    }


    return (
        <Container disableGutters maxWidth="xl" sx={{ py: 2 }}>
            {success && (
                <Box>
                    <Alert icon={false} severity="warning" sx={{ width: "100%" }}>
                        <Box>
                            <Typography variant="h6">
                                <b>Thank you</b>, your order has been placed.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">
                                A detailed confirmation report has been sent to your email address: <b>{userInfo?.user?.email}</b> <br />
                                This report includes your order details, product information, and estimated delivery timeframe.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Typography variant="body1">
                                    Here's a quick summary of your order:
                                </Typography>
                            </Box>
                            {orderSummaryTitles?.length > 0 && orderSummaryValues?.length > 0 && (
                                <Box>
                                    <List dense>
                                        {orderSummaryTitles.map((item, index) => (
                                            <ListItem key={index} sx={{ display: "flex" }}>
                                                <Typography variant="body2">
                                                    {item}: {orderSummaryValues[index]}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                        <ListItem>
                                            <Box display="flex" alignItems="center" >
                                                <Box sx={{ mr: 0.5 }}>
                                                    <Typography variant="body2">
                                                        Payment Method:
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" alignItems="center">
                                                    <PaymentMethodToIconMapping paymentMethod={paymentMethod} iconProps={{ width: "90%" }} />
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    </List>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ mt: 2 }} display="flex" alignItems="center">
                            <Box display="flex" alignItems="center">
                                <Link
                                    component={RouterLink}
                                    underline="hover"
                                    to={`/your-account/order-history/${orderId}`}
                                >
                                    Review or edit your order
                                </Link>
                            </Box >
                            <Box sx={{ mx: 0.5 }} display="flex" alignItems="center">
                                <Typography variant="body1">
                                    |
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Link
                                    component={RouterLink}
                                    underline="hover"
                                    to="/"
                                >
                                    Go to main page
                                </Link>
                            </Box>
                        </Box>
                    </Alert>
                </Box>
            )}
        </Container>
    );
}