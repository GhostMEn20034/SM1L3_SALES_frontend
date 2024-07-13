import React from "react";
import { Route, Routes } from "react-router-dom";

import CheckoutPage from "../pages/Order/CheckoutPage";


export default function OrderRoutes() {
    return (
        <Routes>
            <Route path='checkout' element={
                <CheckoutPage />
            } />
        </Routes>
    );
}