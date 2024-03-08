import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { Box, Typography } from "@mui/material";

export default function CartEmpty() {
    return (
        <Box>
            <Box textAlign="center">
                <SentimentDissatisfiedOutlinedIcon sx={{ color: "#D5D507", border: "black", fontSize: 150 }} fontSize='large'/>
                    <Typography variant='h6' textAlign="center">
                        Your cart is empty
                    </Typography>
                    <Typography variant='h6'>
                        Make his face happy by purchasing something
                    </Typography>
            </Box>
        </Box>
    );
};