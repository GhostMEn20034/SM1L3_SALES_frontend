import { useContext, useEffect, useState } from "react";
import { Alert, Box, Divider, Link, Paper, Typography, Grid } from "@mui/material";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";


import { currencySymbol } from "../../utils/consts";
import CartItemList from "../../components/Cart/CartItemList";
import ProceedToCheckout from "../../components/Cart/ProceedToCheckout";
import CartEmpty from "../../components/Cart/CartEmpty";
import UserContext from "../../context/UserContext";
import useAxios from "../../utils/useAxios";
import { canProductBeSold } from "../../utils/products/productChecks";



export default function CartItemListPage() {
    const api = useAxios('users');
    const location = useLocation();
    const stateData = location.state;
    const navigate = useNavigate();

    const { userInfo, refreshUserInfo } = useContext(UserContext);

    const [checkedCartItems, setCheckedCartItems] = useState([]);
    const [cartData, setCartData] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null || stateData?.alertMessage);

    const getCartData = async () => {
        try {
            let response = await api.get(`/api/carts/${userInfo.cart.cart_uuid}/`);
            let data = await response.data;
            setCartData(data);
            let cartItems = data.cart_items ? data.cart_items : [];
            if (cartItems.length > 0) {
                setCheckedCartItems(() => {
                    let newCheckedCartItems = [];
                    for (let cartItem of cartItems) {
                        if (canProductBeSold(cartItem.product.stock, cartItem.product.for_sale)) {
                            newCheckedCartItems.push(cartItem.product.object_id);
                        }
                    }
                    return newCheckedCartItems;
                });
            }
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const checkCartItem = (productId) => {
        setCheckedCartItems((prevValues) => {
            if (prevValues.includes(productId)) {
                // If productId is already in the array, remove it
                return prevValues.filter(item => item !== productId);
            } else {
                // If productId is not in the array, add it
                return [...prevValues, productId];
            }
        });
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

    const proceedToCheckout = () => {
        if (checkedCartItems.length > 0) {
            let params = {
                productIds: checkedCartItems.join(','),
            };
            navigate({ pathname: "/orders/checkout", search: createSearchParams(params).toString() });
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
                <Grid container spacing={2}>
                    <Grid item md={8.5} sm={12} xs={12}>
                        <Box sx={{ mb: 2, width: "100%" }}>
                            <Alert severity="info">
                                <Typography variant="body2">
                                    Before proceeding to checkout, please review the items in your cart. <br />
                                    Make sure to select the products you want to purchase.
                                </Typography>
                            </Alert>
                        </Box>
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
                        <Paper sx={{ px: 3, py: 2 }}>
                            <Box>
                                {cartData.cart_items?.length > 0 ? (
                                    <CartItemList
                                        cartItems={cartData.cart_items ? cartData.cart_items : []}
                                        checkedCartItems={checkedCartItems}
                                        checkCartItem={checkCartItem}
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
                    <Grid item lg={3.35} md={3.35} sm={12} xs={12}>
                        <Paper sx={{ bgcolor: 'background.paper', padding: 2.5 }}>
                            <ProceedToCheckout
                                cartItemCount={cartData.cart?.count}
                                total={cartData.cart?.total}
                                user={userInfo?.user}
                                checkedCartItems={checkedCartItems}
                                onProceedCheckout={proceedToCheckout}
                            />
                        </Paper>

                    </Grid>
                </Grid>
            </Box>
        )
    );
}