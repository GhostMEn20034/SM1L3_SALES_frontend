import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";
import { Fragment } from "react";

export default function BreadCrump({ breadCrumpData }) {
    let crumbs = breadCrumpData.map((breadCrumpItem, index) => (
        <Fragment key={index}>
            <Box className="crumb">
                <Link component={index === breadCrumpData.length - 1 ? "button" : RouterLink} 
                to={breadCrumpItem.url} 
                underline={index === breadCrumpData.length - 1 ? "none" : "hover"} 
                sx={index === breadCrumpData.length - 1 ? { ":hover": { "cursor": "default" } } : {}}>
                    <Typography variant="body1">{breadCrumpItem.valueToDisplay}</Typography>
                </Link>
            </Box>
            {index < breadCrumpData.length - 1 && (
                <Box sx={{ px: 1 }} key={index}>
                    <Typography variant="body1">{">"}</Typography>
                </Box>
            )}
        </Fragment>
    ))

    return (
        <Box className="breadCrumbs" display="flex">
            {crumbs}
        </Box>
    )
}