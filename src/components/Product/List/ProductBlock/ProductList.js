import { Box } from "@mui/material";
import ProductItem from "./ProductItem";

export default function ProductList(props) {
    const getInCartCount = (product_id) => {
        if (!props.cartItems) {
            return 0;
        }
        let inCartCount = props.cartItems[product_id]?.quantity;
        if (!inCartCount) {
            return 0;
        }

        return inCartCount;
    }

    return (
        <Box>
            {props.items.map((item, i) => (
                <Box key={i} sx={{ mt: 2, padding: 1, borderStyle: "solid", borderColor: "#d9d9d9", borderWidth: 0.5, borderRadius: 3 }}>
                    <ProductItem
                        id={item._id}
                        name={item.name}
                        original_price={item.original_price}
                        discounted_price={item.discounted_price}
                        discount_percentage={item.discount_percentage}
                        stock={item.stock}
                        max_order_qty={item.max_order_qty}
                        image={item.image}
                        inCartCount={getInCartCount(item._id)}
                        addProductToCart={props.addProductToCart}
                        deleteProductFromCart={props.deleteProductFromCart}
                    />
                </Box>
            ))}
        </Box>
    )
}