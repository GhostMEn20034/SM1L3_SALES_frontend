import { currencySymbol } from "../../utils/consts";
import { Box, Typography } from "@mui/material";

export default function ProductPrice(props) {

    let price = props?.price !== undefined !== null ? parseFloat(props.price) : 0;
    let discountRate = !props?.discountRate ? 0 : parseFloat(props.discountRate).toFixed(2);
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