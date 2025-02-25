import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Navbar from './components/NavbarComponent';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/customers" element={<CustomerList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;