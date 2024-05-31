import { Box, Container, Typography, LinearProgress, Divider, Link } from "@mui/material";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import CustomPagination from "../../components/CommonComponents/Navigation/Pagination";
import { changeQueryParams, deleteQueryParams } from "../../utils/urlParams/changeUrlParams";
import {
    encodeChosenFacets, decodeChosenFacets,
    insertFacetValueToChosenFacets, clearChosenFacetCode
} from "../../utils/products/productFiltering/chosenFacetsServices";

import UserContext from "../../context/UserContext";
import ProductList from "../../components/Product/List/ProductBlock/ProductList";
import FacetList from "../../components/Product/List/FacetBlock/FacetList";
import ResultsSummaryBar from "../../components/Product/List/ResultsSummaryBar";
import useAxios from '../../utils/useAxios';
import ProductFilters from "../../utils/products/productFiltering/productFilters";
import CategoryFacet from "../../components/Product/List/FacetBlock/CategoryFacet";
import PriceRangeFacet from "../../components/Product/List/FacetBlock/PriceRange";

export default function ProductListPage() {
    const { userInfo, refreshCartData } = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [pageSize] = useState(20);
    const [pageCount, setPageCount] = useState(1);
    const [itemsCount, setItemsCount] = useState(20);
    // Price values for textfield
    const [minPrice, setMinPrice] = useState(0 || searchParams.get("minPrice"));
    const [maxPrice, setMaxPrice] = useState(0 || searchParams.get("maxPrice"));

    // Loading states
    const [productsLoading, setProductsLoading] = useState(false);
    const [facetsLoading, setFacetsLoading] = useState(false);

    // Product Data
    const [productList, setProductList] = useState([]);
    const [facetList, setFacetList] = useState([]);

    const [facetMetadata, setFacetMetadata] = useState({});
    const [categories, setCategories] = useState({});

    // Query param values
    const querySearch = searchParams.get("q") || '';
    const page = Number(searchParams.get("page")) || 1;
    // Price values for queryparams
    const queryMinPrice = searchParams.get("minPrice");
    const queryMaxPrice = searchParams.get("maxPrice");

    const category = searchParams.get("category");
    const eventId = searchParams.get("eventId");
    const sortOption = searchParams.get("sortOption") || 'relevancy';
    const chosenFacets = searchParams.get("chosenFacets");
    const decodedChosenFacets = decodeChosenFacets(chosenFacets);

    const apiUsers = useAxios('users');
    const apiProducts = useAxios('products');
    const navigate = useNavigate();

    const insertFacetObjectToChosenFacets = ({ code, value, unit, isRange }) => {
        let facetGroups = decodedChosenFacets ? decodedChosenFacets : {};
        let newChosenFacets = insertFacetValueToChosenFacets(facetGroups, { code, value, unit, isRange });
        let newSearchParams = changeQueryParams(searchParams, {
            chosenFacets: encodeChosenFacets(newChosenFacets),
            page: 1,
        });
        setSearchParams(newSearchParams);
    };

    const deleteChosenFacetGroup = (code) => {
        let newChosenFacets = clearChosenFacetCode(decodedChosenFacets, code);
        let newSearchParams = changeQueryParams(searchParams, {
            chosenFacets: encodeChosenFacets(newChosenFacets),
            page: 1,
        });
        setSearchParams(newSearchParams);
    };

    const handleChangeCategory = (categoryId) => {
        let newSearchParams = changeQueryParams(searchParams, {
            category: categoryId,
            page: 1,
        });
        newSearchParams = deleteQueryParams(newSearchParams, ['minPrice', 'maxPrice', 'chosenFacets']);
        setSearchParams(newSearchParams);
    };

    const addProductToCart = async (product_id, inCartCount) => {
        await apiUsers.post(`/api/carts/${userInfo?.cart?.cart_uuid}/items/`, {
            product_id,
            quantity: inCartCount,
        });
        refreshCartData();
    };

    const deleteProductFromCart = async (product_id) => {
        await apiUsers.delete(`/api/carts/${userInfo?.cart?.cart_uuid}/items/${product_id}/`);
        refreshCartData();
    };

    const getProducts = async () => {
        setProductsLoading(true);
        let productFilters = new ProductFilters({
            querySearch: querySearch,
            category: category,
            priceMin: queryMinPrice,
            priceMax: queryMaxPrice,
            chosenFacets,
            eventId,
        });

        let params = {
            page: page,
            page_size: pageSize,
            sort_option: sortOption,
            ...productFilters.getFilters(),
        }

        try {
            let response = await apiProducts.get('/api/v1/products/', { params: params });
            let data = await response.data;
            setItemsCount(data.count);
            setPageCount(data.page_count);
            setProductList(data.items);

        } catch (e) {
            if (e.response.status === 400) {
                navigate("/");
            } else {
                console.log("Something went wrong");
            }
        }
        setProductsLoading(false);
    };

    const getFacets = async () => {
        setFacetsLoading(true);
        let productFilters = new ProductFilters({
            querySearch: querySearch,
            category: category,
            priceMin: queryMinPrice,
            priceMax: queryMaxPrice,
            chosenFacets,
            eventId,
        });

        let params = productFilters.getFilters();
        try {
            let response = await apiProducts.get('/api/v1/products/facet-values', { params: params });
            let data = await response.data;
            setFacetList(data.facet_values);
            setCategories(data.categories);
            setFacetMetadata(data.facet_metadata)
            if (!queryMinPrice) {
                setMinPrice(0 || data?.price_range?._id?.min);
            }
            if (!queryMaxPrice) {
                setMaxPrice(0 || data?.price_range?._id?.max);
            }
        } catch (e) {
            if (e.response.status === 400) {
                navigate("/");
            } else {
                console.log("Something went wrong");
                setFacetList([]);
                setCategories({});
                setMinPrice(0);
                setMaxPrice(0);
            }
        }
        setFacetsLoading(false);
    };

    useEffect(() => {
        getProducts();
    }, [querySearch, page, sortOption, queryMinPrice, queryMaxPrice, category, chosenFacets]);

    useEffect(() => {
        getFacets();
    }, [querySearch, queryMinPrice, queryMaxPrice, category, chosenFacets]);

    return (
        <Container disableGutters maxWidth='xl' className="MainContainer">
            <Box sx={{ mb: 2 }}>
                <ResultsSummaryBar
                    pageNumber={page}
                    pageSize={pageSize}
                    itemsCount={itemsCount}
                    sortOption={sortOption}
                    setSortOption={(value) => setSearchParams(changeQueryParams(searchParams, { 'sortOption': value }))}
                    querySearch={querySearch}

                    chosenFacets={decodedChosenFacets}
                    facetMetadata={facetMetadata}
                    insertFacetObjectToChosenFacets={insertFacetObjectToChosenFacets}
                />
            </Box>
            <Box sx={{ mx: 1.5 }}>
                <Box display="flex">
                    <Container disableGutters maxWidth={'false'}
                        className="FacetListContainer" sx={{ maxWidth: 275, py: 0.5, pr: 1 }}
                    >
                        {!facetsLoading && (
                            <Box>
                                <Box>
                                    <CategoryFacet
                                        categories={categories}
                                        handleChange={handleChangeCategory}
                                    />
                                </Box>
                                <Box sx={{ my: 1 }}>
                                    <Divider />
                                </Box>
                                <Box>
                                    <PriceRangeFacet
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        setMinPrice={setMinPrice}
                                        setMaxPrice={setMaxPrice}
                                        queryMaxPrice={queryMaxPrice}
                                        queryMinPrice={queryMinPrice}
                                        onSubmit={() =>
                                            setSearchParams(changeQueryParams(
                                                searchParams,
                                                {
                                                    minPrice: minPrice,
                                                    maxPrice: maxPrice,
                                                    page: 1,
                                                },
                                            ))
                                        }
                                        onPriceRangeReset={() => setSearchParams(
                                            deleteQueryParams(searchParams, ['minPrice', 'maxPrice', 'page'])
                                        )}
                                    />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <Divider />
                                </Box>
                                <Box>
                                    <FacetList

                                        facets={facetList}
                                        chosenFacets={decodedChosenFacets}
                                        insertFacetObjectToChosenFacets={insertFacetObjectToChosenFacets}
                                        deleteChosenFacetGroup={deleteChosenFacetGroup}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Container>
                    <Container disableGutters maxWidth='xl' className="ProductListContainer" sx={{ ml: 2 }}>
                        {productsLoading ? (
                            <Box sx={{ mt: 2 }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            productList.length > 0 ? (
                                <Box>
                                    <Box>
                                        <Typography variant="h6">
                                            <b>Results</b>
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Check each product page for other buying options.
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <ProductList
                                            items={productList}
                                            cartItems={userInfo?.cart?.items}
                                            addProductToCart={addProductToCart}
                                            deleteProductFromCart={deleteProductFromCart}
                                        />
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
                                </Box>
                            ) : (
                                <Box>
                                    <Box>
                                        <Typography variant="h6">
                                            Oops! No matches were found for the specified filters
                                        </Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Box sx={{ mr: 0.5 }}>
                                            <Typography variant="subtitle2">
                                                To get some results you can
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Link
                                                component="button"
                                                underline={"hover"}
                                                onClick={() => navigate(-1)}
                                            >
                                                <Typography variant="subtitle2">
                                                    Go Back
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        )}
                    </Container>
                </Box>
            </Box>
        </Container>
    );
}