import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../utils/PrivateRoute";
import YourAccountPage from "../pages/Account/YourAccountPage";
import PersonalInfoPage from "../pages/Account/PersonalInfoPage";
import ChangePersonalInfoPage from "../pages/Account/ChangePersonalInfoPage";
import HistoryPage from "../pages/Account/HistoryPage";
import OrderListPage from "../pages/Order/OrderListPage";
import ArchivedOrdersListPage from "../pages/Order/ArchivedOrdersListPage";
import OrderDetailsPage from "../pages/Order/OrderDetailsPage";

export default function AccountRoutes() {
    return (
        <Routes>
            <Route path='' element={
                <PrivateRoute>
                    <YourAccountPage />
                </PrivateRoute>
            } />
            <Route path='personal-information' element={
                <PrivateRoute>
                    <PersonalInfoPage />
                </PrivateRoute>
            } />
            <Route path='personal-information/change' element={
                <PrivateRoute>
                    <ChangePersonalInfoPage />
                </PrivateRoute>
            } />
            <Route path='/recently-viewed-items' element={
                <PrivateRoute>
                    <HistoryPage />
                </PrivateRoute>
            } />
            <Route path='order-history/' element={
                <PrivateRoute>
                    <OrderListPage />
                </PrivateRoute>
            } />
            <Route path='order-history/:id' element={
                <PrivateRoute>
                    <OrderDetailsPage />
                </PrivateRoute>
            } />
            <Route path='archived-orders/' element={
                <PrivateRoute>
                    <ArchivedOrdersListPage />
                </PrivateRoute>
            } />
            <Route path='archived-orders/:id' element={
                <PrivateRoute>
                    <OrderDetailsPage />
                </PrivateRoute>
            } />
        </Routes>
    );
}