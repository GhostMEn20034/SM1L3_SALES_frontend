import { useContext, useEffect, useState } from "react";
import { Alert, Box, Divider, Link, Paper, Typography, Grid } from "@mui/material";


import { currencySymbol } from "../../utils/consts";
import CartItemList from "../../components/Cart/CartItemList";
import ProceedToCheckout from "../../components/Cart/ProceedToCheckout";
import CartEmpty from "../../components/Cart/CartEmpty";
import UserContext from "../../context/UserContext";
import useAxios from "../../utils/useAxios";
import { useLocation } from "react-router-dom";


export default function CartItemListPage() {
    const api = useAxios('users');
    const location = useLocation();
    const stateData = location.state;

    const { userInfo, refreshUserInfo } = useContext(UserContext);

    const [cartData, setCartData] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null || stateData?.alertMessage);


    const getCartData = async () => {
        try {
            let response = await api.get(`/api/carts/${userInfo.cart.cart_uuid}/`);
            let data = await response.data;
            setCartData(data);
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const changeCartItemQuantity = async (cartItemId, newQuantity, productName) => {
        productName = productName ? productName : "Cart Item";
        try {
            await api.patch(`/api/carts/${userInfo.cart.cart_uuid}/items/${cartItemId}/`, { quantity: newQuantity });
            refreshUserInfo();
            if (!newQuantity) {
                setAlertMessage({ severity: "info", message: `${productName} Was removed from Your Cart` })
            }
        } catch (e) {
            console.log("Something Went Wrong");
        }
    };

    const deleteCartItem = async (cartItemId, productName) => {
        productName = productName ? productName : "Cart Item";
        try {
            await api.delete(`/api/carts/${userInfo.cart.cart_uuid}/items/${cartItemId}/`);
            refreshUserInfo();
            setAlertMessage({ severity: "info", message: `${productName} Was removed from Your Cart` });
        } catch (e) {
            console.log("Something Went Wrong");
        }
    };

    const clearCart = async () => {
        try {
            await api.post(`/api/carts/${userInfo.cart.cart_uuid}/clear/`);
            refreshUserInfo();
            setAlertMessage({ severity: "info", message: "Cart was cleared" });
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
            <Box sx={{ py: 2, px: 5 }} display="flex" flexDirection="column" justifyContent='center'>
                <Box>
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
                </Box>
                <Grid container spacing={2} sx={{ maxWidth: "1200px" }}>
                    <Grid item  md={8.7} sm={12} xs={12}>
                        <Paper sx={{ px: 3, py: 2 }}>
                            {alertMessage && (
                                <Box my={2}>
                                    <Alert
                                        severity={alertMessage.severity}
                                        onClose={() => setAlertMessage(null)}
                                    >
                                        {alertMessage.message}
                                    </Alert>
                                </Box>
                            )}
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
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <Paper sx={{ width: '100%', bgcolor: 'background.paper', padding: 2.5 }}>
                            <ProceedToCheckout cartItemCount={cartData.cart?.count} total={cartData.cart?.total} user={userInfo?.user} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        )
    );
}