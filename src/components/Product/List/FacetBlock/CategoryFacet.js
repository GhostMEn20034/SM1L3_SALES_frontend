import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ExpandMore from "../../../CommonComponents/ExpandMore";


export default function CategoryFacet(props) {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography variant="body2">
                        <b>Category</b>
                    </Typography>
                </Box>
                <Box marginLeft="auto">
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        size="small"
                    >
                        <ExpandMoreIcon fontSize="small"/>
                    </ExpandMore>
                </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box>
                    {props.categories?.ancestors && (
                        <Box>
                            {props.categories.ancestors.map((ancestor, i) => (
                                <Box display="flex" key={i} onClick={() => props.handleChange(ancestor._id)}>
                                    <Typography variant="body2">
                                        &#8249;&nbsp;
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        "mr": 0.5,
                                        ":hover": {
                                            "color": "#0073c4",
                                            "cursor": "pointer"
                                        }
                                    }}>
                                        {ancestor.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                    {props.categories?.current && (
                        props.categories.current.auto_defined ? (
                            <Box display="inline-block"
                                onClick={() => props.handleChange(props.categories.current._id)}
                                sx={{
                                    ml: props.categories?.ancestors ? 3 : 0,
                                    ":hover": {
                                        "color": "#0073c4",
                                        "cursor": "pointer"
                                    }
                                }}
                            >
                                <Typography display="inline-block" variant="body2" fontWeight={500}>
                                    {props.categories.current.name}
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    ml: props.categories?.ancestors ? 3 : 0,
                                }}
                            >
                                <Typography variant="body2" fontWeight={700}>
                                    {props.categories.current.name}
                                </Typography>
                            </Box>
                        )

                    )}
                    {props.categories?.nearest_children && (
                        <Box sx={{ ml: props.categories?.ancestors ? 6 : 3 }}>
                            {props.categories.nearest_children.map((child, i) => (
                                <Box key={i} onClick={() => props.handleChange(child._id)}>
                                    <Typography variant="body2" sx={{
                                        ":hover": {
                                            "color": "#0073c4",
                                            "cursor": "pointer"
                                        }
                                    }}>
                                        {child.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
}