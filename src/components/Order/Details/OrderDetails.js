import { Box, Typography, Grid, List, ListItem, Link } from "@mui/material";
import dayjs from "dayjs";
import { Link as RouterLink } from "react-router-dom";

import getOrderStatusInfo from "../../../utils/order/orderStatusInfo";
import { currencySymbol } from "../../../utils/consts";
import { roundToTwo } from "../../../utils/dataTypeUtils/numberUtils";
import OrderTotal from "./OrderTotal";


function OrderItem({ productId, productName, quantity, pricePerUnit, taxPerUnit }) {
    return (
        <Grid container>
            <Grid item md={9}>
                <Typography variant="body1">
                    <Link component={RouterLink} underline="hover" to={`/item/${productId}`}>
                        <b>{productName}</b>
                    </Link>
                </Typography>
                <Typography variant="body1">
                    <b>Qty:</b> {quantity}
                </Typography>
            </Grid>
            <Grid item md={3}>
                <Box display="flex" justifyContent="flex-end">
                    <Typography variant="body1">
                        {currencySymbol}{pricePerUnit}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}


function OrderItems({ orderItems }) {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="body1">
                        <b>Items Ordered</b>
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        <b>Price Per Unit Without Taxes</b>
                    </Typography>
                </Box>
            </Box>
            <Box>
                <List>
                    {orderItems.map((orderItem, index) => (
                        <ListItem disableGutters key={index}>
                            <OrderItem
                                productId={orderItem.product.object_id}
                                productName={orderItem.product.name}
                                quantity={orderItem.quantity}
                                pricePerUnit={orderItem.price_per_unit}
                                taxPerUnit={orderItem.tax_per_unit}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}


export default function OrderDetails({ order }) {
    const { statusText, statusDate } = getOrderStatusInfo({
        orderStatus: order.status,
        shippedAt: order.shipped_at,
        cancelledAt: order.cancelled_at,
        deliveredAt: order.delivered_at,
        returnedAt: order.returned_at,
    });


    return (
        <Box
            sx={{
                border: "2.5px solid",
                borderColor: "#D8D7C5",
                borderRadius: "12px 12px 0px 0px"
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#D8D7C5",
                    padding: 1,
                    borderRadius: "7px 7px 0px 0px"
                }}
            >
                <Typography variant="body1">
                    <b>Order: {dayjs(order.created_at).format("LL")}</b>
                </Typography>
            </Box>
            <Box>
                <Grid container>
                    <Grid item md={4} sm={12} xs={12} padding={1}
                        sx={{
                            borderRight: { md: "2.5px solid #D8D7C5", sm: "none", xs: "none" },
                            borderBottom: { md: "none", sm: "2.5px solid #D8D7C5", xs: "2.5px solid #D8D7C5" },
                        }}
                    >
                        <Box>
                            <Typography variant="body1">
                                <b>Recipent:</b><br />
                                {order.address.first_name + " " + order.address.last_name}
                            </Typography>
                        </Box>
                        {!["pending", "processed"].includes(order.status) && (
                            <Box mt={1}>
                                <Typography variant="body1">
                                    <b>{statusText}:</b><br />
                                    {statusDate.format("LL")}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                    <Grid item md={8} sm={12} xs={12}>
                        <Box padding={1}>
                            <OrderItems orderItems={order.order_items} />
                        </Box>
                        <Box
                            sx={{
                                border: "1.5px solid", borderColor: "#D8D7C5", mb: 1
                            }} />
                        <Box display="flex" justifyContent="flex-end" padding={1}>
                            <OrderTotal
                                totalAmount={order.total_amount}
                                totalAmountBeforeTax={order.total_amount_before_tax}
                                totalTax={order.total_tax}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}