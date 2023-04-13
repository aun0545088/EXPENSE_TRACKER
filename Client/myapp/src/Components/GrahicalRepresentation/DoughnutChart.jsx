import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useGetAllExpensesQuery } from "../../app/categoryExpense/categoryExpenseApi";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const { data } = useGetAllExpensesQuery();
  //   const { data: { data: catData } = [] } = useGetCategoriesQuery();
  // console.log(catData)
  const expData = data?.data || [];

  const chartData = useMemo(() => {
    const categories = {};
    expData.forEach((expense) => {
      if (expense.category in categories) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8B008B",
            "#FF00FF",
            "#800080",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8B008B",
            "#FF00FF",
            "#800080",
          ],
        },
      ],
    };
  }, [expData]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <Doughnut data={chartData} />
    </Box>
  );
};

export default DoughnutChart;
