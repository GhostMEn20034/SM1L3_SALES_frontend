import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useAxios from "../../utils/useAxios";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import OrderQuickSummary from "../../components/Order/Details/QuickSummary";
import { getOrderDetailsBreadCrumbData } from "../../utils/order/breadCrumbUtils";
import OrderDetails from "../../components/Order/Details/OrderDetails";
import OrderStatusStepper from "../../components/Order/Details/OrderStatusStepper";
import PaymentList from "../../components/Payments/PaymentList";

import '../../styles/orders/OrderDetails.css';
import OrderDetailsActionRaw from "../../components/Order/Details/ActionRaw";


export default function OrderDetailsPage() {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [cancelOrderErrorMessage, setCancelOrderErrorMessage] = useState(null);
    const [cancelOrderSuccessMessage, setCancelOrderSuccessMessage] = useState(null);


    const { id } = useParams();
    const ordersApi = useAxios('orders');

    const breadCrumbData = getOrderDetailsBreadCrumbData(id);

    const getOrderById = async () => {
        setLoading(true);

        try {
            let response = await ordersApi.get(`/api/v1/orders/${id}`);
            let data = await response.data;
            setOrder(data?.order);
        } catch (e) {
            console.log("Something went wrong");
        }

        setLoading(false);
    };

    const cancelOrder = async (onSuccessCallback) => {
        try {
            await ordersApi.post(`/api/v1/orders/${id}/cancel/`);
            await getOrderById();
            setCancelOrderSuccessMessage(
                "Order is canceled! All funds paid for this order are refunded to the original payment method"
            );
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        } catch (e) {
            if (e.response.status === 400) {
                setCancelOrderErrorMessage(e.response.data.detail);
            } else {
                setCancelOrderErrorMessage("Something went wrong");
            }
        }
    };

    useEffect(() => {
        getOrderById();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth={'xl'} sx={{ py: 2 }}>
            <Box sx={{ mb: 7 }}>
                <BreadCrumb breadCrumbData={breadCrumbData} />
            </Box>
            {order && (
                <Container maxWidth={'lg'}>
                    {cancelOrderSuccessMessage && (
                        <Box sx={{ mb: 3 }}>
                            <Alert severity="success" onClose={() => setCancelOrderSuccessMessage(null)} sx={{ alignItems: "center" }}>
                                {cancelOrderSuccessMessage}
                            </Alert>
                        </Box>
                    )}
                    <Box>
                        <OrderQuickSummary
                            orderId={id}
                            orderTotal={order.total_amount}
                            addressId={order.address.id}
                            addressOnelineRepr={order.address.oneline_repr}
                        />
                    </Box>
                    {!['cancelled', 'returned',].includes(order.status) && (
                        <Box sx={{ mt: 5 }}>
                            <OrderStatusStepper
                                status={order.status}
                                createdAt={order.created_at}
                                shippedAt={order.shipped_at}
                                deliveredAt={order.delivered_at}
                            />
                        </Box>
                    )}
                    <Box sx={{ mt: 5 }}>
                        <OrderDetails order={order} />
                    </Box>
                    {order.payments.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Box>
                                <Typography variant="h6">
                                    <b>Payment History for this Order</b>
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <PaymentList payments={order.payments} />
                            </Box>
                        </Box>
                    )}
                    {!['cancelled', 'returned',].includes(order.status) && (
                        <Box sx={{ mt: 5 }}>
                            <Box>
                                <Typography variant="body1">
                                    <b>Order Actions</b>
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <OrderDetailsActionRaw
                                    cancelOrder={cancelOrder}
                                    cancelOrderErrorMessage={cancelOrderErrorMessage}
                                    setCancelOrderErrorMessage={setCancelOrderErrorMessage}
                                />
                            </Box>
                        </Box>
                    )}
                </Container>
            )}
        </Container >
    );
}