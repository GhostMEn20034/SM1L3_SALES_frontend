import { memo, useEffect, useState, useContext } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Container, useTheme,
    useMediaQuery, Typography,
    Divider, LinearProgress,
} from "@mui/material";

// Custom Components and functionality or constants
import useAxios from "../../utils/useAxios";
import UserContext from "../../context/UserContext";
import { getCategoryBreadCrumbData } from "../../utils/products/productDataUtils";
import { updateObject } from "../../utils/dataTypeUtils/objectUtils";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import ImageViewer from "../../components/Images/ImageViewer";
import SummaryPanel from "../../components/Product/Details/SummaryPanel";
import ProductVariationOptions from "../../components/Product/Details/ProductVariationOptions";

// Styles
import "../../styles/products/imageViewerStyles.css";
import ProductSpecs from "../../components/Product/Details/ProductSpecs";
import dayjs from "dayjs";
import ProductNotFoundPage from "./ProductNotFound";

var lodash = require("lodash");


const MemoizedImageViewer = memo(function MemoizedImageViewer({ images, currentImage, setCurrentImage }) {
    return (
        <ImageViewer
            images={images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
        />
    );
});


export default function ProductDetailPage() {
    let { id } = useParams();
    const { userInfo, refreshCartData } = useContext(UserContext);
    let cartItems = userInfo?.cart?.items;

    const productsApi = useAxios('products');
    const usersApi = useAxios('users');

    const navigate = useNavigate();

    const getInCartCount = () => {

        if (!cartItems) {
            return 0;
        }

        let inCartCount = cartItems[id]?.quantity;
        if (!inCartCount) {
            return 0;
        }

        return inCartCount;
    };

    const [productData, setProductData] = useState(null);
    const [productVariations, setProductVariations] = useState(null);
    const [categoryHierarchy, setCategoryHierarchy] = useState(null);
    const [productNotFound, setProductNotFound] = useState(false);

    // User input states
    const [currentImage, setCurrentImage] = useState(0);
    const [inCartProductQuantity, setInCartProductQuantity] = useState(getInCartCount() || 1);
    const [chosenOptions, setChosenOptions] = useState(null);
    const [loadingNewProduct, setLoadingNewProduct] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));


    const addProductToCart = async () => {
        try {
            await usersApi.post(`/api/carts/${userInfo?.cart?.cart_uuid}/items/`, {
                product_id: id,
                quantity: inCartProductQuantity,
            });
            refreshCartData();
        } catch (err) {
            console.log(err.response);
        }
    };

    const addToCartWithCartNavigation = async () => {
        await addProductToCart();
        navigate(
            "/cart",
            {
                state: {
                    alertMessage: { severity: "success", message: `${inCartProductQuantity} x ${productData?.name} Was added to Cart` },
                },
            },
        );
    };

    const buyNow = async () => {
        await addProductToCart();
        navigate({
            pathname: "/orders/checkout",
            search: createSearchParams({
                'productIds': id,
            }).toString(),
        });
    };

    const changeProductOption = (valuesToUpdate) => {
        let chosenOptionsCopy = structuredClone(chosenOptions);
        updateObject(chosenOptionsCopy, valuesToUpdate);
        let foundProduct = productVariations?.items.find((product) =>
            lodash.isEqual(chosenOptionsCopy, product.variation_attributes)
        );
        if (!foundProduct) {
            foundProduct = productVariations?.items.find((product) =>
                lodash.isMatch(product.variation_attributes, valuesToUpdate)
            );
            updateObject(chosenOptionsCopy, foundProduct?.variation_attributes);
        }

        setChosenOptions(chosenOptionsCopy);
        setCurrentImage(0);
        navigate(`/item/${foundProduct?._id}`);
    };

    const getProductById = async () => {
        setLoadingNewProduct(true);
        let successRetrieval = true;
        try {
            let response = await productsApi.get(`/api/v1/products/${id}`)
            let data = await response.data;
            setProductData(data?.item);
            setCategoryHierarchy(data?.category_hierarchy);
        } catch (e) {
            setProductNotFound(true);
            successRetrieval = false;
        }
        setLoadingNewProduct(false);
        if (userInfo?.user && successRetrieval) {
            try {
                await usersApi.post('/api/history/', { "product": id });
            } catch (e) {
                console.log("Something Went Wrong");
            }
        }
    };

    const getVariationsByProductId = async () => {
        try {
            let response = await productsApi.get(`/api/v1/products/${id}/get-variations/`)
            let data = await response.data;
            setProductVariations(data);
            setChosenOptions(data?.items.find(item => item._id === id)?.variation_attributes);
        } catch (e) {
            console.log("Variations not found");
        }
    };

    useEffect(() => {
        getProductById();
    }, [id]);

    useEffect(() => {
        getVariationsByProductId();
    }, []);

    if (productNotFound) {
        return (
            <ProductNotFoundPage
                goBack={() => navigate(-1)}
            />
        );
    }

    return (
        <Container className="MainContainer" maxWidth="xl" sx={{ padding: 2 }}>
            <Box>
                {productData && (
                    <Box>
                        <Box className='breadCrumbBox'>
                            <BreadCrumb
                                breadCrumbData={getCategoryBreadCrumbData(categoryHierarchy)}
                                typographyVariant={isMobile ? "body2" : "body1"}
                            />
                        </Box>
                        <Box sx={{
                            mt: 1,
                            display: isMobile || isTablet ? "block" : "flex",
                        }}>
                            <Container
                                className="picture-panel"
                                disableGutters
                                sx={{
                                    pt: 1, pb: 4,
                                    px: 2.5,
                                    mx: 0,
                                    boxShadow: 1,
                                    borderRadius: "15px",
                                }}
                                maxWidth={"md"}
                            >
                                <MemoizedImageViewer
                                    currentImage={currentImage}
                                    setCurrentImage={setCurrentImage}
                                    images={productData?.images}
                                />

                            </Container>
                            <Container disableGutters maxWidth="lg" className="SummaryPanel" sx={{ paddingLeft: 3 }}>
                                <SummaryPanel
                                    productName={productData?.name}
                                    isForSale={productData?.for_sale}
                                    discountedPrice={productData?.discounted_price}
                                    discountPercentage={productData?.discount_percentage}
                                    originalPrice={productData?.original_price}
                                    stock={productData?.stock}
                                    maxOrderQty={productData?.max_order_qty}
                                    inCartCount={getInCartCount()}
                                    inCartProductQuantity={inCartProductQuantity}
                                    setInCartProductQuantity={setInCartProductQuantity}
                                    isMobile={isMobile}
                                    isTablet={isTablet}
                                    addProductToCart={addToCartWithCartNavigation}
                                    buyNow={buyNow}
                                />
                            </Container>
                        </Box>

                    </Box>
                )}
                {productVariations && (
                    <Box className="item-options" sx={{ mt: 2 }}>
                        <Box>
                            <Typography variant="h5">
                                <b>Item Options</b>
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Container disableGutters maxWidth="xl">
                            {loadingNewProduct && (
                                <LinearProgress />
                            )}
                            <ProductVariationOptions
                                variationOptions={productVariations.variation_summary.variation_options}
                                chosenOptions={chosenOptions}
                                productItems={productVariations.items}
                                changeProductOption={changeProductOption}
                            />
                        </Container>
                    </Box>
                )}
                {productData && (
                    <Box className="about-this-item" sx={{ mt: 2 }}>
                        <Box>
                            <Typography variant="h5">
                                <b>About this item</b>
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Container disableGutters maxWidth="xl">
                            <Box>
                                <ProductSpecs
                                    specs={productData?.attrs}
                                    additionalInformation={[
                                        { "name": "Date First Available", "display_name": dayjs(productData?.created_at).format('LL') }
                                    ]}
                                />
                            </Box>
                        </Container>
                    </Box>
                )}

            </Box>

        </Container>
    );
};