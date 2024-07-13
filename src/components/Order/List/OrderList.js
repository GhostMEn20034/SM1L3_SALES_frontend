import { Box, List, ListItem } from "@mui/material";

import OrderTopBar from "./OrderTopBar";
import OrderItem from "./OrderItem";
import OrderStatusInfo from "./OrderStatusInfo";


function SingleOrder({ order }) {
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
                    borderBottom: "solid 0.25px",
                    borderRadius: "0 0 12px 12px",
                }}
            >
                {!["pending", "processed"].includes(order.status) && (
                    <Box sx={{ mb: 1, ml: 1 }}>
                        <OrderStatusInfo
                            orderStatus={order.status}
                            shippedAt={order.shipped_at}
                            cancelledAt={order.cancelled_at}
                            delivered_at={order.delivered_at}
                        />
                    </Box>
                )}
                <List disablePadding>
                    {order.order_items.map((orderItem, index) => (
                        <ListItem disableGutters key={index}>
                            <OrderItem orderItem={orderItem} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}


export default function OrderList({ orders }) {
    return (
        <Box>
            {orders.map((order, index) => (
                <Box key={index} mb={2}>
                    <SingleOrder order={order} />
                </Box>
            ))}
        </Box>
    );
}