import { Button } from "@mui/material";
import PaymentMethodToIconMapping from "./PaymentMethodToIconMapping";

export default function PaymentMethodToButtonMapping(props) {
    const { paymentMethod, onClick } = props;

    let mapping = {
        paypal: (
            <Button
                onClick={onClick}
                variant="contained"
                sx={{
                    backgroundColor: '#FFC539', ":hover": { backgroundColor: "#F2BA36" }
                }}
            >
                <PaymentMethodToIconMapping paymentMethod='paypal' iconProps={{ width: '85%' }} />
            </Button>
        )
    };

    return mapping[paymentMethod];
}