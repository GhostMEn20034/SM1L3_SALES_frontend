import { Box, Container, Typography, Link, CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";


import UserContext from "../../context/UserContext";
import Sections from "../../components/CommonComponents/Tabs/Sections";
import ProductList from "../../components/Product/BuyAgain/ProductList";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import CustomPagination from "../../components/CommonComponents/Navigation/Pagination";
import { getOrderListBreadCrumbData } from "../../utils/order/breadCrumbUtils";
import { changeQueryParams } from "../../utils/urlParams/changeUrlParams";

import { getTabNumberBySectionName, getTabNumberToCallbackMapping } from "../../utils/order/sectionUtils";
import useAxios from '../../utils/useAxios';


export default function BuyAgainPage() {
    const { userInfo, refreshCartData } = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();

    let section = "buyAgain"
    const breadCrumbData = getOrderListBreadCrumbData();

    const navigate = useNavigate();

    const tabNumberToCallBackMapping = getTabNumberToCallbackMapping(navigate);

    let page = Number(searchParams.get('page')) || 1;

    const [tabNumber, setTabNumber] = useState(getTabNumberBySectionName(section));
    const [products, setProducts] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [productsLoading, setProductsLoading] = useState(false);

    const sections = [
        { "name": "Orders", "value": 0 },
        { "name": "Not yet shipped", "value": 1 },
        { "name": "Cancelled", "value": 2 },
        { "name": "Buy Again", "value": 3 },
    ];

    const ordersApi = useAxios('orders');
    const usersApi = useAxios('users');

    const getBoughtProducts = async () => {
        setProductsLoading(true);

        let params = {
            page,
            page_size: 16,
        };
        try {
            let response = await ordersApi.get('/api/v1/recommendations/bought-products/', { params })
            let data = await response.data;
            setProducts(data?.results);
            setTotalPages(data?.total_pages);
        } catch (e) {
            console.log("Something went wrong");
        }

        setProductsLoading(false);
    };

    const addProductToCart = async (product_id, inCartCount) => {
        await usersApi.post(`/api/carts/${userInfo?.cart?.cart_uuid}/items/`, {
            product_id,
            quantity: inCartCount,
        });
        refreshCartData();
    };

    const deleteProductFromCart = async (product_id) => {
        await usersApi.delete(`/api/carts/${userInfo?.cart?.cart_uuid}/items/${product_id}/`);
        refreshCartData();
    };

    useEffect(() => {
        getBoughtProducts();
    }, []);

    if (productsLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Box display="flex" justifyContent="center">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mb: 1 }}>
                        <BreadCrumb breadCrumbData={breadCrumbData} />
                    </Box>
                    <Typography sx={{ mb: 1 }} variant="h4">Your Orders</Typography>
                </Box>
            </Box>
            <Box>
                <Sections
                    value={tabNumber}
                    setValue={setTabNumber}
                    setNewValue={true}
                    sections={sections}
                    valueToCallbackMapping={tabNumberToCallBackMapping}
                />
            </Box>
            {products?.length > 0 ? (
                <Box sx={{ mt: 5 }}>
                    <ProductList 
                        items={products}
                        cartItems={userInfo?.cart?.items}
                        addProductToCart={addProductToCart}
                        deleteProductFromCart={deleteProductFromCart}
                    />
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                    <Typography variant="body1">
                        There are no recommended items for you to buy again at this time.
                        Check <Link component={RouterLink} to='/your-account/order-history/'>Your Orders</Link>
                        &nbsp;for items you previously purchased.
                    </Typography>
                </Box>
            )}
            {totalPages > 1 && (
                <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
                    <CustomPagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => {
                            setSearchParams(changeQueryParams(
                                searchParams,
                                { 'page': value }
                            ));
                            window.scrollTo({
                                top: 0,
                                behavior: 'instant',
                            });
                        }}
                        variant="outlined"
                        shape="rounded"
                        size="large"
                    />
                </Box>
            )}

        </Container>
    );
}