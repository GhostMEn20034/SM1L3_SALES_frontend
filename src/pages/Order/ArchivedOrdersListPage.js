import { Box, Container, Link, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import {
    useSearchParams, Link as RouterLink,
    useNavigate, createSearchParams
} from "react-router-dom";

import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import OrderList from "../../components/Order/List/OrderList";
import UserContext from "../../context/UserContext";
import CustomPagination from "../../components/CommonComponents/Navigation/Pagination";
import FailedPurchasing from "../../components/Order/List/FailedPurchasing";
import { getArchivedOrderListBreadCrumbData } from "../../utils/order/breadCrumbUtils";
import { changeQueryParams } from "../../utils/urlParams/changeUrlParams";

import useAxios from "../../utils/useAxios";
import OrderUnarchivalAlerts from "../../components/Order/List/OrderUnarchivalAlerts";
import UnarchiveOrderDialog from "../../components/Order/Dialogs/UnarchiveOrderDialog";


export default function ArchivedOrdersListPage() {
    const { userInfo, refreshCartData } = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    let page = Number(searchParams.get("page")) || 1;

    const breadCrumbData = getArchivedOrderListBreadCrumbData();

    const [orders, setOrders] = useState(null);
    const [orderCount, setOrderCount] = useState(0);

    const [totalPages, setTotalPages] = useState(1);

    const [orderToUnarchive, setOrderToUnarchive] = useState(null);
    const [orderUnarchivingLoading, setOrderUnarchivingLoading] = useState(false);

    const [buyNowFailure, setBuyNowFailure] = useState(false);
    const [successOrderUnarchival, setSuccessOrderUnarchival] = useState(false);
    const [failedOrderUnarchivalMsg, setFailedOrderUnarchivalMsg] = useState(null);

    const ordersApi = useAxios('orders');
    const usersApi = useAxios('users');

    const getOrdersList = async () => {
        let params = {
            order_status: "allOrders",
            time_filter: 'archived',
            page: page,
            page_size: 8,
        };

        try {
            let response = await ordersApi.get('/api/v1/orders/', { params });
            let data = await response.data;
            setOrders(data?.results);
            setOrderCount(data?.count);
            setTotalPages(data?.total_pages);
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const unarchiveOrder = async (orderUuid) => {
        setOrderUnarchivingLoading(true);

        try {
            await ordersApi.put(`/api/v1/orders/${orderUuid}/archive/`, { purpose: 'unarchive' });
            setOrders((prevValues) => prevValues.filter((prevValue) => prevValue.order_uuid !== orderUuid));
            setOrderCount((prevValue) => prevValue - 1);
            setSuccessOrderUnarchival(true);
            setOrderToUnarchive(null);

        } catch (e) {
            setFailedOrderUnarchivalMsg(e.response.data.detail);
        }

        setOrderUnarchivingLoading(false);
    };

    const openUnarchiveOrderDialog = (order) => {
        setOrderToUnarchive(order);
    };

    const buyNow = async (productId) => {
        try {
            await usersApi.post(`/api/carts/${userInfo?.cart?.cart_uuid}/items/`, {
                product_id: productId,
                quantity: 1,
            });
            refreshCartData();
            navigate({
                pathname: "/orders/checkout",
                search: createSearchParams({
                    'productIds': productId,
                }).toString(),
            });
        } catch (err) {
            console.log(err.response);
            setBuyNowFailure(true);
        }
    };

    useEffect(() => {
        getOrdersList();
    }, [page,]);



    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            {orderToUnarchive && (
                <UnarchiveOrderDialog
                    order={orderToUnarchive}
                    open={Boolean(orderToUnarchive)}
                    handleClose={() => setOrderToUnarchive(null)}
                    onSubmit={unarchiveOrder}
                    failedOrderUnarchivalMsg={failedOrderUnarchivalMsg}
                    setFailedOrderUnarchivalMsg={setFailedOrderUnarchivalMsg}
                    orderUnarchivingLoading={orderUnarchivingLoading}
                />
            )}
            <FailedPurchasing 
                open={buyNowFailure}
                setOpen={setBuyNowFailure}
            />
            <Box display="flex" justifyContent="center">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mb: 1 }}>
                        <BreadCrumb breadCrumbData={breadCrumbData} />
                    </Box>
                    <Box sx={{ my: 3 }}>
                        <OrderUnarchivalAlerts
                            successOrderUnarchival={successOrderUnarchival}
                            setSuccessOrderUnarchival={setSuccessOrderUnarchival}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ mb: 1 }} variant="h4">Your Archived Orders</Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography variant="body1">
                    You have <b>{orderCount} archived orders</b>.
                    To see your other past purchases,
                    go to <Link component={RouterLink} to={'/your-account/order-history/'}>Your Orders</Link>.
                </Typography>
            </Box>
            {orders?.length > 0 && (
                <Box sx={{ mt: 2, }}>
                    <OrderList
                        orders={orders}
                        openArchiveOrderDialog={openUnarchiveOrderDialog}
                        buyNow={buyNow}
                    />
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