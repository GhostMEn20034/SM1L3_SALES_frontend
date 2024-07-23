import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function FailedPurchasing(props) {
    const { open, setOpen } = props;

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failure of buying the product. Try later
                </Alert>
            </Snackbar>
        </div>
    );
}
