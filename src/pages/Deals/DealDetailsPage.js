import { useEffect, useState } from "react";
import { Link as ReactRouter, useNavigate, useParams } from "react-router-dom";
import {
    Box, Paper,
    CircularProgress,
    Container, Link,
    Typography, Grid,
} from "@mui/material";

import useAxios from '../../utils/useAxios';
import DealItem from "../../components/Deals/DealItem";


export default function DealDetailsPage() {
    const [loading, setLoading] = useState(false);
    const [deal, setDeal] = useState(null);
    const [children, setChildren] = useState(null); // Children of deal

    let { id } = useParams();

    const productsApi = useAxios('products');
    const navigate = useNavigate();

    const getDealDetails = async () => {
        setLoading(true);
        try {
            let response = await productsApi.get(`/api/v1/deals/${id}`);
            let data = await response.data;
            setDeal(data?.item);
            setChildren(data?.children);
        } catch (err) {
            navigate(-1);
        }
        setLoading(false);
    };

    useEffect(() => {
        getDealDetails();
    }, []);

    if (loading) {
        <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    }

    return (
        <Container maxWidth="lg" sx={{ paddingY: 2 }}>
            <Box>
                <Link component={ReactRouter} to={"/"} underline="hover">
                    <Typography variant="subtitle1">
                        Go to the main page
                    </Typography>
                </Link>
            </Box>
            <Box>
                <Typography variant="h6">
                    <b>{deal?.name}</b>
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1">
                    {deal?.description}
                </Typography>
            </Box>
            {children && (
                <Box paddingY={3}>
                    <Grid container spacing={4}>
                        {children.map((child, index) => (
                            <Grid item lg={3} md={4} sm={6} xs={12} sx={{ display: "flex" }} key={index}>
                                <Paper sx={{
                                    flexGrow: 1, display: 'flex',
                                    paddingX: 1,
                                    paddingY: 1.5,
                                }}>
                                    <DealItem
                                        id={child?._id}
                                        name={child?.name}
                                        isParent={child?.is_parent}
                                        queryString={child?.query_string}
                                        buttonText={child?.button_text}
                                        image={child?.image}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
}