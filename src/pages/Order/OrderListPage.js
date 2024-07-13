import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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

import useAxios from "../../utils/useAxios";


export default function OrderListPage() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    let section = searchParams.get("section");
    section = getSectionName(location.pathname, section);

    let orderStatus = getOrderStatusBySectionName(section);
    let timeFilter = searchParams.get("timeFilter");
    timeFilter = getDefaultTimeFilterBySectionName(section, timeFilter);

    let page = Number(searchParams.get("page")) || 1;

    const breadCrumbData = getOrderListBreadCrumbData();

    const [tabNumber, setTabNumber] = useState(getTabNumberBySectionName(section));
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [orderFilters, setOrderFilters] = useState(null);
    const [orders, setOrders] = useState(null);
    const [orderCount, setOrderCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);


    const navigate = useNavigate();
    const tabNumberToCallBackMapping = getTabNumberToCallbackMapping(navigate);
    const ordersApi = useAxios('orders');

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
            setOrderFilters(transformOrderListFilters(data?.filters));
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const getOrdersList = async () => {
        setOrdersLoading(true);
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

    const sections = [
        { "name": "Orders", "value": 0 },
        { "name": "Not yet shipped", "value": 1 },
        { "name": "Cancelled", "value": 2 },
        { "name": "Buy Again", "value": 3 },
    ];

    useEffect(() => {
        getOrderFilters();
    }, [section]);

    useEffect(() => {
        getOrdersList();
    }, [section, timeFilter, page]);

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
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
            {orderFilters && (
                <Box sx={{ mt: 1 }}>
                    <Box>
                        <FiltersForm
                            timeFilter={timeFilter}
                            setTimeFilter={changeTimeFilter}
                            timeFilters={orderFilters}
                            orderCount={orderCount}
                        />
                    </Box>
                </Box>
            )}
            {orders && (
                <Box sx={{ mt: 2, }}>
                    <OrderList orders={orders} />
                </Box>
            )}
            {totalPages > 1 && (
                <Box display="flex" alignItems="center" justifyContent="center" sx={{mt: 4}}>
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