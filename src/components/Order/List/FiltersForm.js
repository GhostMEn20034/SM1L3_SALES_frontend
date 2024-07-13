import { Box, Typography } from "@mui/material";

import SelectValue from "../../CommonComponents/Selectors/SelectValue";

export default function FiltersForm({ timeFilter, setTimeFilter, timeFilters, orderCount }) {
    return (
        <Box display="flex" alignItems="center">
            <Box>
                <Typography variant="body1">
                    <b>{orderCount} orders</b> placed in
                </Typography>
            </Box>
            <Box sx={{ ml: 0.5 }}>
                <SelectValue value={timeFilter} setValue={setTimeFilter} menuItems={timeFilters} />
            </Box>
        </Box>
    );
}