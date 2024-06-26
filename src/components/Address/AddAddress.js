import { useState, useEffect, useContext } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import CountrySelect from "./CountrySelect";
import { MuiTelInput } from "mui-tel-input";
import UserContext from "../../context/UserContext";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";

export default function AddAddress() {
    const { userInfo } = useContext(UserContext);

    const [errors, setErrors] = useState({});
    const [country, setCountry] = useState("AT");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [apartmentNumber, setApartmentNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const fields = [
        { id: "first_name", label: "First name", value: firstName, onChange: setFirstName },
        { id: "last_name", label: "Last name", value: lastName, onChange: setLastName },
        { id: "city", label: "City", value: city, onChange: setCity },
        { id: "region", label: "Region (Optional)", value: region, onChange: setRegion },
        { id: "street", label: "Street", value: street, onChange: setStreet },
        { id: "house_number", label: "House number", value: houseNumber, onChange: setHouseNumber },
        { id: "apartment number", label: "Apartment number (Optional)", value: apartmentNumber, onChange: setApartmentNumber },
        { id: "postal_code", label: "Postal code", value: postalCode, onChange: setPostalCode },
    ];

    const api = useAxios();
    const navigate = useNavigate();

    const createAddress = async () => {
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
    }

    useEffect(() => {
        if (userInfo?.user && Object.keys(userInfo.user).length > 0) {
            setFirstName(userInfo.user.first_name);
            setLastName(userInfo.user.last_name);
            setPhoneNumber(userInfo.user.phone_number);
        }
    }, [userInfo]);

    return (
        <>
            <Box sx={{ mt: 2 }}>
                <Box sx={{maxWidth: 315}}>
                    <CountrySelect value={country} setValue={setCountry} />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <MuiTelInput value={phoneNumber} onChange={(NewValue) => {
                        setPhoneNumber(NewValue);
                        if (errors) {
                            setErrors({});
                        }
                    }} size="small" label="Phone number" id='phone_number'
                        forceCallingCode defaultCountry='UA' error={errors["phone_number"] !== undefined} helperText={errors ? errors["phone_number"] : ""} />
                </Box>
                <Box>
                    <Typography variant="subtitle2">
                        May be used to assist delivery
                    </Typography>
                </Box>
                <Grid container sx={{ mt: 1, maxWidth: "1000px" }} spacing={2} >
                    {fields.map(field => (
                        <Grid item key={field.label} md={6} sm={12} xs={12}>
                            <TextField id={field.id} label={field.label} error={errors[field.id] !== undefined} helperText={errors ? errors[field.id] : ""}
                                value={field.value} onChange={
                                    (e) => {
                                        field.onChange(e.target.value);
                                        if (errors) {
                                            setErrors({});
                                        }

                                    }
                                }
                                size="small" fullWidth />
                        </Grid>
                    ))}
                </Grid>
                <Box>
                    <Button
                        onClick={createAddress}
                        sx={{ mt: 3, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>
                        Add address
                    </Button>
                </Box>
            </Box>
        </>
    )
}