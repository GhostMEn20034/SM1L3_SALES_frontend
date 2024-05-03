import { Box, Typography } from "@mui/material";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

import ProductStock from "../Product/ProductStock";
import ProductPrice from "./ProductPrice";
import CartItemActionRow from "./CartItemActionRow";

export default function CartItem(props) {
    return (
        <Box display={"flex"}>
            <Box>
                <img
                    alt="No Product Img"
                    src={props.product?.image}
                    height={150}
                    width={180}
                    style={{ objectFit: 'scale-down' }}
                />
            </Box>
            <Box sx={{ ml: 3, maxWidth: 450, mt: 0.3 }}>
                <Box>
                    <Typography variant="body1" sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }}>
                        {props.product?.name}
                    </Typography>
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
                        <WarningAmberOutlinedIcon sx={{color: "orange"}} />
                        <Typography variant="subtitle2" sx={{color: "orange"}}>
                            This product will be ignored during checkout since it is out of stock
                        </Typography>
                    </Box>
                )}
            </Box>
            <Box display="flex" justifyContent="end" sx={{ ml: 3 }}>
                <ProductPrice price={props.product?.price} discountRate={props.product?.discount_rate} />
            </Box>
        </Box>
    );
}