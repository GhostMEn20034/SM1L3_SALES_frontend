import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../utils/PrivateRoute";
import YourAccountPage from "../pages/Account/YourAccountPage";
import PersonalInfoPage from "../pages/Account/PersonalInfoPage";
import ChangePersonalInfoPage from "../pages/Account/ChangePersonalInfoPage";

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
        </Routes>
    );
}