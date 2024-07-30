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


export default function RequestRefundDialog({open, handleClose}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#EFEFEF" }}>
                    <DialogTitle >Request the refund</DialogTitle>
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
                            // loading={orderArchivingLoading}
                            variant="contained"
                            sx={{ ml: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}
                            // onClick={() => onSubmit(order.order_uuid)}
                        >
                            Request the refund
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}