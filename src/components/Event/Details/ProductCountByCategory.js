import { Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink, createSearchParams } from "react-router-dom";

import { LightTooltip } from "../../CommonComponents/Tooltips";

export default function ProductCountByCategory({ items, eventId }) {
    const getQueryString = (categoryId) => {
        return createSearchParams({
            "category": categoryId,
            "eventId": eventId,
        }).toString();
    };

    return (
        <Grid container spacing={2}>
            {items.map(item => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={item?._id}>
                    <LightTooltip title={
                        <Typography variant="body2">
                            <b>{`${item?.count}`}</b> products found
                        </Typography>
                    }>
                        <RouterLink style={{ textDecoration: "none" }} to={`/s?${getQueryString(item?._id)}`}>
                            <Paper sx={{
                                borderRadius: "15px",
                                ":hover": {
                                    "cursor": "pointer",
                                    "backgroundColor": "#fafafa",
                                }
                            }}>
                                <Typography variant="h6" textAlign="center">
                                    {item?.name}
                                </Typography>
                            </Paper>
                        </RouterLink>
                    </LightTooltip>
                </Grid>
            ))}
        </Grid>
    );
}