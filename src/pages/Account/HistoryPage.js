import { Box, CircularProgress, Container, Typography, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";
import ProductHistoryList from "../../components/Product/History/ProductHistoryList";
import useAxios from "../../utils/useAxios";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import CustomPagination from "../../components/CommonComponents/Navigation/Pagination";

export default function HistoryPage() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [recentlyViewedItems, setRecentlyViewedItems] = useState(null);


    const location = useLocation();
    const usersApi = useAxios("users");

    let breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);

    const getRecentlyViewedItems = async () => {
        setLoading(true);
        let queryParams = {
            page: page,
            page_size: 21,
        };

        try {
            let response = await usersApi.get("/api/history/", {
                params: queryParams,
            });
            let data = await response.data;

            setRecentlyViewedItems(data?.results);
            setTotalPages(data?.total_pages);
        } catch (err) {
            console.log("Something went wrong");
        }
        setLoading(false);
    };

    const removeItemFromHistory = async (historyItemId) => {
        try {
            await usersApi.delete(`/api/history/${historyItemId}/`);
            if (page === 1) {
                // If current page number is 1, 
                // we just manually refresh information after history item delete.
                getRecentlyViewedItems();
            } else {
                // If current page number is greater than 1, 
                // then we change page number to 1 
                // and it will trigger getRecentlyViewedItems function inside the useEffect.
                setPage(1);
            }
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    const removeAllItemsFromHistory = async () => {
        try {
            await usersApi.delete("/api/history/delete-all/");
            if (page === 1) {
                // If current page number is 1, 
                // we just manually refresh information after history item delete.
                getRecentlyViewedItems();
            } else {
                // If current page number is greater than 1, 
                // then we change page number to 1 
                // and it will trigger getRecentlyViewedItems function inside the useEffect.
                setPage(1);
            }
        } catch (e) {
            console.log("Something went wrong");
        }
    };

    useEffect(() => {
        getRecentlyViewedItems();
    }, [page]);

    if (loading) {
        return (
            <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box>
                <BreadCrumb breadCrumbData={breadCrumbData} />
            </Box>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography variant="h4">
                        Recently Viewed Items
                    </Typography>
                </Box>
                {recentlyViewedItems?.length > 0 && (
                    <Box sx={{ ml: "auto" }}>
                        <Button
                            onClick={removeAllItemsFromHistory}
                            sx={{
                                backgroundColor: '#ebeb05',
                                ":hover": { backgroundColor: "#dbdb04" },
                                color: '#000000',
                                borderRadius: "15px",
                            }}
                        >
                            Clear all items
                        </Button>
                    </Box>
                )}
            </Box>
            {recentlyViewedItems?.length > 0 ? (
                <Box>
                    <Box sx={{ mt: 3 }}>
                        <ProductHistoryList recentlyViewedItems={recentlyViewedItems} removeItemFromHistory={removeItemFromHistory} />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
                        <CustomPagination
                            count={totalPages}

                            page={page}
                            onChange={(_, value) => {
                                setPage(value);
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
                </Box>
            ) : (
                <Box sx={{mt: 5}}>
                    <Box>
                        <Typography variant="h6">
                            You've not seen any products.
                        </Typography>
                    </Box>
                    <Box>
                        <Link component={RouterLink} to="/">
                            <Typography variant="body1">
                                Go shopping
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            )}
        </Container>
    );
}