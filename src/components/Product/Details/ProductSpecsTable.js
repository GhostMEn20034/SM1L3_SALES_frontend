import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

function SingleProductSpec({ attributeName, displayName }) {
    return (
        <TableRow>
            <TableCell
                component="th"
                scope="row"
                align="left"
                sx={{
                    width: "50%",
                    color: "#707070",
                    backgroundColor: "#F0F2F2"
                }}
            >
                {attributeName}
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                {displayName}
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
                            displayName={productSpec?.display_name}
                            key={`SingleProductSpec-${index}`}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { SingleProductSpec };