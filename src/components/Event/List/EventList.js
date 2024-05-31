import { Grid } from "@mui/material";
import EventItem from "./EventItem";

export default function EventList({ events, }) {
    return (
        <Grid container columnSpacing={6} rowSpacing={4}>
            {events.map((event, index) => (
                <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                    <EventItem
                        id={event._id}
                        name={event.name}
                        startDate={event.start_date}
                        endDate={event.end_date}
                        image={event.image}
                    />
                </Grid>
            ))}
        </Grid>
    );
}