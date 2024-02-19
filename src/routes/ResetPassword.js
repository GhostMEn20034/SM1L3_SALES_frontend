import React from "react";
import { Route, Routes } from "react-router-dom";
import { ResetPasswordEnterEmail } from "../components/Auth/ResetPasswordComponents";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";


export default function ResetPasswordRoutes() {
    return (
        <Routes>
            <Route path='request' element={
              <ResetPasswordEnterEmail />
            } />
            <Route path='confirm' element={
              <ResetPasswordPage />
            } />
        </Routes>
    );
}