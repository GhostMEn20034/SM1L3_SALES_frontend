import { Box, Container, Typography, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import EventItemData from "../../components/Event/Details/EventItemData";
import { getDateUnitsFromDateDifference } from "../../utils/events/countdown";
import ProductCountByCategory from "../../components/Event/Details/ProductCountByCategory";

import useAxios from "../../utils/useAxios";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function EventDetailsPage() {
    const [loading, setLoading] = useState(false);
    const [eventItem, setEventItem] = useState(null);
    const [timeToEventEnd, setTimeToEventEnd] = useState(null);
    const [productCountByCategory, setProductCountByCategory] = useState(null);

    const { id } = useParams();
    const productsApi = useAxios('products');
    const navigate = useNavigate();

    const getEvent = async () => {
        setLoading(true);

        try {
            let response = await productsApi.get(`/api/v1/events/${id}`);
            let data = await response.data;
            setEventItem(data?.item);
            setProductCountByCategory(data?.product_count_by_category);
        } catch (err) {
            navigate(-1);
        }

        setLoading(false);
    };

    useEffect(() => {
        getEvent();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (eventItem?.end_date && eventItem?.status === 'started') {
                setTimeToEventEnd(
                    getDateUnitsFromDateDifference(
                        dayjs(eventItem.end_date).tz("UTC", true), 
                        dayjs().utc()
                    )
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [eventItem]);

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 2 }}>
            {eventItem && (
                <Box>
                    <EventItemData
                        name={eventItem?.name}
                        startDate={eventItem?.start_date}
                        description={eventItem?.description}
                        endDate={eventItem?.end_date}
                        status={eventItem?.status}
                        timeToEventEnd={timeToEventEnd}
                    />
                </Box>
            )}
            {productCountByCategory && (
                <Box sx={{ mt: 3 }}>
                    {productCountByCategory.length > 1 && (
                        <Box>
                            <Typography variant="h5">
                                <b>Shop By Category</b>
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <ProductCountByCategory items={productCountByCategory} eventId={eventItem?._id} />
                    </Box>
                </Box>
            )}
        </Container>
    );
}