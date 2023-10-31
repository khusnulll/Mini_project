import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import List from "../pages/List/List";
import Add from "../pages/List/Add";
import Update from "../pages/List/Update";
import AddTarget from "../pages/Target_Amount/AddTarget";
import Edit from "../pages/Target_Amount/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/shopwise/auth/login" />
        <Route element={<List />} path="/shopwise/list" />
        <Route element={<Add />} path="/shopwise/list/Add_List" />
        <Route element={<Update />} path="/shopwise/list/update_list/:ShopWiseId" />
        <Route element={<AddTarget />} path="/shopwise/list/Add_target_amount" />
        <Route element={<Edit />} path="/shopwise/list/edit/:targetId" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
