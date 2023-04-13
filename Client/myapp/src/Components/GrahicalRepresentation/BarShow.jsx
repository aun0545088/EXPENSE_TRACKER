import React from "react";
import { Box } from "@mui/material";
import {
  useGetAllExpensesQuery,
  useGetCategoriesQuery,
} from "../../app/categoryExpense/categoryExpenseApi";
import { BarChart } from "./Barchart";

const BarShow = () => {
  const { data, refetch } = useGetAllExpensesQuery();
  const { data: { data: catData } = [] } = useGetCategoriesQuery();
  // console.log(catData)
  const expData = data?.data || [];
  console.log("expData", expData);
  const labels = expData.map((expense) => expense.expense_name);
  console.log("exp", labels);
  const values = expData.map((expense) => expense.amount);
  console.log("val", values);

  return (
    <>
      <Box>
        <Box className="chart-container">
          <BarChart data={{ labels, values }} />
        </Box>
      </Box>
    </>
  );
};
export default BarShow;
