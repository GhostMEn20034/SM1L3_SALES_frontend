import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ProductNotFoundPage = (
    { goBack } // Function to go back
) => {

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                404 - Product Not Found
            </Typography>
            <Typography variant="subtitle1">
                The product you are looking for does not exist or may have been moved.
            </Typography>
            <Button variant="contained" size='large' color="primary" onClick={goBack} sx={{
                mt: 3, backgroundColor: '#ebeb05',
                ":hover": { backgroundColor: "#dbdb04" },
                color: '#000000',
                borderRadius: "15px",
            }}>
                Go Back
            </Button>
        </Container>
    );
};

export default ProductNotFoundPage;