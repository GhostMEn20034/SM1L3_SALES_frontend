import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";

export default function BreadCrumb({ breadCrumbData, typographyVariant = "body1" }) {
    let crumbs = breadCrumbData.map((breadCrumbItem, index) => (
        <Box display="inline-flex" key={index}>
            <Box className="crumb">
                <Link component={breadCrumbItem?.disabled ? "button" : RouterLink}
                    to={breadCrumbItem.url}
                    underline={breadCrumbItem?.disabled ? "none" : "hover"}
                    sx={breadCrumbItem?.disabled ? { ":hover": { "cursor": "default" } } : {}}>
                    <Typography variant={typographyVariant}>{breadCrumbItem.valueToDisplay}</Typography>
                </Link>
            </Box>
            {index < breadCrumbData.length - 1 && (
                <Box sx={{ px: 1 }} key={index}>
                    <Typography variant={typographyVariant}>{">"}</Typography>
                </Box>
            )}
        </Box>
    ))

    return (
        <Box className="breadCrumbs" display="flex">
            {crumbs}
        </Box>
    )
}