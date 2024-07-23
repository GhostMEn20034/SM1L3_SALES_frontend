import { Box, IconButton, Link, Snackbar, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link as RouterLink } from "react-router-dom";

import { currencySymbol } from '../../../utils/consts';
import { useState } from "react";

export default function OrderQuickSummary({ orderId, orderTotal, addressId, addressOnelineRepr }) {
    const [orderNumberCopied, setOrderNumberCopied] = useState(false);

    const copyOrderNumber = () => {
        navigator.clipboard.writeText(orderId)
        .then(() => {
            setOrderNumberCopied(true);
        });
    };


    return (
        <Box>
            <Box>
                <Snackbar 
                    open={orderNumberCopied} 
                    onClose={() => setOrderNumberCopied(false)}
                    message="Order number copied successfully!"
                    autoHideDuration={4000}
                />
            </Box>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography variant="body1">
                        <b>Smile Sales order number:</b> {orderId}
                    </Typography>
                </Box>
                <Box sx={{ ml: 0.5 }}>
                    <IconButton size="small" onClick={copyOrderNumber}>
                        <ContentCopyIcon fontSize="small"/>
                    </IconButton>
                </Box>
            </Box>
            <Box>
                <Typography variant="body1">
                    <b>Order Total:</b> {currencySymbol}{orderTotal}
                </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
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