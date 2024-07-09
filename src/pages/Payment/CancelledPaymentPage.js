import { Box, Typography, CircularProgress, Alert, Container, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";

import useAxios from "../../utils/useAxios";


export default function CancelledPaymentPage() {
    const [searchParams] = useSearchParams();
    const [cancelingLoading, setCancelingLoading] = useState(false);

    let orderId = searchParams.get("orderId");

    const ordersApi = useAxios("orders");

    const cancelOrder = async () => {
        setCancelingLoading(true);

        try {
            await ordersApi.post(`/api/v1/orders/${orderId}/cancel/`);
        } catch (e) {
            console.log("Something went wrong");
        }

        setCancelingLoading(false);
    };

    useEffect(() => {
        cancelOrder();
    }, []);


    if (cancelingLoading) {
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
        <Container disableGutters maxWidth="xl" sx={{ py: 2 }}>
            <Alert icon={false} severity="warning">
                <Box>
                    <Typography variant="h6">
                        <b>Your order is canceled</b>
                    </Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body1">
                        Order number: <b>{orderId}</b>
                    </Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body1">
                        Thank you for your interest in our products. <br />
                        We understand that circumstances can change,
                        and we apologize for any inconvenience caused.
                    </Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body1">
                        We've received confirmation that your order has been <b>canceled</b>. <br />
                        Your order <b>will not be processed</b> further.
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }} display="flex" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <Link
                            component={RouterLink}
                            underline="hover"
                            to="/"
                        >
                            Review your order
                        </Link>
                    </Box >
                    <Box sx={{ mx: 0.5 }} display="flex" alignItems="center">
                        <Typography variant="body1">
                            |
                        </Typography>
                    </Box>
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
        </Container>
    );
}