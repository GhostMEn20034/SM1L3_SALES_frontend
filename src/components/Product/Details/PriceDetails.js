import { useState, Fragment } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import { currencySymbol } from '../../../utils/consts';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': { // This targets the Paper component inside the Dialog
        borderRadius: '15px',
    },
}));

export default function PriceDetails({ originalPrice, discountedPrice, discountedPercentage }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let discountAmount = (originalPrice - discountedPrice).toFixed(2);

    return (
        <Fragment>
            <Link component="button" onClick={handleClickOpen}>
                <Typography variant="subtitle1">
                    Price Details
                </Typography>
            </Link>
            <BootstrapDialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <b>Price Details</b>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Box display="flex">
                        <Box>
                            <Typography variant='body1'>
                                Was
                            </Typography>
                        </Box>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant='body1' sx={{ textAlign: "right" }}>
                                <s style={{ color: "#707070" }}>{currencySymbol}{originalPrice}</s>
                            </Typography>
                            <Typography variant='body1'>
                                ({discountedPercentage}% off) -{currencySymbol}{discountAmount}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex">
                        <Box>
                            <Typography variant='body1'>
                                Item Price
                            </Typography>
                        </Box>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant='body1'>
                                {currencySymbol}{discountedPrice}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex">
                        <Box>
                            <Typography variant='body1'>
                                <b>Estimated Price</b>
                            </Typography>
                        </Box>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Typography variant='body1' textAlign="right">
                                <b>{currencySymbol}{discountedPrice}</b>
                            </Typography>
                            <Typography variant='body1' sx={{ color: "green" }}>
                                You Save: {currencySymbol}{discountAmount}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </Fragment>
    );
}