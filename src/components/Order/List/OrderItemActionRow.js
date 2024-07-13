import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function OrderItemActionRow({ itemId }) {
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            sx={{ gap: 1.5 }} // gap between buttons
        >
            <Button
                variant="contained"
                size="small"
                sx={{
                    backgroundColor: '#ebeb05',
                    ":hover": { backgroundColor: "#dbdb04" },
                    color: '#000000',
                    borderRadius: "15px",
                    minWidth: '100px', // ensure it wraps if space is small
                    maxWidth: '150px',
                    flexGrow: 1
                }}
            >
                Buy it Again
            </Button>
            <Link component={RouterLink} underline='none' to={`/item/${itemId}`}>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        borderRadius: "15px",
                        minWidth: '100px', // ensure it wraps if space is small
                        maxWidth: '150px',
                        flexGrow: 1
                    }}
                >
                    View your item
                </Button>
            </Link>
        </Box>
    );
}
