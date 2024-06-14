import { Grid, Box, Typography, Link, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CategoryItem({ category }) {

    let nearestChildrenLength = category.nearest_children?.length;

    return (
        <Grid item lg={4} md={6} sm={12} xs={12} sx={{ display: "flex" }}>
            <Paper sx={{
                flexGrow: 1,
                display: 'flex', flexDirection: "column",
                paddingX: 1.5, paddingY: 1.5,
            }}>
                <Box>
                    <Link
                        component={RouterLink}
                        to={nearestChildrenLength ? `?parentId=${category._id}`: `/s?category=${category._id}`}
                        sx={{
                            cursor: "pointer",
                            color: 'inherit',
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            ":hover": {
                                "color": "#1976D2",
                            },
                        }}
                    >
                        <Box>
                            <Typography variant="h5">
                                <b>{category.name}</b>
                            </Typography>
                        </Box>
                        <Box ml={0.5} sx={{ textDecoration: 'none', color: 'black', }}>
                            <Typography variant="h5" sx={{ textDecoration: 'none' }}>
                                &gt;
                            </Typography>
                        </Box>
                    </Link>
                </Box>
                {nearestChildrenLength > 0 && (
                    <Box sx={{ mt: 1 }}>
                        {category.nearest_children.map((nearest_child, index) => (
                            <Box key={nearest_child._id} sx={{ mb: index === nearestChildrenLength - 1 ? 0 : 0.5 }}>
                                <Link
                                    component={RouterLink}
                                    to={`?parentId=${nearest_child._id}`}
                                    underline="hover"
                                    sx={{
                                        cursor: "pointer",
                                        color: 'inherit',
                                        textDecoration: "none",
                                    }}
                                >
                                    <Typography variant="body1">
                                        {nearest_child.name}
                                    </Typography>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>
        </Grid>
    );
}