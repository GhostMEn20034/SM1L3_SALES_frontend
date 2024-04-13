import { useState } from "react";
import { Box, Checkbox, Typography, Link } from "@mui/material";

import { isFacetValueChecked } from "../../../../utils/productFiltering/chosenFacetsServices";


export default function FacetValues(props) {
    const [showAll, setShowAll] = useState(false);
    const slicedValues = props.values.slice(0, showAll ? props.values.length : 6);

    const handleClickSeeMore = () => {
        setShowAll(!showAll);
    };

    return (
        <Box>
            <Box>
                {slicedValues.map((facetValue, i) => (
                    <Box
                        display="flex"
                        key={i}
                        alignItems="center"
                        padding={0}
                        sx={{
                            width: 'fit-content',
                            maxWidth: "100%",
                            ":hover": {
                                "color": "#0073c4",
                                "cursor": "pointer"
                            }
                        }}
                        onClick={() => props.insertFacetObjectToChosenFacets(
                            { "code": props.code, value: facetValue.value, unit: facetValue.unit }
                        )}
                    >
                        <Checkbox
                            checked={isFacetValueChecked(
                                props.chosenFacets,
                                { "code": props.code, value: facetValue.value, unit: facetValue.unit }
                            )}
                            size="small" sx={{ padding: 0.2, margin: "0px" }}
                        />
                        <Typography variant="body2">
                            {facetValue.display_name}
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 0.5, color: "grey" }}>
                            ({facetValue.count})
                        </Typography>
                    </Box>
                ))}
            </Box>
            {props.values.length > 6 && (
                <Box px={0.5}>
                    <Link component="button" underline="hover" onClick={handleClickSeeMore}>
                        <Typography variant="body2">{showAll ? "See Less" : "See More"}</Typography>
                    </Link>
                </Box>
            )}
        </Box>
    );
}