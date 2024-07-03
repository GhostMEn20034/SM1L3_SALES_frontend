import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import OverviewItem from "./OverviewItem";


export default function ProductsOverview(props) {
    const { cartItems, creationEssentialsLoading, cartItemLength } = props;

    if (creationEssentialsLoading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {cartItemLength ? (
                <Box>
                    <Box sx={{mb: 4}}>
                        <Typography>
                            To expedite your order processing, kindly ensure a thorough review of your order summary above. 
                            Please verify the selection of all desired items.
                            Once your review is complete, kindly proceed by scrolling down to the bottom of this page
                            and clicking the "Next" button to go to the next checkout step.
                        </Typography>
                    </Box>
                    {cartItems.map((cartItem, index) => (
                        <Box key={index}>
                            <OverviewItem product={cartItem?.product} quantity={cartItem?.quantity} />
                            <Divider sx={{ my: 1 }} />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">
                        You didn't select cart items or the server still not add cart items to your cart.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}