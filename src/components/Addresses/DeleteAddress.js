import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Typography, Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteAddress({ open, setOpen, onSubmit, address }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ padding: 0 }}
            >
                <Box sx={{paddingBottom: 1}}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <DialogTitle sx={{ paddingBottom: 2 }}>{"Confirm removal"}</DialogTitle>
                    </Box>
                    <Divider />
                    <DialogContent sx={{ padding: 0 }}>
                        <Box sx={{px: 4, py: 2}}>
                            <Box>
                                <Typography variant="subtitle1"><b>{address.first_name} {address.last_name}</b></Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">{address.house_number} {address.street}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">{address.city}, {address.region} {address.postal_code}</Typography>
                            </Box>
                            {address.apartment_number && (
                                <Box>
                                    <Typography variant="subtitle1">Apartment number: {address.apartment_number}</Typography>
                                </Box>
                            )}
                            <Box>
                                <Typography variant="subtitle1">{address.country.name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Phone number: {address.phone_number}</Typography>
                            </Box>
                            <Box sx={{mt: 1}}>
                                <Typography variant='body1' sx={{color: '#565959'}}>
                                <b>Please note:</b> Removing this address will not affect any pending orders being shipped to this address.
                                </Typography>
                            </Box>
                        </Box>
                    </DialogContent>
                    <Divider />
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <DialogActions disableSpacing>
                            <Button variant="contained"
                                sx={{borderRadius: "10px" ,backgroundColor: "white", color: "black", ":hover": { "backgroundColor": "#e8e8e8" } }}
                                onClick={handleClose}>No</Button>
                            <Button variant="contained"
                                sx={{ml: 4, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}
                                onClick={()=> onSubmit(address.id)}>Yes</Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Dialog>
        </div>
    );
}