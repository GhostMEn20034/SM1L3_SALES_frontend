import { Box, Button, Typography, Link } from "@mui/material";

import PriceBox from "./PriceBox";
import ProductStock from '../../ProductStock';

export default function ProductItem(props) {
    let allowToAddToCart = (props.stock > 0) || (props.inCartCount < props.max_order_qty);

    return (
        <Box display="flex">
            <Box className="ImageSection" sx={{ml: 2, mr: 5, minWidth: 200 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <img
                        src={props.image}
                        alt={props.name}
                        height={150}
                        style={{ objectFit: 'scale-down' }}
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
                    <Box className='CartBox' sx={{mt: 1}}>
                        <Box>
                            <Button
                                variant="contained"
                                disabled={!allowToAddToCart}
                                sx={{
                                    backgroundColor: '#ebeb05',
                                    ":hover": { backgroundColor: "#dbdb04" },
                                    color: '#000000',
                                    borderRadius: "15px",
                                }}
                                size="small"
                                >
                                Add To Cart
                            </Button>
                        </Box>
                        {props.inCartCount > 0 && (
                            <Box display="flex" sx={{ mt: 1 }}>
                                <Typography variant="subtitle2">
                                    <b>{props.inCartCount} in cart</b>
                                </Typography>
                                <Typography variant="subtitle2" sx={{ml: 0.5}}>
                                    -
                                </Typography>
                                <Link component="button" underline={"hover"} sx={{ml: 0.5}}>
                                    <Typography variant="subtitle2">
                                        Remove
                                    </Typography>
                                </Link>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    )
}