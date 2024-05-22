import { Grid, Paper } from "@mui/material";
import DealItem from "./DealItem";

export default function DealsOnIndexPage({deals}) {
    return (
        <Grid container spacing={4}>
            {deals.map((deal, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} sx={{ display: "flex" }} key={index}> 
                    <Paper sx={{
                        flexGrow: 1, display: 'flex',
                        paddingX: 1,
                        paddingY: 1.5,
                    }}>
                        <DealItem 
                            id={deal?._id}
                            name={deal?.name}
                            isParent={deal?.is_parent}
                            queryString={deal?.query_string}
                            buttonText={deal?.button_text}
                            image={deal?.image}
                        />
                    </Paper>
                </Grid>                    
            ))}
        </Grid>
    );
} 