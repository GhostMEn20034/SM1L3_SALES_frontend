import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import OrderItemActionRow from "./OrderItemActionRow";


export default function OrderItem({ orderItem, showActionRow = true }) {
    return (
        <Box display="flex">
            <Box>
                <Link component={RouterLink} to={`/item/${orderItem.product?.object_id}`} underline="none" color="inherit">
                    <img
                        alt="No Product Img"
                        src={orderItem.product?.image}
                        height={120}
                        width={130}
                        style={{ objectFit: 'scale-down' }}
                    />
                </Link>
            </Box>
            <Box display="flex" flexDirection="column" sx={{ ml: 3, mt: 0.3 }}>
                <Box>
                    <Link component={RouterLink} to={`/item/${orderItem.product?.object_id}`} underline="none" color="inherit" sx={{
                        '&:hover': {
                            color: '#0073C4' // color on hover
                        }
                    }}>
                        <Typography variant="body1" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}>
                            {orderItem.product?.name}
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{ mt: showActionRow ? "auto" : 0.5 }}>
                    <Typography variant="body1">
                        Qty: {orderItem.quantity}
                    </Typography>
                </Box>
                {showActionRow && (
                    <Box sx={{ mt: "auto" }}>
                        <OrderItemActionRow itemId={orderItem.product.object_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}