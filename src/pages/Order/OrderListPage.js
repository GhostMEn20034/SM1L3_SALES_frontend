import { Box, Container, Typography, Link } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useSearchParams, createSearchParams, Link as RouterLink } from "react-router-dom";

import Sections from "../../components/CommonComponents/Tabs/Sections";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import FiltersForm from "../../components/Order/List/FiltersForm";
import OrderList from "../../components/Order/List/OrderList";
import CustomPagination from "../../components/CommonComponents/Navigation/Pagination";
import { getOrderListBreadCrumbData } from "../../utils/order/breadCrumbUtils";
import {
    getOrderStatusBySectionName, getSectionName,
    getTabNumberBySectionName, getTabNumberToCallbackMapping,
    getDefaultTimeFilterBySectionName,
} from "../../utils/order/sectionUtils";
import { transformOrderListFilters } from "../../utils/order/orderListFilters";
import { changeQueryParams } from "../../utils/urlParams/changeUrlParams";

import UserContext from "../../context/UserContext";
import useAxios from "../../utils/useAxios";
import ArchiveOrderDialog from "../../components/Order/Dialogs/ArchiveOrderDialog";
import OrderArchivalAlerts from "../../components/Order/List/OrderArchivalAlerts";
import FailedPurchasing from "../../components/Order/List/FailedPurchasing";


export default function OrderListPage() {
    const { userInfo, refreshCartData } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    let section = searchParams.get("section");
    section = getSectionName(location.pathname, section);

    let orderStatus = getOrderStatusBySectionName(section);
    let timeFilter = searchParams.get("timeFilter");
    timeFilter = getDefaultTimeFilterBySectionName(section, timeFilter);

    let page = Number(searchParams.get("page")) || 1;

    const breadCrumbData = getOrderListBreadCrumbData();

    const [tabNumber, setTabNumber] = useState(getTabNumberBySectionName(section));

    const [orderFilters, setOrderFilters] = useState(null);
    const [orders, setOrders] = useState(null);
    const [orderCount, setOrderCount] = useState(0);

    const [orderToArchive, setOrderToArchive] = useState(null);
    const [orderArchivingLoading, setOrderArchivingLoading] = useState(false);

    const [totalPages, setTotalPages] = useState(1);

    const [buyNowFailure, setBuyNowFailure] = useState(false);
    const [successOrderArchival, setSuccessOrderArchival] = useState(false);
    const [failedOrderArchivalMsg, setFailedOrderArchivalMsg] = useState(null);


    const tabNumberToCallBackMapping = getTabNumberToCallbackMapping(navigate);
    const ordersApi = useAxios('orders');
    const usersApi = useAxios('users');

    const changeTimeFilter = (newValue) => {
        let newSearchParams = changeQueryParams(searchParams, {
            timeFilter: newValue,
        });
        setSearchParams(newSearchParams);
    };

    const getOrderFilters = async () => {
        let params = {
            order_status: orderStatus,
        };

        try {
            let response = await ordersApi.get('/api/v1/orders/filters/', { params });
            let data = await response.data;
            setOrderFilters(data?.filters);
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const getOrdersList = async () => {
        let params = {
            order_status: orderStatus,
            time_filter: timeFilter,
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

    const archiveOrder = async (orderUuid) => {
        setOrderArchivingLoading(true);

        try {
            await ordersApi.put(`/api/v1/orders/${orderUuid}/archive/`, { purpose: 'archive' });
            setOrders((prevValues) => prevValues.filter((prevValue) => prevValue.order_uuid !== orderUuid));
            setOrderCount((prevValue) => prevValue - 1);
            setSuccessOrderArchival(true);
            setOrderToArchive(null);
        } catch (e) {
            setFailedOrderArchivalMsg(e.response.data.detail);
        }

        setOrderArchivingLoading(false);
    };

    const openArchiveOrderDialog = (order) => {
        setOrderToArchive(order);
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

    const sections = [
        { "name": "Orders", "value": 0 },
        { "name": "Not yet shipped", "value": 1 },
        { "name": "Cancelled", "value": 2 },
        { "name": "Buy Again", "value": 3 },
    ];

    useEffect(() => {
        if (timeFilter === 'archived') {
            navigate('/your-account/archived-orders/');
        } else {
            getOrdersList();   
        }
    }, [section, timeFilter, page]);

    useEffect(() => {
        getOrderFilters();
    }, [section]);

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            {orderToArchive && (
                <ArchiveOrderDialog
                    order={orderToArchive}
                    open={Boolean(orderToArchive)}
                    handleClose={() => setOrderToArchive(null)}
                    onSubmit={archiveOrder}
                    failedOrderArchivalMsg={failedOrderArchivalMsg}
                    setFailedOrderArchivalMsg={setFailedOrderArchivalMsg}
                    orderArchivingLoading={orderArchivingLoading}
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
                        <OrderArchivalAlerts
                            successOrderArchival={successOrderArchival}
                            setSuccessOrderArchival={setSuccessOrderArchival}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ mb: 1 }} variant="h4">Your Orders</Typography>
                    </Box>
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
            {orderFilters && (
                <Box sx={{ mt: 1 }}>
                    <Box>
                        <FiltersForm
                            timeFilter={timeFilter}
                            setTimeFilter={changeTimeFilter}
                            timeFilters={transformOrderListFilters(orderFilters)}
                            orderCount={orderCount}
                        />
                    </Box>
                </Box>
            )}
            {orders?.length > 0 ? (
                <Box sx={{ mt: 2, }}>
                    <OrderList 
                        orders={orders} 
                        openArchiveOrderDialog={openArchiveOrderDialog} 
                        buyNow={buyNow} 
                    />
                </Box>
            ) : (
                <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                    <Typography variant='body1'>
                        There are no orders 
                        {orderFilters?.[timeFilter] ? ` in ${orderFilters[timeFilter].toLowerCase()}` : ''}. 
                        See <Link component={RouterLink} to={'/your-account/archived-orders/'}>Your Archived Orders</Link>.
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