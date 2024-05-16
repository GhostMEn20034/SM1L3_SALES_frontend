import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import HistoryItemPriceBox from "./HistoryItemPriceBox";
import dayjs from "dayjs";


export default function HistoryProductItem(
    {
        id, name, imageUrl,
        originalPrice, discountedPrice,
        discountPercentage, viewCount,
        lastSeen, onRemoveItem
    }
) {
    // Used to show products in the user's history
    return (
        <Box display="flex" flexDirection="column">
            <Box className="ImageSection" display="flex" justifyContent="center" alignItems="center">
                <Link component={RouterLink} to={`/item/${id}`} underline="none" color="inherit">
                    <img
                        src={imageUrl}
                        alt={name}
                        style={{ objectFit: 'scale-down', width: "250px", height: "150px" }}
                    />
                </Link>
            </Box>
            <Box className="ProductInfoSection" sx={{ mt: 1 }}>
                <Box className="TitleBox">
                    <Link component={RouterLink} to={`/item/${id}`} underline="none" color="inherit" sx={{
                        '&:hover': {
                            color: '#0073C4' // color on hover
                        }
                    }}>
                        <Typography variant="body1" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }} >
                            {name}
                        </Typography>
                    </Link>
                </Box>
                <Box className='PriceBox'>
                    <HistoryItemPriceBox
                        discountedPrice={discountedPrice}
                        discountPercentage={discountPercentage}
                        originalPrice={originalPrice}
                        showDiscountPercentage
                    />
                </Box>
            </Box>

            <Box sx={{ mt: "auto" }}>
                <Box className="ProductViewInformation">
                    <Box>
                        <Typography variant="body2">
                            You've seen this product <b>{viewCount} time(s)</b>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">
                            Last seen at: <b>{dayjs(lastSeen).format("LLL")}</b>
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Link component="button" onClick={onRemoveItem} sx={{ cursor: "pointer" }}>
                        <Typography variant="subtitle2">
                            Remove item from the history
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );

}