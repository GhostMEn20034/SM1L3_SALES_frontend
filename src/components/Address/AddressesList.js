import { Paper, Box, Typography, Grid, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import useAxios from "../../utils/useAxios";
import DeleteAddress from "./DeleteAddress";

export default function AddressesList() {
    const [open, setOpen] = useState(false); // Defines whether DeleteAddress dialog window opened
    const [choosenID, setChoosenID] = useState(null); // ID of the object to delete
    const [addresses, setAddresses] = useState([]);

    const api = useAxios();
    const navigate = useNavigate()

    const handleEditButton = id => {
        navigate({pathname: 'edit', search: `?addressID=${id}`})
    }

    const handleDeleteButton= (id) => {
        setChoosenID(id);
        setOpen(true);
    }

    const handleSubmitRemoval = async (id) => {
        try {
            let response = await api.delete(`/api/addresses/${id}/`)
            if (response.status === 204) {
                getAddresses();
                setOpen(false);
            }
        } catch (error) {
            console.log("Something went wrong");
        }
    }



    const getAddresses = async () => {
        try {
            let response = await api.get('/api/addresses/');
            let data = await response.data;
            setAddresses(data);
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    useEffect(() => {
        getAddresses();
    }, [])

    return (
        <>
            <Box>
                {open && choosenID && (
                    <DeleteAddress open={open} setOpen={setOpen} onSubmit={handleSubmitRemoval} address={addresses.find(address => address.id === choosenID)} />
                )}
                <Grid container gap={2}>
                    <Grid item xs={3.15}>
                        <Link to="add" style={{ textDecoration: 'none' }}>
                            <Paper sx={{ height: "250px", width: "300px", borderRadius: "10px" }} elevation={3}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    height="100%"
                                >
                                    <Box>
                                        <Box display="flex"
                                            alignItems="center"
                                            justifyContent="center">
                                            <AddIcon fontSize="large" sx={{
                                                strokeWidth: 2,
                                                fontSize: 50,
                                                color: "grey"
                                            }} />
                                        </Box>
                                        <Typography variant="h4">Add address</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Link>
                    </Grid>
                    {addresses.map((address, index) => (
                        <Grid item key={index} xs={3.15}>
                            <Paper sx={{ height: "250px", width: "300px", borderRadius: "10px" }} elevation={3}>
                                <Box padding={3}>
                                    <Box>
                                        <Typography variant="subtitle1"><b>{address.first_name} {address.last_name}</b></Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1">{address.house_number} {address.street}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1">{address.city}, {address.region} {address.postal_code}</Typography>
                                    </Box>
                                    {address.apartment_number && (
                                    <Box>
                                        <Typography variant="subtitle1">Apartment number: {address.apartment_number}</Typography>
                                    </Box>
                                    )}
                                    <Box>
                                        <Typography variant="subtitle1">{address.country.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1">Phone number: {address.phone_number}</Typography>
                                    </Box>

                                    <Box sx={{mt: address.apartment_number !== "" ? 1 : 4}}>
                                    <IconButton onClick={() => handleEditButton(address.id)}>
                                        <ModeEditOutlineOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteButton(address.id)}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                    
                </Grid>
            </Box>
        </>
    )
}
