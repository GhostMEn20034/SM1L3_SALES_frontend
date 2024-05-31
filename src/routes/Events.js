import React from "react";
import { Route, Routes } from "react-router-dom";
import EventListPage from "../pages/Event/EventListPage";
import EventDetailsPage from "../pages/Event/EventDetailsPage";

export default function EventRoutes() {
    return (
        <Routes>
            <Route path='' element={
                <EventListPage />
            } />
            <Route path=':id' element={
                <EventDetailsPage />
            } />
        </Routes>
    );
}
