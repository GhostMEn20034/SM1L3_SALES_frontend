import { Box, Container, Grid, Button, CircularProgress } from "@mui/material";
import useAxios from "../../utils/useAxios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import UserContext from "../../context/UserContext";
import CheckoutStepper from "../../components/Order/Checkout/CheckoutStepper";
import BrandLogo from "../../components/Order/Checkout/BrandLogo";
import CheckoutTitle from "../../components/Order/Checkout/CheckoutTitle";
import OrderSummary from "../../components/Order/Checkout/OrderSummary";
import ProductsOverview from "../../components/Order/Checkout/ProductsOverview";
import ShippingAdddressStep from "../../components/Order/Checkout/ShippingAdddressStep";
import PaymentMethods from "../../components/Order/Checkout/PaymentMethods";
import CompleteOrderStep from "../../components/Order/Checkout/CompleteOrderStep";

import { calculateTotalItemsPrice } from "../../utils/order/priceCalculation";



export default function CheckoutPage() {
    const { userInfo } = useContext(UserContext);

    const [searchParams] = useSearchParams();
    const steps = ['Selected products overview', 'Shipping address', 'Payment method', 'Complete the order'];

    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [orderSummary, setOrderSummary] = useState(null);
    const [cartItems, setCartItems] = useState(null);

    const [addresses, setAddresses] = useState(null);
    const [chosenAddress, setChosenAddress] = useState(null); // An Address identifier
    const [chosenAddressDisplayName, setChosenAddressDisplayName] = useState(null); // User-friendly representaion of the shipping address

    const [addressErrors, setAddressErrors] = useState({});
    const [createOrderLoading, setCreateOrderLoading] = useState(false);
    const [creationEssentialsLoading, setCreationEssentialsLoading] = useState(false);

    const [skipped, setSkipped] = useState(new Set());

    const navigate = useNavigate();
    const ordersApi = useAxios("orders");
    const usersApi = useAxios("users");

    let productIds = searchParams.get("productIds");
    productIds = productIds ? productIds.split(",") : null;

    // Function to create a payment and an order
    const createOrderAndPayment = async () => {
        let body = {
            address_id: chosenAddress,
            product_ids: productIds,
            payment_method: paymentMethod,
        };

        setCreateOrderLoading(true);

        try {
            let response = await ordersApi.post("/api/v1/orders/", body);
            let data = await response.data;
            window.location.assign(data.checkout_link);
        } catch (e) {
            console.log(e.response.data);
            console.log("Unable to create an order");
        }

        setCreateOrderLoading(false);
    };

    // Function to get all essentials to create an order
    const getOrderCreationEssentials = async () => {
        setCreationEssentialsLoading(true);
        let cartItemsParams = {
            product_ids: searchParams.get("productIds"),
        };

        try {
            let ordersApiResponse = await ordersApi.get("/api/v1/orders/creation-essentials/",);
            let ordersApiData = await ordersApiResponse.data;

            let usersApiResponse = await usersApi.get(`/api/carts/${userInfo?.cart?.cart_uuid}/items/`,
                { params: cartItemsParams });
            let retrievedCartItems = await usersApiResponse.data;

            setCartItems(retrievedCartItems);
            setOrderSummary(retrievedCartItems ? calculateTotalItemsPrice(retrievedCartItems) : []);

            setAddresses(ordersApiData?.addresses);
            if (ordersApiData?.addresses?.length > 0) {
                setChosenAddress(ordersApiData.addresses[0].id);
                setChosenAddressDisplayName(ordersApiData.addresses[0].oneline_repr);
            }

        } catch (e) {
            console.log("Unable to get addresses and cart items");
        }
        setCreationEssentialsLoading(false);
    };

    // Function to create shipping address
    const createAddress = async ({ country, phoneNumber, firstName, lastName, city,
        region, street, houseNumber, apartmentNumber, postalCode }, onSuccess, onFail) => {

        try {
            let response = await usersApi.post('/api/addresses/', {
                country: country,
                phone_number: phoneNumber,
                first_name: firstName,
                last_name: lastName,
                city: city,
                region: region,
                street: street,
                house_number: houseNumber,
                apartment_number: apartmentNumber,
                postal_code: postalCode
            });
            let data = await response.data;
            setAddresses((prevValues) => [...prevValues, data]);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setAddressErrors(error.response.data);
            if (onFail) {
                onFail();
            }
        }
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNextStep = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleStepBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    let cartItemLength = cartItems?.length;

    const stepToComponentMapping = {
        0: (cartItems && (
            <Box>
                <Box>
                    <ProductsOverview
                        cartItems={cartItems}
                        creationEssentialsLoading={creationEssentialsLoading}
                        cartItemLength={cartItemLength}
                    />
                </Box>
                <Box my={2} display="flex" justifyContent="end">
                    <Button
                        onClick={handleNextStep}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ebeb05',
                            ":hover": { backgroundColor: "#dbdb04" },
                            color: '#000000',
                            borderRadius: "15px",
                        }}>
                        Next
                    </Button>
                </Box>
            </Box>
        )
        ),
        1: (addresses && (
            <Box>
                <Box>
                    <ShippingAdddressStep
                        userInfo={userInfo}
                        addresses={addresses}
                        chosenAddress={chosenAddress}
                        setChosenAddress={(value) => {
                            setChosenAddress(value);
                            setChosenAddressDisplayName(addresses.find(address => address.id === Number(value)).oneline_repr)
                        }}
                        createAddress={createAddress}
                        addressErrors={addressErrors}
                        setAddressErrors={setAddressErrors}
                    />
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Box>
                        <Button
                            onClick={handleStepBack}
                            variant="outlined"
                            sx={{
                                borderRadius: "15px",
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                    {chosenAddress && (
                        <Box>
                            <Button
                                onClick={handleNextStep}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ebeb05',
                                    ":hover": { backgroundColor: "#dbdb04" },
                                    color: '#000000',
                                    borderRadius: "15px",
                                }}>
                                Next
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        )
        ),
        2: (
            <Box>
                <Box>
                    <PaymentMethods
                        paymentMethod={paymentMethod}
                        choosePaymentMethod={(value) => setPaymentMethod(value)}
                    />
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Box>
                        <Button
                            onClick={handleStepBack}
                            variant="outlined"
                            sx={{
                                borderRadius: "15px",
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                    {paymentMethod && (
                        <Box>
                            <Button
                                onClick={handleNextStep}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ebeb05',
                                    ":hover": { backgroundColor: "#dbdb04" },
                                    color: '#000000',
                                    borderRadius: "15px",
                                }}>
                                Next
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        ),
        3: (
            <Box>
                <Box>
                    <CompleteOrderStep
                        paymentMethod={paymentMethod}
                        address={chosenAddressDisplayName}
                        completePayment={createOrderAndPayment}
                    />
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Box>
                        <Button
                            onClick={handleStepBack}
                            variant="outlined"
                            sx={{
                                borderRadius: "15px",
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    };

    useEffect(() => {
        if (userInfo) {
            getOrderCreationEssentials();
        }

    }, [userInfo]);

    if (createOrderLoading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{
            py: 1
        }}>
            <Box sx={{
                mb: 3, display: "flex",
                alignItems: "center", justifyContent: "center"
            }}>
                <Box alignSelf="flex-start">
                    <BrandLogo />
                </Box>
                <Box sx={{ margin: "auto" }}>
                    <CheckoutTitle
                        onSubmit={() => navigate("/cart")}
                        cartItemsLength={0 || cartItemLength}
                    />
                </Box>
            </Box>
            <Box mb={3}>
                <CheckoutStepper
                    activeStep={activeStep}
                    isStepSkipped={isStepSkipped}
                    steps={steps} />
            </Box>
            <Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={9}>
                        <Box className="currentStep" sx={{ mt: 2 }}>
                            {stepToComponentMapping[activeStep]}
                        </Box>
                    </Grid>
                    {cartItems && (
                        <Grid item xs={12} md={3}>
                            <OrderSummary
                                totalItemsPrice={orderSummary?.totalItemsPrice}
                                totalTax={orderSummary?.totalTax}
                                priceAndTaxSum={orderSummary?.priceAndTaxSum}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>


        </Container>
    );
}