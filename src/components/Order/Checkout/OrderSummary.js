import { Box, Divider, Paper, Typography } from "@mui/material";
import { currencySymbol } from "../../../utils/consts";

export default function OrderSummary(props) {
    const { totalItemsPrice, totalTax, priceAndTaxSum } = props;

    return (
        <Paper sx={{padding: 1}}>
            <Box mb={2}>
                <Typography variant="h6">
                    <b>Order Summary</b>
                </Typography>
            </Box>
            <Box className="Summary">
                <Box display="flex" mb={1} justifyContent="space-between">
                    <Typography variant="body2">
                        Items:
                    </Typography>
                    <Typography variant="body2">
                        <b>{currencySymbol}{totalItemsPrice.toFixed(2)}</b>
                    </Typography>
                </Box>
                <Box display="flex" mb={1} justifyContent="space-between">
                    <Typography variant="body2">
                        Taxes:
                    </Typography>
                    <Typography variant="body2">
                        <b>{currencySymbol}{totalTax.toFixed(2)}</b>
                    </Typography>
                </Box>
                <Box display="flex" mb={1} justifyContent="space-between">
                    <Typography variant="body2">
                        Shipping:
                    </Typography>
                    <Typography variant="body2">
                        <b>{currencySymbol}0.00</b>
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" py={1}>
                <Typography variant="h6" sx={{ color: "#B12704" }}>
                    <b>Order Total:</b>
                </Typography>
                <Typography variant="h6" sx={{ color: "#B12704" }}>
                    <b>{currencySymbol}{priceAndTaxSum.toFixed(2)}</b>
                </Typography>
            </Box>
        </Paper>
    );
}