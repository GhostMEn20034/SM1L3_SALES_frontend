import { useLocation } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";

export default function BreadCrump({fieldNameTochange}) {
    const location = useLocation();

    const convertCrumb = (crumb) => {
        crumb = crumb.replace(/[-_]/g, " ");

        crumb = crumb.replace(/^\w/, (c) => c.toUpperCase());

        return crumb
    }

    let currentLink = '';

    let crumbs = location.pathname.split("/")
        .filter(crumb => crumb != '')
        .map((crumb, index, array) => {
            currentLink += `/${crumb}`

            if (crumb === "change") {
                crumb += " " + fieldNameTochange;
            }

            return (
                <>
                    <Box className="crumb" key={crumb}>
                        <Link component={index === array.length - 1 ? "button" : "a"} href={currentLink} underline={index === array.length - 1 ? "none" : "hover"} sx={index === array.length - 1 ? {":hover": {"cursor": "default"}} : {}}>
                            <Typography variant="body1">{convertCrumb(crumb)}</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ px: 1 }}>
                        {index < array.length - 1 && <Typography variant="body1">{">"}</Typography>}
                    </Box>
                </>
            )
        })

    return (
        <Box className="breadCrumbs" display="flex">
            {crumbs}
        </Box>
    )
}