import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function DealItem({ id, name, isParent, queryString, buttonText, image }) {
    return (
        <Box display="flex" flexDirection="column" paddingX={1.2}>
            <Box paddingY={0.5}>
                <Typography variant="h6" fontWeight={700}>
                    {name}
                </Typography>
            </Box>

            <Box
                height="100%"
                display="flex"
            >
                <Link 
                    component={RouterLink} 
                    to={isParent ? `/deals/${id}` : `/s?${queryString}`}
                    display="flex"
                    flexDirection="column"
                    underline="hover"
                >
                    <Box
                        className="ImageSection"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginTop={"auto"}
                    >
                        <img
                            src={image}
                            alt={name}
                            style={{ objectFit: 'scale-down', width: "100%", height: "100%" }}
                        />
                    </Box>
                    <Box marginTop="auto" paddingY={1}>
                        <Typography variant="body1">
                            {buttonText}
                        </Typography>
                    </Box>
                </Link>
            </Box>

        </Box >
    );
}