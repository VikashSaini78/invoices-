import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./Products/ProductList";
import Taxes from "./Component/Taxes/Taxes";
import Payment from "./Component/Payments/Payment";
import Dashboard from "./Component/main_contant/Dashboard";
import Invoice from "./Component/Invoices Management/Invoice";
import User from "./Component/User/User";
import Footer from "./Component/Footer/Footer";
import Signin from "./Authentication/Sign_in/Signin";
import Signup from "./Authentication/sigin up/Signup";
import Addinvoice from "./Component/Add invoice/Addinvoice";
import InvoicesDetails from "./Component/Invoices Details/InvoicesDetails";
import MasterData from "./Masters/MasterData";
import Getdata from "./Masters/Getdata";
import Updatedata from "./Masters/Updatedta";
import Deletdata from "./Masters/Deletdata";
import Selectdata from "./Masters/Selectdata";

function Service() {
  return (
    <>
      <Routes>
        <Route path="/invoicedetails" element={<InvoicesDetails/>} />
        <Route path="/addinvoice" element={<Addinvoice />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/taxes" element={<Taxes />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user" element={<User />} />
        <Route path="/masterdata" element={<MasterData/>} />
        <Route path="/getdata" element={<Getdata/>} />
        <Route path="/updatedata" element={<Updatedata/>} />
        <Route path="/deletdata" element={<Deletdata/>} />
        <Route path="/selectdata" element={<Selectdata/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default Service;
