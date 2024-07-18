import { Box } from "@mui/material";
import PaymentItem from "./PaymentItem";

export default function PaymentList({ payments }) {
    return (
        <Box>
            {payments.map((payment, index) => (
                <Box key={index}>
                    <PaymentItem payment={payment} />
                </Box>
            ))}
        </Box>
    )
}