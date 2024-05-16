import { useContext, useEffect, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import UserContext from "../context/UserContext";
import useAxios from "../utils/useAxios";
import ProductHistoryListSlider from "../components/Product/History/ProductHistoryListSlider";



export default function IndexPage() {
    const { userInfo } = useContext(UserContext);

    const [recentlyViewedItems, setRecentlyViewedItems] = useState(null);

    const usersApi = useAxios('users');

    const getRecentlyViewedItems = async () => {
        let queryParams = {
            page_size: 12,
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

    useEffect(() => {
        getRecentlyViewedItems();
    }, []);

    return (
        <Container disableGutters maxWidth="lg" sx={{ py: 2, }}>
            {recentlyViewedItems && (
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant="h5">
                                <b>Your Recently Viewed Items</b>
                            </Typography>
                        </Box>
                        <Box sx={{ml: "auto", mr: "5%"}}>
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
        </Container>
    )

}