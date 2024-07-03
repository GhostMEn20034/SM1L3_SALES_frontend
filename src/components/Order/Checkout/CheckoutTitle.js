import { ClickAwayListener, Typography, Link, Box, Button } from "@mui/material";
import { Fragment, useState } from "react";

import HtmlTooltip from "../../CommonComponents/HtmlTooltip";


function GoBackToCartDialog({ onSubmit, onClose }) {

    return (
        <Box padding={1}>
            <Typography variant="subtitle1">
                Are you sure you want to return to your Shopping Cart?
            </Typography>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                <Box>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{
                            color: '#000000',
                            borderRadius: "15px",
                            borderColor: "#000000",
                            ":hover": {
                                borderColor: "#000000",
                            }

                        }}>
                        Stay in checkout
                    </Button>
                </Box>
                <Box>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ebeb05',
                            ":hover": { backgroundColor: "#dbdb04" },
                            color: '#000000',
                            borderRadius: "15px",
                        }}
                    >
                        Return to Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}


export default function CheckoutTitle({ onSubmit, cartItemsLength }) {

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                    <HtmlTooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        arrow
                        title={
                            <Fragment>
                                <GoBackToCartDialog onSubmit={onSubmit} onClose={handleTooltipClose} />
                            </Fragment>
                        }
                        sx={{
                            backgroundColor: "white"
                        }}
                    >
                        <Typography variant="h4">
                            Checkout (
                            <Link
                                underline="none"
                                onClick={handleTooltipOpen}
                                sx={{
                                    ":hover": { "cursor": "pointer" },
                                }}
                            >
                                {cartItemsLength} items
                            </Link>
                            )
                        </Typography>
                    </HtmlTooltip>
                </div>
            </ClickAwayListener>
        </div>
    );
}