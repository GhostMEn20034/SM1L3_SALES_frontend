import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { formatTimeMessage, getDateUnitsFromDateDifference } from "../../../utils/events/countdown";

dayjs.extend(utc);
dayjs.extend(timezone);


export default function EventItem({ id, name, startDate, endDate, image }) {
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

    
    const dateUnits = getDateUnitsFromDateDifference(dayjs(endDate).tz("UTC", true), dayjs());

    const timeLeftMessage = formatTimeMessage(dateUnits.days, dateUnits.hours, dateUnits.minutes);

    return (
        <Box sx={backgroundImageStyle} display="flex" flexDirection="column" component={RouterLink} to={`/events/${id}`}>
            <Box>
                <Typography variant="h5">
                    {name}
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1">
                    {dayjs(startDate).format("MMMM D")} - {dayjs(endDate).format("MMMM D")}
                </Typography>
            </Box>
            <Box sx={{ marginTop: "auto" }}>
                <Typography variant="body1">
                    {timeLeftMessage ? timeLeftMessage : 0} left
                </Typography>
            </Box>
        </Box >
    );
}