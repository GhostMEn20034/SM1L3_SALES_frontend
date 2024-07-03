import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";


export default function CancelledPaymentPage () {
    const [searchParams] = useSearchParams();

    return (
        <Box>
            {searchParams.getAll().map((searchParam) => (
                <Typography>
                    {searchParam}
                </Typography>
            ))}
        </Box>
    );
}