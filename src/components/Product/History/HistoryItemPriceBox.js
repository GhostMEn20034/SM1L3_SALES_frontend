import { currencySymbol } from "../../../utils/consts";
import { Box, Typography } from "@mui/material";

export default function HistoryItemPriceBox({
    discountedPrice, discountPercentage,
    originalPrice, showDiscountPercentage = false,
    priceInfoAlignment = "vertical",
}) {

    const alignmentToDisplayTypeMapping = {
        "vertical": "inline-block",
        "horizontal": "flex",
    };

    return (
        <Box display={alignmentToDisplayTypeMapping[priceInfoAlignment]}>
            <Typography variant="h6">
                <b>{currencySymbol}{discountedPrice.toFixed(2)}</b>
            </Typography>
            {discountPercentage && discountPercentage > 0 && (
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ ml: priceInfoAlignment === 'horizontal' ? 0.5 : 0}}
                >
                    <Typography variant="body2" sx={{ mr: 1 }}>
                        <s>{currencySymbol}{originalPrice}</s>
                    </Typography>
                    {showDiscountPercentage && (
                        <Typography variant="subtitle2" sx={{ color: "#E0103A" }}>
                            <b>{discountPercentage.toFixed(0)}% off</b>
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}