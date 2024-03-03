import React from "react";
import { Route, Routes } from "react-router-dom";
import CartItemListPage from "../pages/Cart/CartItemListPage";

export default function CartRoutes() {
    return (
        <Routes>
            <Route path='' element={
                <CartItemListPage />
            } />
        </Routes>
    );
}