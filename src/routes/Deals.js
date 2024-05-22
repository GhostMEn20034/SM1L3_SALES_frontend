import React from "react";
import { Route, Routes } from "react-router-dom";
import DealDetailsPage from "../pages/Deals/DealDetailsPage";

export default function DealRoutes() {
    return (
        <Routes>
            <Route path='/:id' element={
                <DealDetailsPage />
            } />
        </Routes>
    );
}