import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from '@app/Layout';

import { Home } from '@pages/Home';
import { NoPage } from '@pages/404';
import { Client } from '@pages/Client';
import { Order } from '@pages/Order';
import { Admin } from '@pages/Admin';



function Routing() {
    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Home page */}
                    <Route path="" element={<Home />} />

                    {/* Pages */}
                    {/* -- Client page */}
                    <Route path="/client" element={<Client />} />
                    <Route path="/client/order/:orderAction" element={<Order />} />

                    {/* -- Admin page */}
                    <Route path="/admin" element={<Admin />} />


                    {/*     ... */}

                    {/* System pages */}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default Routing;
