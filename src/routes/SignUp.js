import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../pages/Auth/SignupPage";
import ConfirmSignup from "../components/Confirmation/SignupConfirmation";


export default function SignUpRoutes() {
    return (
        <Routes>
            <Route path='' element={
              <SignUpPage />
            } />
            <Route path='confirm' element={
              <ConfirmSignup />
            } />
        </Routes>
    );
}