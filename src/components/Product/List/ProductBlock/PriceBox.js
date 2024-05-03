import { currencySymbol } from "../../../../utils/consts";
import { Box, Typography } from "@mui/material";

export default function PriceBox(props) {
    return (
        <Box display={"inline-block"}>
            <Typography variant="h6" fontWeight={"lighter"}>
                {currencySymbol}{props.discounted_price.toFixed(2)}
            </Typography>
            {props.discount_percentage && (
                <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{mr: 0.5}}>
                        {`Original Price: `}
                    </Typography>
                    <Typography variant="body2" sx={{mr: 1}}>
                        <s>{currencySymbol}{props.original_price}</s>
                    </Typography>
                    <Typography variant="subtitle2">
                        <b>{props.discount_percentage}% off</b>
                    </Typography>
                </Box>
            )}
        </Box>
    )
}