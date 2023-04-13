import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../../Others/ExpenseColumns"
import "./ExpenseTable.css";
import "./Modal.css";
import {
  useGetAllExpensesQuery,
  useGetCategoriesQuery,
} from "../../app/categoryExpense/categoryExpenseApi";




export const ExpenseTable = () => {
  const { data, refetch } = useGetAllExpensesQuery();
  const { data: { data: catData } = [] } = useGetCategoriesQuery();
  // console.log(catData)
  const expData = data?.data || [];

  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTable(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    refetch();
  }, [catData]);

  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: expData,
    });
// prepare chart data
// const chartData = useMemo(() => {
//   const categories = {};
//   expData.forEach((expense) => {
//     if (expense.category in categories) {
//       categories[expense.category] += expense.amount;
//     } else {
//       categories[expense.category] = expense.amount;
//     }
//   });

//   return {
//     labels: Object.keys(categories),
//     datasets: [
//       {
//         data: Object.values(categories),
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#8B008B",
//           "#FF00FF",
//           "#800080",
//         ],
//         hoverBackgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#8B008B",
//           "#FF00FF",
//           "#800080",
//         ],
//       },
//     ],
//   };
// }, [expData]);
  return (
    <div className="table-container">
      {/* <Doughnut data={chartData} /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render?.("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render?.("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
