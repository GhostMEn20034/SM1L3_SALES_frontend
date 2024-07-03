import { Divider, List, ListItem } from "@mui/material";

import CartItem from "./CartItem";
import { Fragment } from "react";


export default function CartItemList(props) {

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.cartItems.map((cartItem) => (
                <Fragment key={cartItem.id}>
                    <ListItem>
                            <CartItem
                                product={cartItem.product}
                                checkedCartItems={props.checkedCartItems}
                                id={cartItem.id}
                                itemQuantity={cartItem.quantity}
                                checkCartItem={props.checkCartItem}
                                changeCartItemQuantity={props.changeCartItemQuantity}
                                deleteCartItem={props.deleteCartItem}
                            />
                    </ListItem>
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
}