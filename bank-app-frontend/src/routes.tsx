import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/customers" element={<CustomerList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;