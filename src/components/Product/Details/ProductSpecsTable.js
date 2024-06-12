import parse from 'html-react-parser';
import { Fragment } from "react";
import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { getDisplayNameForRegularFacet } from '../../../utils/products/productFiltering/facetDisplayName';
import HtmlTooltip from "../../CommonComponents/HtmlTooltip";



function SingleProductSpec({ attributeName, displayName, explanation }) {
    return (
        <TableRow>
            <TableCell
                component="th"
                scope="row"
                align="left"

                sx={{
                    width: "50%",
                    color: "#707070",
                    backgroundColor: "#F0F2F2",

                }}
            >
                {attributeName}
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                {displayName}
            </TableCell>

            <TableCell component="th" scope="row" align="right" sx={{

            }}>
                {explanation && (
                    <Box height="inherit" width="inherit" display="flex" alignItems="center" justifyContent="end">
                        <HtmlTooltip placement="left" title={
                            <Fragment>
                                <Typography color="inherit"><b>{attributeName}</b></Typography>
                                <Typography variant="body2">
                                    {parse(explanation)}
                                </Typography>
                            </Fragment>
                        }>
                            <HelpOutlineIcon fontSize='small' />
                        </HtmlTooltip>
                    </Box>
                )}
            </TableCell>

        </TableRow>
    )
}

export default function ProductSpecsTable(props) {
    const {
        productSpecs,
    } = props;

    return (
        <TableContainer component={Paper} className="product-specs-table">
            <Table size="small">
                <TableBody>
                    {productSpecs.map((productSpec, index) => (
                        <SingleProductSpec
                            attributeName={productSpec?.name}
                            displayName={
                                productSpec?.display_name ?
                                    productSpec?.display_name :
                                    getDisplayNameForRegularFacet(
                                        productSpec?.value, productSpec?.unit, 
                                        productSpec?.type, true
                                    )
                            }
                            explanation={productSpec?.explanation}
                            key={`SingleProductSpec-${index}`}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { SingleProductSpec };