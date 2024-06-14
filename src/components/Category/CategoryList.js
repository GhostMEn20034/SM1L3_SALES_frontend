import { Grid } from "@mui/material";

import CategoryItem from "./CategoryItem";

export default function CategoryList({ categories }) {
    return (
        <Grid container spacing={4}>
            {categories.map((category) => (
                <CategoryItem
                    category={category}
                    key={category._id} 
                />
            ))}
        </Grid>
    );
}