import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";
import { Fragment } from "react";

export default function BreadCrumb({ breadCrumbData }) {
    let crumbs = breadCrumbData.map((breadCrumbItem, index) => (
        <Fragment key={index}>
            <Box className="crumb">
                <Link component={breadCrumbItem?.disabled ? "button" : RouterLink} 
                to={breadCrumbItem.url} 
                underline={breadCrumbItem?.disabled ? "none" : "hover"} 
                sx={breadCrumbItem?.disabled ? { ":hover": { "cursor": "default" } } : {}}>
                    <Typography variant="body1">{breadCrumbItem.valueToDisplay}</Typography>
                </Link>
            </Box>
            {index < breadCrumbData.length - 1 && (
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