import { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import CountrySelect from "./CountrySelect";
import { MuiTelInput } from "mui-tel-input";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";


export default function EditAddress () {
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const addressID = urlParams.get("addressID");

    const api = useAxios();
    const navigate = useNavigate();

    const getAddress = async () => {
        try {
            let response = await api.get(`/api/addresses/${addressID}/`);
            let data = await response.data;
            setCountry(data.country.code);
            setPhoneNumber(data.phone_number);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setCity(data.city);
            setRegion(data.region);
            setStreet(data.street);
            setHouseNumber(data.house_number);
            setApartmentNumber(data.apartment_number);
            setPostalCode(data.postal_code);
        } catch (error) {
            if (error.response.status === 404) {
                navigate('/your-account/addresses');
            }
            setErrors(error.response.data);
        }
    }

    const editAddress = async () => {
        try {
            await api.put(`/api/addresses/${addressID}/`, {
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
            setErrors(error.response.data)
        }
    }

    useEffect(() => {
        if (!addressID) {
            navigate('/your-account/addresses');
        } else {
            getAddress();
        }
    }, [])

    return (
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
                <Grid container sx={{ mt: 2, maxWidth: "1000px" }} spacing={2}>
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
                        onClick={editAddress}
                        sx={{ mt: 3, borderRadius: "10px", color: "black", backgroundColor: "#ebeb05", ":hover": { backgroundColor: "#dede04" } }}>
                        Save changes
                    </Button>
                </Box>
            </Box>
    )
}