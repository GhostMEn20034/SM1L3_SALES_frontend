import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

import AddAddress from '../../Address/AddAddress';

export default function AddNewShippingAddressDialog(props) {
    const { userInfo, errors, setErrors, createAddress } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                Add a new address
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add new address</DialogTitle>
                <DialogContent>
                    <AddAddress
                        userInfo={userInfo}
                        errors={errors}
                        setErrors={setErrors}
                        createAddress={(params) => createAddress(params, handleClose)}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}