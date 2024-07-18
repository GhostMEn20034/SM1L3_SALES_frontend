import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Divider, Typography, List, ListItem, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import OrderItem from '../List/OrderItem';

export default function UnarchiveOrderDialog({ 
        order, open, handleClose, onSubmit, 
        failedOrderUnarchivalMsg, setFailedOrderUnarchivalMsg,
        orderUnarchivingLoading,
}) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#EFEFEF" }}>
                    <DialogTitle >Unarchive This Order</DialogTitle>
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
                        <Box sx={{ mt: 1 }}>
                            <Typography variant='h6'>
                                All items in this order will be unarchived:
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <List disablePadding>
                                {order.order_items.map((orderItem, index) => (
                                    <ListItem disableGutters key={index}>
                                        <OrderItem orderItem={orderItem} showActionRow={false} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant='body2'>
                                If you'll unarchive the order, you will able to see it in&nbsp;
                                <Link component={RouterLink} to='/your-account/order-history/'>
                                    Your Orders
                                </Link>
                                &nbsp;from Your Account.
                            </Typography>
                        </Box>
                    </Box>
                    {failedOrderUnarchivalMsg && (
                        <Alert severity='error' onClose={() => setFailedOrderUnarchivalMsg(null)}>
                            {failedOrderUnarchivalMsg}
                        </Alert>
                    )}
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
                            loading={orderUnarchivingLoading}
                            variant="contained"
                            sx={{ ml: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}
                            onClick={() => onSubmit(order.order_uuid)}
                        >
                            Unarchive Order
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}


