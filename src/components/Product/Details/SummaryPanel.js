import { Box, Typography } from "@mui/material";

// Custom Components and functionality or constants
import { currencySymbol } from "../../../utils/consts";
import { range } from "../../../utils/commonServices";
import { arrayToMenuItems } from "../../../utils/componentServices/selectorServices";

import SelectValue from "../../CommonComponents/Selectors/SelectValue";
import PriceDetails from "./PriceDetails";
import ProductStock from '../ProductStock';
import BuyBox from "./BuyBox";

export default function SummaryPanel(props) {
    const {
        productName,
        isForSale,
        discountedPrice,
        discountPercentage,
        originalPrice,
        stock,
        maxOrderQty,
        inCartCount,
        inCartProductQuantity,
        setInCartProductQuantity,
        isMobile,
        isTablet,
        addProductToCart,
    } = props;

    let allowedToAddToCart = () => {
        if (!isForSale) {
            return 0;
        }

        return inCartCount < maxOrderQty && inCartCount < stock;
    };

    return (
        <Box>
            <Box sx={{
                mt: isMobile || isTablet ? 2.5 : 0,
            }}>
                <Typography variant="h6">
                    {productName}
                </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h5">
                    <b>{currencySymbol}{discountedPrice}</b>
                </Typography>
            </Box>
            {discountPercentage && (
                <Box sx={{ mt: 1, display: "flex" }} >
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="subtitle1">
                            Was: <s style={{ color: "#707070" }}>{currencySymbol}{originalPrice}</s>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 0.5, color: "#E0103A" }}>
                            ({discountPercentage}% off)
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        <PriceDetails
                            originalPrice={originalPrice}
                            discountedPrice={discountedPrice}
                            discountedPercentage={discountPercentage}
                        />
                    </Box>
                </Box>
            )}
            {isForSale ? (
                <Box sx={{ mt: 1 }}>
                    <ProductStock stock={stock} textVariant="h6" />
                </Box>
            ) : (
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h6" sx={{ color: "#B12704" }}>
                        The product is currently not for sale.
                        We don't know when it will be available or if it will be available at all.
                    </Typography>
                </Box>
            )}
            <Box sx={{ mt: 2, mb: 3 }}>
                <SelectValue value={inCartProductQuantity} setValue={(value) => setInCartProductQuantity(Number(value))}
                    menuItems={[
                        ...arrayToMenuItems(range(1, maxOrderQty + 1))
                    ]}
                    size="small"
                    label={"Quantity"}
                    styles={{ width: "150px" }}
                    disabled={!isForSale || stock < 1}
                />
            </Box>
            <Box sx={{ mt: 1 }}>
                <BuyBox allowedToAddToCart={allowedToAddToCart()} buttonSize={"large"} addProductToCart={addProductToCart} />
            </Box>
        </Box>
    )
}