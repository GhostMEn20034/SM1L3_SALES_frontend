import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { Box, Button, Typography, Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SmallTextField from "../../../CommonComponents/Inputs/SmallTextField";
import ExpandMore from "../../../CommonComponents/ExpandMore";

export default function PriceRangeFacet(props) {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography variant="body2">
                        <b>Price Range</b>
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
                        <ExpandMoreIcon fontSize="small" />
                    </ExpandMore>
                </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                    <Box>
                        {/* Min Price Input */}
                        <NumericFormat
                            decimalScale={2}
                            decimalSeparator="."
                            // customInput props
                            customInput={SmallTextField}
                            value={props.minPrice}
                            onChange={(e) => props.setMinPrice(Number(e.target.value))}
                            size="small"
                            label="Min"
                            sx={{ maxWidth: 90 }}
                        />
                    </Box>
                    <Box>
                        {/* Max Price Input */}
                        <NumericFormat
                            decimalScale={2}
                            decimalSeparator="."
                            // customInput props
                            customInput={SmallTextField}
                            value={props.maxPrice}
                            onChange={(e) => props.setMaxPrice(Number(e.target.value))}
                            size="small"
                            label="Max"
                            sx={{
                                maxWidth: 90,
                                ml: 0.25,
                            }}
                        />
                    </Box>
                    <Button
                        sx={{
                            backgroundColor: '#ebeb05',
                            ":hover": { backgroundColor: "#dbdb04" },
                            color: '#000000',
                            borderRadius: "7.5",
                            ml: 1,
                            minWidth: 40,
                        }}
                        size="small"
                        disabled={(!props.minPrice || !props.maxPrice) || props.minPrice > props.maxPrice}
                        onClick={props.onSubmit}
                    >
                        OK
                    </Button>
                </Box>
            </Collapse>

        </Box>
    )
}