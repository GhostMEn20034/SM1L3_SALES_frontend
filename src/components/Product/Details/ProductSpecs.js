import { Box, Typography } from "@mui/material";

import ProductSpecsTable from "./ProductSpecsTable";
import { isEmpty } from '../../../utils/dataTypeUtils/objectUtils';


export default function ProductSpecs(props) {
    const {
        specs, // Product specifications
        additionalInformation,
    } = props;

    // Deconstruct grouped product specs on group "other" (contains specs without group) 
    // and other product groups (Which contain specs that the group classifies)
    const { other, ...productGroups } = specs;

    const GroupedProductSpecs = () => {
        if (isEmpty(productGroups)) {
            return (
                <Box>
                    <Box>
                        <ProductSpecsTable productSpecs={other} />
                    </Box>
                    {additionalInformation && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">
                                <b>Additional Information</b>
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                                <ProductSpecsTable productSpecs={additionalInformation} />
                            </Box>
                        </Box>
                    )}

                </Box>

            );
        }



        return (
            <Box display="flex" flexWrap="wrap" gap={3}>
                <Box sx={{
                    flexGrow: 1,
                }}>
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
                {other && (
                    <Box sx={{
                        flexGrow: 1,
                    }}>
                        <Box>
                            <Typography variant="h6">
                                <b>Other Item Information</b>
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                                <ProductSpecsTable productSpecs={other} />
                            </Box>
                        </Box>
                        {additionalInformation && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6">
                                    <b>Additional Information</b>
                                </Typography>
                                <Box sx={{ mt: 0.5 }}>
                                    <ProductSpecsTable productSpecs={additionalInformation} />
                                </Box>
                            </Box>
                        )}
                    </Box >
                )}
            </Box>

        );
    }

    return (
        <Box className="about-this-item-wrapper">
            <Box className="product-specs">
                <GroupedProductSpecs />
            </Box>
        </Box>
    );
};