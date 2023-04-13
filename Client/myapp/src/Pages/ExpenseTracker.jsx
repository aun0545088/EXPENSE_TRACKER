import React from "react";
import AddCategory from "../Components/Category/AddCategory";
import AddExpense from "../Components/Expense/AddExpenses";
import Navbar from "../Components/Navbar";
import TotalExpense from "../Components/Expense/TotalExpense";
import { ExpenseTable } from "../Components/Expense/ExpenseTable";
import { CategoryTable } from "../Components/Category/CategoryTable";
import BarShow from "../Components/GrahicalRepresentation/BarShow";
import DoughnutChart from "../Components/GrahicalRepresentation/DoughnutChart";

const ExpenseTracker = () => {
  return (
    <>
      <Navbar />
      <TotalExpense />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "47%",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginRight: "10px",
            marginLeft: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ margin: "0", marginBottom: "5px" }}>Categories</h3>
          <AddCategory />
          <CategoryTable />
        </div>
        <div
          style={{
            width: "47%",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ margin: "0", marginBottom: "5px" }}>Expenses</h3>
          <AddExpense />
          <ExpenseTable />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "47%",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginRight: "10px",
            marginLeft: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            height: "400px",
          }}
        >
          <DoughnutChart />
        </div>

        <div
          style={{
            width: "47%",
            maxWidth:"700px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            height: "400px",
          }}
        >
          <BarShow />
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
