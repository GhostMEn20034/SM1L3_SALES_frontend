import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function OrderStatusInfo ({ orderStatus, shippedAt, cancelledAt, deliveredAt }) {

    const getText = () => {
        switch (orderStatus) {
            case "shipped":
                return "Shipped at";
            case "delivered":
                return "Delivered at";
            case "cancelled":
                return "Cancelled at";
            default:
                return null;
        }
    };

    const getDate = () => {
        switch (orderStatus) {
            case "shipped":
                return dayjs(shippedAt);
            case "delivered":
                return dayjs(deliveredAt);
            case "cancelled":
                return dayjs(cancelledAt);
            default:
                return dayjs();
        }
    };

    return (
        <Box>
            <Typography variant="body1">
                <b>{getText()} {getDate().format("LL")}</b>
            </Typography>
        </Box>
    );
}