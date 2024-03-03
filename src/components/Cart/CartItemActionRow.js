import { Box, Link, Typography } from "@mui/material";

import SelectValue from "../CommonComponents/Selectors/SelectValue";

import { range } from "../../utils/commonServices";
import { arrayToMenuItems } from "../../utils/componentServices/selectorServices";

export default function CartItemActionRow(props) {
    let stock = props.stock ? props.stock : 0;

    let maxOrderQuantity = stock > props.maxOrderQuantity ? props.maxOrderQuantity : stock;

    return (
        <Box display="flex" alignItems="center">
            <Box>
                <SelectValue value={props.itemQuantity} setValue={(value) => props.changeCartItemQuantity(props.id, Number(value))}
                    menuItems={[
                        { "name": "0 (Delete)", "value": 0 },
                        ...arrayToMenuItems(range(1, maxOrderQuantity + 1))
                    ]}
                    size={"small"}
                    label={"Quantity"}
                    styles={{ maxWidth: 350, minWidth: 75 }}

                />
            </Box>
            <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                <Link component="button" underline={"hover"} onClick={() => props.deleteCartItem(props.id)}>
                    <Typography>
                        Delete
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}