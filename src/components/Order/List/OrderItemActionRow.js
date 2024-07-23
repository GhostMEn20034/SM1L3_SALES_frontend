import { useState } from 'react';

import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export default function OrderItemActionRow({ itemId, stock, forSale, buyNow}) {
    const [buyNowLoading, setBuyNowLoading] = useState(false);

    let canBeBought = stock > 0 && forSale; // Can the product be bought

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            sx={{ gap: 1.5 }} // gap between buttons
        >
            <LoadingButton
                loading={buyNowLoading}
                onClick={() => {
                    setBuyNowLoading(true);
                    buyNow();
                    setBuyNowLoading(false);   
                }}
                disabled={!canBeBought}
                variant="contained"
                size="small"
                sx={{
                    backgroundColor: '#ebeb05',
                    ":hover": { backgroundColor: "#dbdb04" },
                    color: '#000000',
                    borderRadius: "15px",
                    minWidth: '100px', // ensure it wraps if space is small
                    maxWidth: '150px',
                    flexGrow: 1
                }}
            >
                Buy it Again
            </LoadingButton>
            <Link component={RouterLink} underline='none' to={`/item/${itemId}`}>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        borderRadius: "15px",
                        minWidth: '100px', // ensure it wraps if space is small
                        maxWidth: '150px',
                        flexGrow: 1
                    }}
                >
                    View your item
                </Button>
            </Link>
        </Box>
    );
}
