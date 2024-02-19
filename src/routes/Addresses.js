import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../utils/PrivateRoute";
import AddressesPage from "../pages/Address/AddressesPage";
import AddAddressPage from "../pages/Address/AddAddressPage";
import EditAddressPage from "../pages/Address/EditAddressPage";

export default function AddressRoutes() {
    return (
        <Routes>
            <Route path='' element={
              <PrivateRoute>
                <AddressesPage />
              </PrivateRoute>
            } />
            <Route path='add' element={
              <PrivateRoute>
                <AddAddressPage />
              </PrivateRoute>
            } />
            <Route path='edit' element={
              <PrivateRoute>
                <EditAddressPage />
              </PrivateRoute>
            }/>
        </Routes>
    );
}