import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { currencySymbol } from '../../../utils/consts';

export default function OrderQuickSummary({ orderId, orderTotal, addressId, addressOnelineRepr }) {
    return (
        <Box>
            <Box>
                <Typography variant="body1">
                    <b>Smile Sales order number:</b> {orderId}
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1">
                    <b>Order Total:</b> {currencySymbol}{orderTotal}
                </Typography>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography variant="body1">
                    <b>Delivery address: </b>
                    <Link
                        component={RouterLink}
                        underline="hover"
                        to={`/your-account/addresses/edit?addressID=${addressId}`}
                    >
                        {addressOnelineRepr}
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}