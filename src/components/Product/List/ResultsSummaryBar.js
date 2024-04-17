import { Box, Typography, Paper } from "@mui/material";
import SelectValue from "../../CommonComponents/Selectors/SelectValue";
import { sortOptionMappings } from "../../../utils/consts";
import ChosenFacetsList from "./ChosenFacetsList";

import { isEmpty } from "../../../utils/dataTypeUtils/objectUtils";

export default function ResultsSummaryBar(props) {
    const getCurrentOffset = () => {
        let lastItemNumber = props.pageNumber * props.pageSize;
        let start = props.pageNumber > 1 ? (props.pageNumber - 1) * props.pageSize + 1 : 1;
        let end = lastItemNumber < props.itemsCount ? lastItemNumber : props.itemsCount;
        return { start: start, end: end }
    };

    let currentOffset = getCurrentOffset();
    let resultsSummaryText = `${currentOffset.start}-${currentOffset.end} of ${props.itemsCount} results`;

    return (
        <Paper sx={{ display: "flex", alignItems: "center", flexDirection: 'row', px: 2, py: 1 }}>
            <Box display="flex">
                <Typography variant="body1">
                    {resultsSummaryText}
                </Typography>
                {props.querySearch && (
                    <Box display="flex">
                        <Typography variant="body1" sx={{ mx: 0.5 }}>
                            for
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#0073c4" }}>
                            <b>"{props.querySearch}"</b>
                        </Typography>
                    </Box>
                )}
            </Box>
            {!isEmpty(props.chosenFacets) && (
                <Box marginLeft="auto">
                    <ChosenFacetsList 
                        chosenFacets={props.chosenFacets}
                        facetMetadata={props.facetMetadata}
                        insertFacetObjectToChosenFacets={props.insertFacetObjectToChosenFacets}
                    />
                </Box>
            )}
            <Box display="flex" marginLeft="auto" alignItems="center">
                <Typography variant="body1" sx={{ mr: 1 }}>
                    Sort By:
                </Typography>
                <SelectValue
                    menuItems={sortOptionMappings}
                    size='small'
                    value={props.sortOption}
                    setValue={props.setSortOption}
                />
            </Box>
        </Paper>
    );
}