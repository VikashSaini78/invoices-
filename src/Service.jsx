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
import MasterData from "./Masters/Master/MasterData";
import Getdata from "./Masters/Master/Getdata";
import Updatedata from "./Masters/Master/Updatedta";
// import Deletdata from "./Masters/Deletdata";
import Selectdata from "./Masters/Master/Selectdata";
import Resetpass from "./Masters/Master/Resetpass";
import Users from "./Masters/Master/Users";
import Compney from "./Masters/Companey/Compney";
// import Compney from "./Companey/Compney";

function Service() {
  return (
    <>
      <Routes>
        <Route path="/invoicedetails" element={<InvoicesDetails/>} />
        <Route path="/addinvoice" element={<Addinvoice />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/taxes" element={<Taxes />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user" element={<User />} />
        <Route path="/masterdata" element={<MasterData/>} />
        <Route path="/getdata" element={<Getdata/>} />
        <Route path="/updatedata" element={<Updatedata/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/selectdata" element={<Selectdata/>} />
        <Route path="/resetpass/:id/:name" element={<Resetpass/>} />
        <Route path="/compney" element={<Compney/>} />

      </Routes>
      <Footer />
    </>
  );
}

export default Service;
