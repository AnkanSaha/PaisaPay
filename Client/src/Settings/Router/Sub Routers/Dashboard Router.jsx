import React from "react"; // import react
import { Routes, Route } from "react-router-dom"; // import the routes component from react-router-dom

// No Page Found Component
import PageNotFound from "@page/Common Pages/Page Not Found"; // import the not logged in and offline page for No Page Found error


// import Components & Pages
import Dashboard from "@page/Dashboard Pages/Dashboard"; // import the dashboard page
import ViewQRCode from "@page/Dashboard Pages/QR Code View"; // import the view qr code page
import AddMoney from "@page/Dashboard Pages/Add Money"; // import the add money page
import PaymentHistory from "@page/Dashboard Pages/Payment History"; // import the payment history page
import SendMoney from "@page/Dashboard Pages/Send Money"; // import the send money page
import Withdrawal from "@page/Dashboard Pages/Withdrawal"; // import the withdrawal page

export default function DashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/QR-Code' element={<ViewQRCode />} />
            <Route path='/add-funds' element={<AddMoney />} />
            <Route path='/Transactions-history' element={<PaymentHistory />} />
            <Route path='/send-money' element={<SendMoney />} />
            <Route path='/withdraw-funds' element={<Withdrawal />} />
            <Route path="*" element={<PageNotFound Status="No Page Found" Message="Seems like the page you are looking for is not available. Please check the URL and try again." ButtonText="Go Home" ButtonLink="/" />} />
        </Routes>
    ); // return the dashboard router
} // export the dashboard router