import { currencySymbol } from "../../../utils/consts";
import { Box, Typography } from "@mui/material";

export default function OverviewItemPrice(props) {
    let {price, discountRate} = props;

    price = price !== undefined !== null ? parseFloat(price) : 0;
    discountRate = !discountRate ? 0 : parseFloat(discountRate).toFixed(2);
    let finalPrice = price - (price * discountRate);


    return (
        <Box>
            <Box>
                <Typography variant="h6">
                    <b>{currencySymbol}{finalPrice.toFixed(2)}</b>
                </Typography>
            </Box>
            <Box>
                {discountRate > 0 && (
                    <>
                        <Typography variant="subtitle2">
                            Typical:
                        </Typography>
                        <Typography>
                            <strike>{currencySymbol}{price}</strike>
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    );
}