import { Box, Typography, Grid } from "@mui/material";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from "dayjs";

import Countdown from "../../CommonComponents/Countdown";
import { memo } from "react";


const MemoizedCountdown = memo(({ timeToEventEnd }) => {
    return <Countdown
        days={timeToEventEnd?.days}
        hours={timeToEventEnd?.hours}
        minutes={timeToEventEnd?.minutes}
        seconds={timeToEventEnd?.seconds}
    />
});

export default function EventItemData({ name, description, startDate, endDate, status, timeToEventEnd }) {

    let timeLeftMessage = {
        created: "Event is not started yet",
        ended: "Event is already ended",
    };

    return (
        <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
                <Box>
                    <Typography variant="h5">
                        <b>{name}</b>
                    </Typography>
                </Box>
                {["created", "ended"].includes(status) && (
                    <Box sx={{ my: 3 }}>
                        <Typography variant="h6">
                            {timeLeftMessage[status]}
                        </Typography>
                    </Box>
                )}
                {status === "started" && (
                    <Box display="flex" alignItems="center" sx={{ my: 3 }}>
                        <Box sx={{ mr: 2 }}>
                            <Typography variant="h6">
                                Time left until the end of the event:
                            </Typography>
                        </Box>
                        <Box>
                            <MemoizedCountdown timeToEventEnd={timeToEventEnd} />
                        </Box>
                    </Box>
                )}
                <Box display="flex" alignItems="center">
                    <Box sx={{ mr: 0.5 }}>
                        <CalendarMonthOutlinedIcon />
                    </Box>
                    <Typography variant="h6">
                        The period of the event: {dayjs(startDate).format("LL")} - {dayjs(endDate).format("LL")}
                    </Typography>
                </Box>
            </Grid>
            {description && (
                <Grid item sm={6} xs={12}>
                    <Box>
                        <Typography variant="h6">
                            {description}
                        </Typography>
                    </Box>
                </Grid>
            )}
        </Grid>
    )
}