import { Box, Container, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

import EventList from "../../components/Event/List/EventList";
import CustomPagination from "../../components/CommonComponents/Navigation/Pagination";

import useAxios from "../../utils/useAxios";
import { changeQueryParams } from "../../utils/urlParams/changeUrlParams";

export default function EventListPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [events, setEvents] = useState(null);
    const [pageCount, setPageCount] = useState(1);

    const page = searchParams.get("page") || 1;

    const productsApi = useAxios('products');

    const getEvents = async () => {
        try {
            let response = await productsApi.get('/api/v1/events/');
            let data = await response.data;
            setEvents(data?.items);
            setPageCount(data?.page_count);
        } catch (err) {
            console.log("Something went wrong");
        }
    };

    useEffect(() => {
        getEvents();
    }, [page]);

    return (
        <Container sx={{
            py: 2,
        }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4">
                    <b>Events</b>
                </Typography>
            </Box>
            {events?.length > 0 ? (
                <Box>
                    <Box>
                        <EventList events={events} />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
                        <CustomPagination
                            count={pageCount}
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
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">
                        There are no events at this moment.
                    </Typography>
                    <Link component={RouterLink} to={"/"}>
                        <Typography>
                            Go to main page
                        </Typography>
                    </Link>
                </Box>
            )}
        </Container>
    );
}