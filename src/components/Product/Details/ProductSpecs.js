import { Box, Typography } from "@mui/material";

import ProductSpecsTable from "./ProductSpecsTable";
import { isEmpty } from '../../../utils/dataTypeUtils/objectUtils';

export default function ProductSpecs(props) {
    const {
        specs, // Product specifications
    } = props;

    // Deconstruct grouped product specs on group "other" (contains specs without group) 
    // and other product groups (Which contain specs that the group classifies)
    const { other, ...productGroups } = specs;

    const GroupedProductSpecs = () => {
        if (isEmpty(productGroups)) {
            return (
                <Box display="flex">
                    <ProductSpecsTable productSpecs={other} />
                </Box>
            );
        }



        return (
            <Box>
                <Box>
                    {Object.keys(productGroups).map((productGroup, index) => (
                        <Box key={index} sx={{ mt: index === 0 ? 0 : 2, mb: 2 }}>
                            <Typography variant="h6">
                                <b>{productGroup}</b>
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                                <ProductSpecsTable productSpecs={productGroups[productGroup]} />
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box>
                    {other && (
                        <Box>
                            <Typography variant="h6">
                                <b>Other Product Information</b>
                            </Typography>
                            <Box sx={{mt: 0.5}}>
                                <ProductSpecsTable productSpecs={other} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }

    return (
        <Box className="about-this-item-wrapper">
            <Box className="product-specs">
                <GroupedProductSpecs />
            </Box>
            <Box>

            </Box>
        </Box>
    );
};