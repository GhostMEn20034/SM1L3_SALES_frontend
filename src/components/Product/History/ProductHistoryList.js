import { Grid, Paper } from "@mui/material";
import HistoryProductItem from "./HistoryProductItem";

export default function ProductHistoryList({ recentlyViewedItems, removeItemFromHistory }) {
    return (
        <Grid container spacing={4}>
            {recentlyViewedItems.map((recentlyViewedItem, index) => (
                <Grid item lg={4} md={4} sm={6} xs={12} key={index} sx={{ display: "flex" }}>
                    <Paper sx={{
                        flexGrow: 1, display: 'flex',
                        paddingX: 1,
                        paddingY: 1.5,
                    }}>
                        <HistoryProductItem
                            id={recentlyViewedItem?.item?.object_id}
                            name={recentlyViewedItem?.item?.name}
                            imageUrl={recentlyViewedItem?.item?.image}
                            originalPrice={recentlyViewedItem?.item?.price}
                            discountedPrice={recentlyViewedItem?.item?.discounted_price}
                            discountPercentage={
                                recentlyViewedItem?.item?.discount_percentage > 0 ?
                                    recentlyViewedItem?.item?.discount_percentage :
                                    null
                            }
                            viewCount={recentlyViewedItem?.view_count}
                            lastSeen={recentlyViewedItem?.last_seen}
                            onRemoveItem={() => removeItemFromHistory(recentlyViewedItem?.id)}
                        />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}