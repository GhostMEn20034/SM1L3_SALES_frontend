import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/Product/ProductListPage";


export default function ProductRoutes() {
    return (
        <Routes>
            <Route path='s' element={
                <ProductListPage />
            } />
        </Routes>
    );
}