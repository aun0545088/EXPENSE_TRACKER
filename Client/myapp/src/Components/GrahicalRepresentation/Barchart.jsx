import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export const BarChart = ({ data }) => {
  const chartData = useMemo(() => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: "Expenses",
          data: data.values,
          backgroundColor: "rgba(43,187,173,0.4)",
          borderColor: "rgba(43,187,173,1)",
          borderWidth: 1,
        },
      ],
    };
  }, [data]);
  const chartOptions = {};

  return <Bar data={chartData} options={chartOptions} />;
};
