import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Navbar from './components/NavbarComponent';
import AccountList from './components/AccountComponent';
import Home from './components/Home';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/accounts" element={<AccountList />} />
                <Route path="/home" element={<Home />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;