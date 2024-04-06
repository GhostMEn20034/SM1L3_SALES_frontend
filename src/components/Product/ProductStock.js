import { Typography } from "@mui/material";

export default function ProductStock (props) {
    /**
     * Component responsible for rendering product's stock
     */
    let additionalStyles = {};
    let textToRender = "";
    let stock =  typeof props.stock === 'number' ? props.stock : 0;

    if (stock < 1) {
        additionalStyles["color"] = "#B12704";
        textToRender = "Out of stock";

    } else if (stock <= 10) {
        additionalStyles["color"] = "#B12704";
        textToRender = `Only ${stock} left in stock - order soon.`;

    } else {
        additionalStyles["color"] = "#007600";
        textToRender = `In Stock`;
    }

    let textVariant = props.textVariant ? props.textVariant : "subtitle2"

    return (
        <Typography component="span" variant={textVariant} sx={{...additionalStyles }}>
            {textToRender}
        </Typography>
    );
}