import { memo, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Container,
    useTheme, useMediaQuery
} from "@mui/material";

// Custom Components and functionality or constants
import useAxios from "../../utils/useAxios";
import UserContext from "../../context/UserContext";
import { getCategoryBreadCrumbData } from "../../utils/products/productDataUtils";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import ImageViewer from "../../components/Images/ImageViewer";
import SummaryPanel from "../../components/Product/Details/SummaryPanel";


// Styles
import "../../styles/products/imageViewerStyles.css";


const MemoizedImageViewer = memo(function MemoizedImageViewer({ images, imageScrollbarHeight,
    imageBoxWidth, imageBoxHeight, }) {
    return (
        <ImageViewer images={images}
            imageScrollbarHeight={imageScrollbarHeight}
            imageBoxWidth={imageBoxWidth}
            imageBoxHeight={imageBoxHeight}
        />
    )
});


export default function ProductDetailPage() {
    let { id } = useParams();
    const { userInfo, refreshCartData } = useContext(UserContext);
    let cartItems = userInfo?.cart?.items;

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
    const [categoryHierarchy, setCategoryHierarchy] = useState(null);
    const [inCartProductQuantity, setInCartProductQuantity] = useState(getInCartCount() || 1);

    const productsApi = useAxios('products');
    const usersApi = useAxios('users');

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));


    const addProductToCart = async () => {
        try {
            await usersApi.post(`/api/carts/${userInfo?.cart?.cart_uuid}/items/`, {
                product_id: id,
                quantity: inCartProductQuantity,
            });
        } catch (err) {
            console.log(err.response);
        }
        refreshCartData();
        navigate(
            "/cart",
            {
                state: {
                    alertMessage: {severity: "success", message: `${inCartProductQuantity} x ${productData?.name} Was added to Cart`},
                },
            },
        );
    };

    const getProductById = async () => {
        try {
            let response = await productsApi.get(`/api/v1/products/${id}`)
            let data = await response.data;
            setProductData(data?.item);
            setCategoryHierarchy(data?.category_hierarchy);
        } catch (e) {
            console.log("Product not found");
        }
    };


    useEffect(() => {
        getProductById();
    }, [id]);

    return (
        <Container className="MainContainer" maxWidth="xl" sx={{ padding: 2 }}>
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
                                boxShadow: 3,
                                borderRadius: "15px",
                            }}
                            maxWidth={"md"}
                        >
                            <MemoizedImageViewer
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
                                addProductToCart={addProductToCart}
                            />
                        </Container>
                    </Box>
                </Box>
            )}
        </Container>
    );
};