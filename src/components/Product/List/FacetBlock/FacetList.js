import { Box } from "@mui/material";
import FacetItem from "./FacetItem";


export default function FacetList(props) {
    return (
        props.facets.map((facet, i) => (
            <Box key={i} sx={{ mt: 1 }}>
                <FacetItem facet={facet}
                    chosenFacets={props.chosenFacets}
                    insertFacetObjectToChosenFacets={props.insertFacetObjectToChosenFacets}
                    deleteChosenFacetGroup={props.deleteChosenFacetGroup}
                />
            </Box>
        ))
    );
};