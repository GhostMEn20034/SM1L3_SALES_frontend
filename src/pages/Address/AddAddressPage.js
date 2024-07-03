import { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
import AddAddress from "../../components/Address/AddAddress";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import useAxios from "../../utils/useAxios";
import { createBreadCrumbDataFromUrl } from "../../utils/breadCrumb/createBreadCrumbData";

export default function AddAddressPage() {
    const { userInfo } = useContext(UserContext);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const breadCrumbData = createBreadCrumbDataFromUrl(location.pathname);

    const api = useAxios();

    const createAddress = async ({ country, phoneNumber, firstName, lastName, city,
        region, street, houseNumber, apartmentNumber, postalCode }) => {

        try {
            await api.post('/api/addresses/', {
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

            navigate('/your-account/addresses');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <Box display="flex" justifyContent="center">
            <Box sx={{ my: 4, width: "60%" }}>
                <Box sx={{ mb: 1 }}>
                    <BreadCrumb breadCrumbData={breadCrumbData} />
                </Box>
                <Typography sx={{ mb: 1 }} variant="h4">Add a new address</Typography>
                <AddAddress
                    userInfo={userInfo}
                    errors={errors}
                    setErrors={setErrors}
                    createAddress={createAddress}
                />
            </Box>
        </Box>
    );
}