import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";
import CancelOrderDialog from "../Dialogs/CancelOrderDialog";
import RequestRefundDialog from "../Dialogs/RequestRefundDialog";


export default function OrderDetailsActionRaw(props) {
    const {
        cancelOrder,
        cancelOrderErrorMessage, 
        setCancelOrderErrorMessage,
    } = props;

    const [openedDialog, setOpenedDialog] = useState(null);


    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Box>
                        <Link
                            component="button"
                            underline="hover"
                            onClick={() => setOpenedDialog('cancelOrder')}

                        >
                            <Typography variant="body1">
                                Cancel the order
                            </Typography>
                        </Link>
                    </Box>
                    <Box>
                        <CancelOrderDialog
                            open={openedDialog === 'cancelOrder'}
                            handleClose={() => setOpenedDialog(null)}
                            onSubmit={cancelOrder}
                            cancelOrderErrorMessage={cancelOrderErrorMessage}
                            setCancelOrderErrorMessage={setCancelOrderErrorMessage}
                        />
                    </Box>
                </Box >
                <Box sx={{ mx: 1 }} display="flex" alignItems="center">
                    <Typography variant="body1">
                        |
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Box>
                        <Link
                            component="button"
                            underline="hover"
                            onClick={() => setOpenedDialog('requestRefund')}
                        >
                            <Typography variant="body1">
                                Request the refund
                            </Typography>
                        </Link>
                    </Box>
                    <Box>
                        <RequestRefundDialog 
                            open={openedDialog === 'requestRefund'}
                            handleClose={() => setOpenedDialog(null)}        
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}