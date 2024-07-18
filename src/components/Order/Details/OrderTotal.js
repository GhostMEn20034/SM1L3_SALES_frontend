import { Box, Typography } from "@mui/material";
import { currencySymbol } from "../../../utils/consts";

export default function OrderTotal ({totalAmount, totalAmountBeforeTax, totalTax }) {
    return (
        <Box>
            <Box display="flex" justifyContent="end">
                <Typography variant="body1">
                    Item(s) Subtotal: {currencySymbol}{totalAmountBeforeTax}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="end">
                <Typography variant="body1">
                    ---
                </Typography>
            </Box>
            <Box display="flex" justifyContent="end">
                <Typography variant="body1">
                    Total Before Tax: {currencySymbol}{totalAmountBeforeTax}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="end">
                <Typography variant="body1">
                    Tax Collected: {currencySymbol}{totalTax}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="end">
                <Typography variant="body1">
                    ---
                </Typography>
            </Box>
            <Box display="flex" justifyContent="end">
                <Typography variant="body1">
                    <b>Total for this Order: {currencySymbol}{totalAmount}</b>
                </Typography>
            </Box>
        </Box>
    );
}