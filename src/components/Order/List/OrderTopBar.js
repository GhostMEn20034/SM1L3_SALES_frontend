import { Box, Link, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

import HtmlTooltip from '../../CommonComponents/HtmlTooltip';
import { currencySymbol } from '../../../utils/consts';
import { Fragment } from "react";



export default function OrderTopBar({ orderId, createdAt, totalAmount, addressOnelineRepr, addressId }) {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={isTablet ? 'column' : 'row'}
            sx={{ paddingX: 2, paddingBottom: 0.5 }}
        >
            <Box>
                <Grid container alignItems="center">
                    <Grid item xs={isTablet ? 6 : 12}>
                        <Typography variant="overline">
                            <b>Order Placed</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={isTablet ? 6 : 12}>
                        <Typography variant="body2">
                            {dayjs(createdAt).format("LL")}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container alignItems="center">
                    <Grid item xs={isTablet ? 6 : 12}>
                        <Typography variant="overline">
                            <b>Total</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={isTablet ? 6 : 12}>
                        <Typography variant="body2">
                            {currencySymbol}{totalAmount}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container alignItems="center">
                    <Grid item xs={isTablet ? 6 : 12}>
                        <Typography variant="overline">
                            <b>Address</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={isTablet ? 6 : 12}>
                        <Link
                            component={RouterLink}
                            to={`/your-account/addresses/edit?addressID=${addressId}`}
                            underline="hover"
                        >
                            <Typography variant="body2">
                                {addressOnelineRepr}
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <HtmlTooltip
                    title={
                        <Fragment>
                            <Typography variant="overline" padding={0}>
                                <b>{orderId}</b>
                            </Typography>
                        </Fragment>
                    }
                    arrow
                    disableHoverListener={isTablet}
                >
                    <Box>
                        <Typography variant="overline" padding={0} sx={{ ":hover": { "cursor": isTablet ? "default" : "pointer" } }}>
                            <b>Order # {!isTablet ? `${orderId.slice(0, 10)}...` : orderId}</b>
                        </Typography>
                    </Box>
                </HtmlTooltip>
                <Box>
                    <Link component={RouterLink} underline="hover" to={`${orderId}`}>
                        <Typography variant="body2">
                            View Order Details
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}