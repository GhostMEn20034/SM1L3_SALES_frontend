import { useContext, useEffect, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import UserContext from "../context/UserContext";
import useAxios from "../utils/useAxios";
import ProductHistoryListSlider from "../components/Product/History/ProductHistoryListSlider";
import DealsOnIndexPage from "../components/Deals/DealsOnIndexPage";
import EventListSlider from "../components/Event/SliderList/EventListSlider";



export default function IndexPage() {
    const { userInfo } = useContext(UserContext);

    const [recentlyViewedItems, setRecentlyViewedItems] = useState(null);
    const [deals, setDeals] = useState(null);
    const [events, setEvents] = useState(null);

    const recentlyViewedItemsPageSize = 12;

    const usersApi = useAxios('users');
    const productsApi = useAxios('products');

    const getRecentlyViewedItems = async () => {
        let queryParams = {
            page_size: recentlyViewedItemsPageSize,
        };

        try {
            let response = await usersApi.get("/api/history/", {
                params: queryParams,
            });
            let data = await response.data;

            setRecentlyViewedItems(data?.results);
        } catch (err) {
            console.log("Something went wrong");
        }
    };

    const getDealList = async () => {
        let queryParams = {
            page_size: 35,
        };

        try {
            let response = await productsApi.get("/api/v1/deals/", { params: queryParams });
            let data = await response.data;
            setDeals(data?.items);
        } catch (err) {
            console.log("Something went wrong with Deals");
        }
    };

    const getEvents = async () => {
        let queryParams = {
            page_size: 6,
        };

        try {
            let response = await productsApi.get('/api/v1/events/', {params: queryParams});
            let data = await response.data;
            setEvents(data?.items);
        } catch (err) {
            console.log("Something went wrong");
        }
    };

    useEffect(() => {
        if (userInfo?.user) {
            getRecentlyViewedItems();
        }
    }, [userInfo]);

    useState(() => {
        getDealList();
        getEvents();
    }, [])

    return (
        <Container disableGutters maxWidth="lg" sx={{ py: 2, }}>
            {events?.length > 0 && (
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box sx={{ ml: "auto" }}>
                            <Link component={RouterLink} to={"/events"}>
                                <Typography variant="subtitle1">
                                    See all events
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <EventListSlider events={events} />
                    </Box>
                </Box>
            )}
            {recentlyViewedItems?.length > 0 && (
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant="h5">
                                <b>Your Recently Viewed Items</b>
                            </Typography>
                        </Box>
                        <Box sx={{ ml: "auto", mr: "2.5%" }}>
                            <Link component={RouterLink} to={"your-account/recently-viewed-items"}>
                                <Typography variant="subtitle1">
                                    See all
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <ProductHistoryListSlider recentlyViewedItems={recentlyViewedItems} />
                    </Box>
                </Box>
            )}
            {deals?.length > 0 && (
                <Box sx={{ my: 4 }}>
                    <DealsOnIndexPage deals={deals} />
                </Box>
            )}
        </Container>
    )

}