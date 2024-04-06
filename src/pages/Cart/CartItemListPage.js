import { useContext, useEffect, useState } from "react";
import { Box, Divider, Link, Paper, Typography } from "@mui/material";


import { currencySymbol } from "../../utils/consts";
import CartItemList from "../../components/Cart/CartItemList";
import ProceedToCheckout from "../../components/Cart/ProceedToCheckout";
import CartEmpty from "../../components/Cart/CartEmpty";
import UserContext from "../../context/UserContext";
import useAxios from "../../utils/useAxios";


export default function CartItemListPage() {
    const [cartData, setCartData] = useState(null);

    const api = useAxios('users');
    const { userInfo, refreshUserInfo } = useContext(UserContext);


    const getCartData = async () => {
        try {
            let response = await api.get(`/api/carts/${userInfo.cart.cart_uuid}/`);
            let data = await response.data;
            setCartData(data);
            console.log(data);
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const changeCartItemQuantity = async (cartItemId, newQuantity) => {
        try {
            await api.patch(`/api/carts/${userInfo.cart.cart_uuid}/items/${cartItemId}/`, { quantity: newQuantity });
            refreshUserInfo()
        } catch (e) {
            console.log("Something Went Wrong");
        }
    };

    const deleteCartItem = async (cartItemId) => {
        try {
            await api.delete(`/api/carts/${userInfo.cart.cart_uuid}/items/${cartItemId}/`);
            refreshUserInfo();
        } catch (e) {
            console.log("Something Went Wrong");
        }
    };

    const clearCart = async () => {
        try {
            await api.post(`/api/carts/${userInfo.cart.cart_uuid}/clear/`);
            refreshUserInfo();
        } catch (e) {
            console.log("Something Went Wrong");
        }
    };


    useEffect(() => {
        if (userInfo) {
            getCartData();
        }
    }, [userInfo]);

    return (
        cartData && (
            <Box sx={{ padding: 3 }}>
                <Box display={"flex"} justifyContent="center">
                    <Box sx={{ minWidth: "850px", maxWidth: "1200px" }}>
                        <Paper sx={{ px: 3, py: 2 }}>
                            <Box sx={{ mb: 1 }}>
                                <Typography variant="h4">
                                    Shopping Cart
                                </Typography>
                            </Box>
                            {cartData?.cart_items?.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Link component="button" underline={"hover"} onClick={clearCart}>
                                        <Typography>
                                            Clear All Items
                                        </Typography>
                                    </Link>
                                </Box>
                            )}
                            <Divider />
                            <Box>
                                {cartData.cart_items?.length > 0 ? (
                                    <CartItemList
                                        cartItems={cartData.cart_items ? cartData.cart_items : []}
                                        changeCartItemQuantity={changeCartItemQuantity}
                                        deleteCartItem={deleteCartItem}
                                    />
                                ) : (
                                    <CartEmpty />
                                )}
                            </Box>
                            <Box display="flex" justifyContent="end" sx={{ mt: 1 }}>
                                <Typography variant="h6" sx={{ objectPosition: "right" }}>
                                    Total ({cartData.cart?.count} items): <b>{currencySymbol}{cartData.cart?.total}</b>
                                </Typography>
                            </Box>
                        </Paper>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption">
                                The price and availability of items at SMILE Sales are subject to change. <br />
                                The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ maxWidth: "300px", ml: 5 }}>
                        <Paper sx={{ width: '100%', bgcolor: 'background.paper', padding: 2.5 }}>
                            <ProceedToCheckout cartItemCount={cartData.cart?.count} total={cartData.cart?.total} user={userInfo?.user} />
                        </Paper>
                    </Box>
                </Box>
            </Box>
        )
    );
}