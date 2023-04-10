import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ExpenseTracker from "./ExpenseTracker";
import ReqAuth from "../Components/ReqAuth";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/expense-tracker"
          element={
            <ReqAuth>
              <ExpenseTracker />
            </ReqAuth>
          }
        />
      </Routes>
    </>
  );
};

export default MainRoutes;
