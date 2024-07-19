import { Box, Typography, Link } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as RouterLink } from "react-router-dom";

import PriceBox from "../PriceBox";
import ProductStock from '../ProductStock';
import { useState, memo } from "react";

const ProductItem = memo(function ProductItem(props) {
    const {
        id, name, image, inCartCount, max_order_qty, 
        stock, discount_percentage, original_price,
        discounted_price, addProductToCart, deleteProductFromCart,
    } = props;

    const [addToCartloading, setAddToCartLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    let allowToAddToCart = (inCartCount < max_order_qty && inCartCount < stock);

    const onAddProductToCart = async (product_id, inCartCount) => {
        setAddToCartLoading(true);
        try {
            await addProductToCart(product_id, inCartCount + 1);
        } catch (err) {
            let data = err.response.data;
            if ("error" in data) {
                setErrorMessage(data?.error);
            }
        }
        setAddToCartLoading(false);
    };

    const onDeleteProductFromCart = async (product_id) => {
        try {
            await deleteProductFromCart(product_id);
        } catch {
            setErrorMessage("Unable to delete a product from the cart");
        }
    };

    return (
        <Box>
            <Box className="ImageSection" sx={{ px: 3 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Link component={RouterLink} to={`/item/${id}`} underline="none" color="inherit">
                    <img
                        src={image}
                        alt={name}
                        style={{ objectFit: 'scale-down', width: "100%", height: "120px" }}
                    />
                </Link>
            </Box>
            <Box className="ProductInfoSection" sx={{ mt: 1, padding: 0.5 }}>
                <Box className="TitleBox">
                    <Link component={RouterLink} to={`/item/${id}`} underline="none" color="inherit" sx={{
                        '&:hover': {
                            color: '#0073C4' // color on hover
                        }
                    }}>
                        <Typography variant="body2" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }} >
                            {name}
                        </Typography>
                    </Link>
                </Box>
                <Box>
                    <Box className="PriceBox">
                        <PriceBox
                            discount_percentage={discount_percentage}
                            original_price={original_price}
                            discounted_price={discounted_price}
                        />
                    </Box>
                    <Box className='ProductStockBox'>
                        <ProductStock stock={stock} />
                    </Box>
                </Box>
                {stock > 0 && (
                    <Box className='CartBox' sx={{ mt: 1 }}>
                        <Box>
                            <LoadingButton
                                variant="contained"
                                loading={addToCartloading}
                                disabled={!allowToAddToCart}
                                sx={{
                                    backgroundColor: '#ebeb05',
                                    ":hover": { backgroundColor: "#dbdb04" },
                                    color: '#000000',
                                    borderRadius: "15px",
                                }}
                                size="small"
                                onClick={async () => await onAddProductToCart(id, inCartCount)}
                            >
                                Add To Cart
                            </LoadingButton>
                        </Box>
                        {inCartCount > 0 && (
                            <Box display="flex" sx={{ mt: 1 }}>
                                <Typography variant="subtitle2">
                                    <b>{inCartCount} in cart</b>
                                </Typography>
                                <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                                    -
                                </Typography>
                                <Link
                                    component="button"
                                    underline={"hover"} sx={{ ml: 0.5 }}
                                    onClick={() => onDeleteProductFromCart(id)}
                                >
                                    <Typography variant="subtitle2">
                                        Remove
                                    </Typography>
                                </Link>
                            </Box>
                        )}
                        {errorMessage && (
                            <Box>
                                <Typography variant="body2" sx={{ color: "red" }}>
                                    {errorMessage}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
});

export default ProductItem;