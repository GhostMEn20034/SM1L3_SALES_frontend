import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';


export default function CancelOrderDialog({ open, handleClose, onSubmit, cancelOrderErrorMessage, setCancelOrderErrorMessage }) {
    const [orderCancellingLoading, setOrderCancellingLoading] = React.useState(false);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#EFEFEF" }}>
                    <DialogTitle >Cancel this Order</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            height: "35px",
                            color: (theme) => theme.palette.grey[700],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <DialogContent>
                    <Box>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='body1'>
                                This action cannot be undone. Your order will not be processed or fulfilled.<br />

                                All funds paid for this order <b>will be refunded to the original payment method</b>.<br />

                                Are you sure you want to cancel your order?
                            </Typography>
                        </Box>
                        <Box>
                            <Alert severity='info'>
                                Note: you can cancel the order only if the order is not shipped or delivered.
                                If your order is shipped, you need to wait until your order will be delivered
                                and if something wrong with the order's items, you can request the refund.
                            </Alert>
                        </Box>
                        {cancelOrderErrorMessage && (
                            <Box sx={{ mt: 3 }}>
                                <Alert severity='error' onClose={() => setCancelOrderErrorMessage(null)} sx={{ alignItems: "center" }}>
                                    {cancelOrderErrorMessage}
                                </Alert>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <Divider />
                <Box sx={{ backgroundColor: "#EFEFEF" }}>
                    <DialogActions disableSpacing>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "10px", backgroundColor: "white", color: "black", ":hover": { "backgroundColor": "#e8e8e8" } }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <LoadingButton
                            loading={orderCancellingLoading}
                            variant="contained"
                            sx={{ ml: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}
                            onClick={async () => {
                                setOrderCancellingLoading(true);
                                await onSubmit(handleClose);
                                setOrderCancellingLoading(false);
                            }}
                        >
                            Cancel the order
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}