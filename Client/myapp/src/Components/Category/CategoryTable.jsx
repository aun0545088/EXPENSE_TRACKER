import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { FadeLoader } from "react-spinners";
import { COLUMNS } from "../../Others/CategoryColumns";
import "./CategoryTable.css";
import "./Modal.css";
import { useGetCategoriesQuery } from "../../app/categoryExpense/categoryExpenseApi";

export const CategoryTable = () => {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery();
  // console.log(data)
  const catData = data?.data || [];
  // console.log(catData)

  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTable(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: catData,
    });

  return (
    <div className="table-container">
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
