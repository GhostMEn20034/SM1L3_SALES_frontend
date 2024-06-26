import { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FacetValues from "./FacetValues";
import ExpandMore from "../../../CommonComponents/ExpandMore";
import { getDisplayNameForRangeFacet, getDisplayNameFunction } from '../../../../utils/products/productFiltering/facetDisplayName';


export default function FacetItem(props) {
    const [expanded, setExpanded] = useState(props.facet.code in (props.chosenFacets ? props.chosenFacets : {}));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getDisplayNameFunc = () => {
        if (props.facet?.is_range) {
            return (code, value) => getDisplayNameForRangeFacet(code, value, props.facetMetadata)
        } else {
            return getDisplayNameFunction(props.facet?.type)
        }
    }

    return (
        <Box>
            <Box
                display={"flex"}
                alignItems={"center"}
                sx={{
                    ":hover": {
                        "color": "#0073c4",
                        "cursor": "pointer"
                    }
                }}
                onClick={handleExpandClick}
            >
                <Typography variant="body2">
                    <b>{props.facet.name}</b>
                </Typography>
                <Box marginLeft="auto" display="flex" alignItems="center">
                    {props?.chosenFacets && props.facet?.code in props?.chosenFacets && (
                        <Box marginRight={1.2}>
                            <Link
                                component="button"
                                underline={"hover"} sx={{ ml: 0.5 }}
                                onClick={() => props.deleteChosenFacetGroup(props.facet?.code)}
                            >
                                <Typography variant="subtitle2">
                                    Clear
                                </Typography>
                            </Link>
                        </Box>
                    )}
                    <ExpandMore
                        expand={expanded}
                        aria-expanded={expanded}
                        aria-label="show more"
                        size="small"
                    >
                        <ExpandMoreIcon fontSize="small" />
                    </ExpandMore>
                </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box>
                    <FacetValues
                        values={props.facet?.values}
                        code={props.facet?.code}
                        is_range={props.facet?.is_range}
                        chosenFacets={props.chosenFacets}
                        insertFacetObjectToChosenFacets={props.insertFacetObjectToChosenFacets}
                        displayNameFunction={getDisplayNameFunc()}
                    />
                </Box>
            </Collapse >
            <Box sx={{ mt: 1 }}>
                <Divider />
            </Box>
        </Box >
    );
}