import { Box, Grid } from "@mui/material";
import ProductItem from "./ProductItem";

export default function ProductList(props) {
    const { cartItems, items, addProductToCart, deleteProductFromCart } = props;


    const getInCartCount = (product_id) => {
        if (!cartItems) {
            return 0;
        }
        let inCartCount = cartItems[product_id]?.quantity;
        if (!inCartCount) {
            return 0;
        }

        return inCartCount;
    }

    return (
        <Box>
            <Grid container>
                {items.map((item, i) => (
                    <Grid
                        item
                        key={i}
                        lg={3}
                        md={3}
                        sm={4}
                        xs={6}
                        sx={{ 
                            borderStyle: "solid", 
                            borderColor: "#d9d9d9", 
                            borderWidth: 0.5,
                            margin: '-0.25px' 
                        }}
                    >
                        <Box sx={{ padding: 1 }}>
                            <ProductItem
                                id={item.object_id}
                                name={item.name}
                                original_price={item.price}
                                discounted_price={item.discounted_price}
                                discount_percentage={item.discount_percentage}
                                stock={item.stock}
                                max_order_qty={item.max_order_qty}
                                image={item.image}
                                inCartCount={getInCartCount(item.object_id)}
                                addProductToCart={addProductToCart}
                                deleteProductFromCart={deleteProductFromCart}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}