import { Box, Typography, Link } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import PriceBox from "./PriceBox";
import ProductStock from '../../ProductStock';
import { useState, memo } from "react";

const ProductItem = memo(function ProductItem(props) {
    const [addToCartloading, setAddToCartLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    let allowToAddToCart = (props.inCartCount < props.max_order_qty && props.inCartCount < props.stock);

    const onAddProductToCart = async (product_id, inCartCount) => {
        setAddToCartLoading(true);
        try {
            await props.addProductToCart(product_id, inCartCount + 1);
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
            await props.deleteProductFromCart(product_id);
        } catch {
            setErrorMessage("Unable to delete a product from the cart");
        }
    };

    return (
        <Box display="flex">
            <Box className="ImageSection" sx={{ ml: 2, mr: 5, minWidth: 200, maxWidth: 210 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <img
                    src={props.image}
                    alt={props.name}
                    style={{ objectFit: 'scale-down', width: "100%", maxHeight: 150 }}
                />
            </Box>
            <Box className="ProductInfoSection">
                <Box className="TitleBox">
                    <Typography variant="body1" sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }} >
                        {props.name}
                    </Typography>
                </Box>
                <Box className="PriceBox">
                    <Box>
                        <PriceBox
                            discount_percentage={props.discount_percentage}
                            original_price={props.original_price}
                            discounted_price={props.discounted_price}
                        />
                    </Box>
                </Box>
                <Box className='ProductStockBox'>
                    <ProductStock stock={props.stock} />
                </Box>
                {props.stock > 0 && (
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
                                onClick={async () => await onAddProductToCart(props.id, props.inCartCount)}
                            >
                                Add To Cart
                            </LoadingButton>
                        </Box>
                        {props.inCartCount > 0 && (
                            <Box display="flex" sx={{ mt: 1 }}>
                                <Typography variant="subtitle2">
                                    <b>{props.inCartCount} in cart</b>
                                </Typography>
                                <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                                    -
                                </Typography>
                                <Link
                                    component="button"
                                    underline={"hover"} sx={{ ml: 0.5 }}
                                    onClick={() => onDeleteProductFromCart(props.id)}
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
    )
});

export default ProductItem;