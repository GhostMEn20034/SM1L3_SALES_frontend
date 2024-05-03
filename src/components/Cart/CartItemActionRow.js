import { Box, Link, Typography } from "@mui/material";

import SelectValue from "../CommonComponents/Selectors/SelectValue";

import { range } from "../../utils/commonServices";
import { arrayToMenuItems } from "../../utils/componentServices/selectorServices";

export default function CartItemActionRow(props) {
    let {
        id,
        maxOrderQuantity,
        stock = 0,
        productName,
        itemQuantity,
        changeCartItemQuantity,
        
        deleteCartItem,
    } = props;

    maxOrderQuantity = stock > maxOrderQuantity ? maxOrderQuantity : stock;

    return (
        <Box display="flex" alignItems="center">
            <Box>
                <SelectValue value={itemQuantity} setValue={(value) => changeCartItemQuantity(id, Number(value), productName)}
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
                <Link component="button" underline={"hover"} onClick={() => deleteCartItem(id, productName)}>
                    <Typography>
                        Delete
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}