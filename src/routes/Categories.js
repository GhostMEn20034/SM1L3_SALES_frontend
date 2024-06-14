import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopByCategoryPage from "../pages/Category/ShopByCategoryPage";

export default function CategoryRoutes() {
    return (
        <Routes>
            <Route path='' element={
                <ShopByCategoryPage />
            } />
        </Routes>
    );
}