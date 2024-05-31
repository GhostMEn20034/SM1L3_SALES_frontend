import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function EventSliderItem({ id, name, image }) {
    const backgroundImageStyle = {
        width: '100%', // Ensure full-width coverage
        height: '150px', // Ensure full-height coverage
        padding: 1,
        borderRadius: "8px",

        background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${image})`,
        backgroundPosition: "center",
        // Maintain content readability by adjusting text color
        color: '#ebeb05', // White text for better contrast
        textDecoration: 'none',
    };

    return (
        <Box sx={backgroundImageStyle} display="flex" flexDirection="column" component={RouterLink} to={`/events/${id}`}>
            <Box>
                <Typography variant="h5">
                    {name}
                </Typography>
            </Box>
        </Box >
    );
}