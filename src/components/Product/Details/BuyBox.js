import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function BuyBox(props) {
    const {
        allowedToAddToCart,
        buttonSize = 'small',
        addProductToCart,
    } = props;

    const [addToCartLoading, setAddToCartLoading] = useState(false);


    return (
        <Box className="BuyBox" sx={{
            display: 'flex', // Use flex container
            flexWrap: "wrap",
            justifyContent: 'space-between', // Space between the children
            width: '100%', // Occupy full width
            gap: "20px"
        }}>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                <LoadingButton
                    loading={addToCartLoading}
                    onClick={() => {
                        setAddToCartLoading(true);
                        addProductToCart();
                        setAddToCartLoading(false);
                    }}
                    fullWidth
                    variant="contained"
                    size={buttonSize}
                    sx={{
                        borderRadius: "15px",
                        backgroundColor: '#ebeb05',
                        ":hover": { backgroundColor: "#dbdb04" },
                        color: '#000000',
                    }}
                    disabled={!allowedToAddToCart}
                >
                    Add To Cart
                </LoadingButton>
            </Box>
            <Box
                sx={{
                    flexGrow: 1, // Grow to fill the space
                }}
            >
                <LoadingButton
                    variant="contained"
                    size={buttonSize}
                    fullWidth
                    sx={{
                        borderRadius: "15px",
                    }}
                    disabled={!allowedToAddToCart}
                >
                    Buy It Now
                </LoadingButton>
            </Box>
        </Box>
    )

}