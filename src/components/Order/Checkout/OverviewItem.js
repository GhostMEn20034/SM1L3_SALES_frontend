import { Typography, Box } from "@mui/material";

import OverviewItemPrice from "./OverviewItemPrice";
import { currencySymbol } from "../../../utils/consts";



export default function OverviewItem(props) {
    const { product, quantity } = props;

    return (
        <Box display={"flex"} width="100%">
            <Box>
                <img
                    alt="No Product Img"
                    src={product?.image}
                    height={150}
                    width={150}
                    style={{ objectFit: 'scale-down' }}
                />
            </Box>
            <Box sx={{ ml: 3, maxWidth: 450, mt: 0.3 }}>
                <Box>
                    <Typography variant="body1" sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }}>
                        {product?.name}
                    </Typography>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body1">
                        <b>Quantity:</b> {quantity}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ ml: "auto" }}>
                <Box display="flex" justifyContent="center">
                    <OverviewItemPrice price={product?.price} discountRate={product?.discount_rate} />
                </Box>
                {product?.tax_percentage && product?.tax_percentage > 0 &&(
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box>
                            <Typography variant="body1">
                                <b>+</b>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">
                                <b>{product?.tax_percentage}% &asymp; {currencySymbol}{product?.tax_amount}</b>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">
                                <b>per unit</b>
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>

        </Box >
    );
}