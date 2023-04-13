import { Box } from "@mui/material";
import React from "react";
import { useGetAllExpensesQuery } from "../../app/categoryExpense/categoryExpenseApi";

const TotalExpense = () => {
  // assuming useGetAllExpensesQuery returns an array of expenses
  const { data: { data: response } = [] } = useGetAllExpensesQuery();
  // console.log("tdata",response)

  // calculate total expense
  const totalExpense = response?.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  // const totalExpense  = 10
  return (
    <Box
      sx={{
        backgroundColor: "#e46050",
        color: "white",
        padding: "10px",
        width: "fit-content",
        borderRadius: "10px",
        margin: "0 auto",
        marginTop: "15px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "20px",
      }}
    >
      Total Expense: ${totalExpense}
    </Box>
  );
};

export default TotalExpense;
