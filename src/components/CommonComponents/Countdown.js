import { Box, Paper, Typography } from "@mui/material";

export default function Countdown({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {

    return (
        <Box display="flex">
            <Box sx={{ mr: 2 }}>
                <Paper sx={{backgroundColor: "black", color: "#D5D507"}}>
                    <Typography variant="h6" textAlign="center">
                        {days}
                    </Typography>
                </Paper>
                <Box>
                    <Typography variant="body2">
                        Days
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mr: 2 }}>
                <Paper sx={{backgroundColor: "black", color: "#D5D507"}}>
                    <Typography variant="h6" textAlign="center">
                        {hours}
                    </Typography>
                </Paper>
                <Box>
                    <Typography variant="body2">
                        Hours
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mr: 2 }}>
                <Paper sx={{backgroundColor: "black", color: "#D5D507"}}>
                    <Typography variant="h6" textAlign="center">
                        {minutes}
                    </Typography>
                </Paper>
                <Box>
                    <Typography variant="body2">
                        Minutes
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Paper sx={{backgroundColor: "black", color: "#D5D507"}}>
                    <Typography variant="h6" textAlign="center">
                        {seconds}
                    </Typography>
                </Paper>
                <Box>
                    <Typography variant="body2">
                        Seconds
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
}