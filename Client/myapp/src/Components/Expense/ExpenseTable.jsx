import { useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../../Others/ExpenseColumns";
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

  useEffect(() => {
    refetch();
  }, [catData]);

  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: expData,
    });

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
