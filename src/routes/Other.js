import { Routes, Route } from "react-router-dom";

import BuyAgainPage from "../pages/Other/BuyAgainPage";
import PrivateRoute from "../utils/PrivateRoute";

export default function OtherRoutes() {

    return (
        <Routes>
            <Route path='buyagain' element={
                <PrivateRoute>
                    <BuyAgainPage />
                </PrivateRoute>
            } />
        </Routes>
    )
}