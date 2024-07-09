import React from "react";
import { Route, Routes } from "react-router-dom";
import SuccessPaymentPage from "../pages/Payment/SuccessPaymentPage";
import CancelledPaymentPage from "../pages/Payment/CancelledPaymentPage";

export default function PaymentRoutes() {
    return (
        <Routes>
            <Route path='success' element={
                <SuccessPaymentPage />
            } />
            <Route path='canceled' element={
                <CancelledPaymentPage />
            } />
        </Routes>
    );
}