import { Box, CircularProgress, Container, Typography, Paper, Button, Grid } from "@mui/material";
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined';
import { useEffect, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";

import useAxios from "../../utils/useAxios";
import CategoryList from "../../components/Category/CategoryList";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { getCategoryAncestorsBreadCrumbData } from "../../utils/categories/breadCrumbData";

export default function ShopByCategoryPage() {
    const [searchParams,] = useSearchParams();
    const parentId = searchParams.get("parentId"); // Identifier of the parent category

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(null);
    const [parentData, setParentData] = useState(null); // Data of the parent category (used only when some category is selected)

    const productsApi = useAxios('products');

    const getCategories = async () => {
        setLoading(true);
        let params = {
            parent_id: parentId,
        };

        try {
            let response = await productsApi.get('/api/v1/categories/', { params });
            let data = await response.data;
            setCategories(data?.items);
            setParentData(data?.parent_data)
            console.log(data?.parent_data);
        } catch (e) {
            console.log("Something Went Wrong");
        }
        setLoading(false);
    };

    useEffect(() => {
        getCategories();
    }, [parentId]);




    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 2 }}>
            {parentData && (
                <Box>
                    <Box sx={{mb: 0.5}}>
                        <BreadCrumb
                            breadCrumbData={
                                getCategoryAncestorsBreadCrumbData(
                                    [...(parentData?.parent_ancestors || []), 
                                    { "_id": parentData._id, "name": parentData.name }
                                    ],
                                    1
                                )
                            } 
                            />
                    </Box>
                    <Box>
                        <Paper sx={{ mb: 2, paddingY: 3, paddingX: 2, }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm="auto">
                                    <Typography variant="h4">
                                        <b>{parentData.name}</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        component={RouterLink}
                                        variant="contained"
                                        endIcon={<TrendingFlatOutlinedIcon />}
                                        to={`/s?category=${parentData._id}`}
                                    >
                                        Go Shop Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Box>
            )}
            {categories && (
                <Box>
                    <CategoryList categories={categories} />
                </Box>
            )}
        </Container>
    );
}