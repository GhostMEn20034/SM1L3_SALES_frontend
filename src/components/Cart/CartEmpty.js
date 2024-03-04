import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { Box, Typography } from "@mui/material";

export default function CartEmpty() {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box>
                <SentimentDissatisfiedOutlinedIcon sx={{ color: "#D5D507", border: "black" ,fontSize: 150 }} fontSize='large' />
                <Typography variant='h6'>
                    Your cart is empty
                </Typography>
            </Box>
        </Box>
    );
};