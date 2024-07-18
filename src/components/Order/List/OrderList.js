import { Box, Link, List, ListItem, Typography } from "@mui/material";

import OrderTopBar from "./OrderTopBar";
import OrderItem from "./OrderItem";
import getOrderStatusInfo from "../../../utils/order/orderStatusInfo";


function SingleOrder({ order, openArchiveOrderDialog }) {
    const { statusText, statusDate } = getOrderStatusInfo({
        orderStatus: order.status,
        shippedAt: order.shipped_at,
        cancelledAt: order.cancelled_at,
        deliveredAt: order.delivered_at,
        returnedAt: order.returned_at,
    });

    return (
        <Box>
            <Box
                sx={{
                    border: "solid 0.25px",
                    borderRadius: "12px 12px 0 0",
                    backgroundColor: "#EEF0F0",
                }}
            >
                <OrderTopBar
                    orderId={order.order_uuid}
                    createdAt={order.created_at}
                    totalAmount={order.total_amount}
                    addressOnelineRepr={order.address.oneline_repr}
                    addressId={order.address.id}
                />
            </Box>
            <Box
                sx={{
                    paddingX: 1,
                    paddingY: 2,
                    borderLeft: "solid 0.25px",
                    borderRight: "solid 0.25px",
                    borderRadius: "0px",
                }}
            >
                {!["pending", "processed"].includes(order.status) && (
                    <Box sx={{ mb: 1, ml: 1 }}>
                        <Typography variant="body1">
                            <b>{statusText} {statusDate.format("LL")}</b>
                        </Typography>
                    </Box>
                )}
                <Box>
                    <List disablePadding>
                        {order.order_items.map((orderItem, index) => (
                            <ListItem disableGutters key={index}>
                                <OrderItem orderItem={orderItem} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            <Box 
                sx={{
                    padding: 1,
                    border: "solid 0.25px",
                    borderRadius: "0px 0px 12px 12px",
                }}
            >
                <Link component='button' underline="hover" onClick={() => openArchiveOrderDialog(order)}>
                    <Typography variant="body1">
                        {order.archived ? 'Unarchive' : 'Archive'} order
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}


export default function OrderList({ orders, openArchiveOrderDialog }) {
    return (
        <Box>
            {orders.map((order, index) => (
                <Box key={index} mb={2}>
                    <SingleOrder 
                        order={order} 
                        openArchiveOrderDialog={openArchiveOrderDialog} 
                    />
                </Box>
            ))}
        </Box>
    );
}