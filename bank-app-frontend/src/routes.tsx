import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Navbar from './components/NavbarComponent';
import AccountList from './components/AccountComponent';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/accounts" element={<AccountList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;