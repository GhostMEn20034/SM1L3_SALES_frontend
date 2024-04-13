import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { getDisplayValue } from '../../../utils/productFiltering/chosenFacetsServices';
import { Chip, Typography } from '@mui/material';

export default function ChosenFacetsList(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                size="small"

                sx={{
                    backgroundColor: '#ebeb05',
                    ":hover": { backgroundColor: "#dbdb04" },
                    color: '#000000',
                    borderRadius: "15px",
                    px: 1.3,
                }}
                onClick={handleClickOpen}
            >
                Show Chosen Filters
            </Button>
            <Dialog
                fullWidth
                maxWidth='md'
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Chosen Filters</DialogTitle>
                <DialogContent>
                    <Box>
                        {Object.keys(props.chosenFacets).map((chosenFacetGroup, i) => (
                            <Box key={i} sx={{ mt: i === 0 ? 0 : 2}}>
                                {props.facetCodeToNameMappings?.[chosenFacetGroup] && (
                                    <Box ml={1} mb={0.5}>
                                        <Typography variant='body2'>
                                            {props.facetCodeToNameMappings?.[chosenFacetGroup]}:
                                        </Typography>
                                    </Box>
                                )}
                                <Box display="inline-flex" flexWrap="wrap">
                                    {props.chosenFacets[chosenFacetGroup].map((chosenFacet, i) => (
                                        <Box key={i + "facetValue"} sx={{ ml: 1, mb: 1 }}>
                                            <Chip
                                                label={getDisplayValue(chosenFacet.value, chosenFacet.unit)}
                                                onDelete={() => props.insertFacetObjectToChosenFacets( 
                                                    {
                                                        code: chosenFacet.code,
                                                        value: chosenFacet.value,
                                                        unit: chosenFacet.unit
                                                    }
                                                )}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}