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
import Typography from '@mui/material/Typography';

import SelectValue from '../../CommonComponents/Selectors/SelectValue';
import { reasonsToReturnOrder } from '../../../utils/consts';


export default function RequestRefundDialog({ open, handleClose, onSubmit, refundErrorMessage, setRefundErrorMessage, reasonToReturn, setReasonToReturn}) {
    const [refundRequestLoading, setRefundRequestLoading] = React.useState(false);

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
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='body1'>
                                To initiate a refund request, your order must have been successfully delivered.
                                Once you've received your order, you may proceed with requesting a refund. <br />
                                Please select the reason for your refund from the options provided.
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <SelectValue
                                value={reasonToReturn}
                                setValue={setReasonToReturn}
                                menuItems={reasonsToReturnOrder}
                                label="Reason to return"
                                styles={{ minWidth: "250px" }}
                                error={{
                                    isError: reasonToReturn === null,
                                    helperText: "Please, choose some reason of refund request"
                                }}
                            />
                        </Box>
                        <Box>
                            <Alert severity='info'>
                                Note: Refund requests are subject to our return policy and may be <b>rejected </b>
                                if they <b>do not meet our criteria</b>. <br />
                                You will receive a <b>confirmation email</b> with further details upon submitting your request.
                            </Alert>
                        </Box>
                        {refundErrorMessage && (
                            <Box sx={{ mt: 3 }}>
                                <Alert severity='error' onClose={() => setRefundErrorMessage(null)} sx={{ alignItems: "center" }}>
                                    {refundErrorMessage}
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
                            loading={refundRequestLoading}
                            disabled={reasonToReturn === null}
                            variant="contained"
                            sx={{ ml: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}
                            onClick={async () => {
                                setRefundRequestLoading(true);
                                await onSubmit(handleClose);
                                setRefundRequestLoading(false);
                            }}
                        >
                            Request the refund
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}