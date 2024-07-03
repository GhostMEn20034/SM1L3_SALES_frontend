import { Box, Typography, Link, Checkbox } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import ProductStock from "../Product/ProductStock";
import ProductPrice from "./ProductPrice";
import CartItemActionRow from "./CartItemActionRow";
import { canProductBeSold } from "../../utils/products/productChecks";

export default function CartItem(props) {

    return (
        <Box display={"flex"} width="100%">
            <Box display="flex" alignItems="center">
                <Checkbox
                    checked={
                        props.checkedCartItems?.includes(props.product?.object_id)
                    }
                    disabled={!canProductBeSold(props.product?.stock, props.product?.for_sale)}
                    onChange={() => props.checkCartItem(props.product?.object_id)}
                    sx={{ mr: 4 }}
                />
            </Box>
            <Box>
                <Link component={RouterLink} to={`/item/${props.product?.object_id}`} underline="none" color="inherit">
                    <img
                        alt="No Product Img"
                        src={props.product?.image}
                        height={150}
                        width={150}
                        style={{ objectFit: 'scale-down' }}
                    />
                </Link>
            </Box>
            <Box sx={{ ml: 3, maxWidth: 450, mt: 0.3 }}>
                <Box>
                    <Link component={RouterLink} to={`/item/${props.product?.object_id}`} underline="none" color="inherit" sx={{
                        '&:hover': {
                            color: '#0073C4' // color on hover
                        }
                    }}>
                        <Typography variant="body1" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}>
                            {props.product?.name}
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <ProductStock stock={props.product?.stock} />
                </Box>
                <Box sx={{ mt: 1.5 }}>
                    <CartItemActionRow
                        stock={props.product?.stock}
                        maxOrderQuantity={props.product?.max_order_qty}
                        itemQuantity={props.itemQuantity}
                        productName={props.product?.name}
                        id={props.id}
                        changeCartItemQuantity={props.changeCartItemQuantity}
                        deleteCartItem={props.deleteCartItem}
                    />
                </Box>
                {props.product?.stock < 1 && (
                    <Box sx={{ mt: 1 }} display="flex" alignItems="center">
                        <WarningAmberOutlinedIcon sx={{ color: "orange" }} />
                        <Typography variant="subtitle2" sx={{ color: "orange" }}>
                            This product will be ignored during checkout since it is out of stock
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box display="flex" justifyContent="end" sx={{ ml: "auto" }}>
                <ProductPrice price={props.product?.price} discountRate={props.product?.discount_rate} />
            </Box>
        </Box>
    );
}