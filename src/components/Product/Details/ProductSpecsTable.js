import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

export default function ProductSpecsTable(props) {
    const {
        productSpecs,
    } = props;

    return (
        <TableContainer component={Paper} className="product-specs-table">
            <Table size="small">
                <TableBody>
                    {productSpecs.map((productSpec, index) => (
                        <TableRow key={`TableRow-${index}`}>
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
                                {productSpec?.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="left">
                                {productSpec?.display_name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};