import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";


export default function ProductRoutes() {
    return (
        <Routes>
            <Route path='s' element={
                <ProductListPage />
            } />
             <Route path='item/:id' element={
                <ProductDetailPage />
            } />
        </Routes>
    );
}