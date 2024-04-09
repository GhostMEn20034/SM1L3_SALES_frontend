import { useState, Fragment } from 'react';
import parse from 'html-react-parser';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FacetValues from "./FacetValues";
import HtmlTooltip from '../../../CommonComponents/HtmlTooltip';
import ExpandMore from "../../../CommonComponents/ExpandMore";


export default function FacetItem(props) {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            <Box display={"flex"} alignItems={"center"}>
                <Typography variant="body2">
                    <b>{props.facet.name}</b>
                </Typography>
                {props.facet.explanation && (
                    <Box ml={0.5} mt={0.4}>
                        <HtmlTooltip placement="left" title={
                            <Fragment>
                                <Typography color="inherit"><b>{props.facet.name}</b></Typography>
                                <Typography variant="body2">
                                    {parse(props.facet.explanation)}
                                </Typography>
                            </Fragment>
                        }>
                            <HelpOutlineIcon fontSize='small' />
                        </HtmlTooltip>
                    </Box>
                )}
                <Box marginLeft="auto">
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
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
                        chosenFacets={props.chosenFacets}
                        insertFacetObjectToChosenFacets={props.insertFacetObjectToChosenFacets}
                    />
                        
                </Box>
            </Collapse>
            <Box sx={{ mt: 1 }}>
                <Divider />
            </Box>
        </Box>
    );
}