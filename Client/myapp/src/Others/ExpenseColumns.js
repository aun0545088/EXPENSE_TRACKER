import EditExpense from "../Components/Expense/EditExpense";
import DeleteExpense from "../Components/Expense/DeleteExpense";

export const COLUMNS = [
  {
    Header: "ExpenseName",
    accessor: "expense_name",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Category",
    accessor: "category",
  },

  {
    Header: "Edit",
    Cell: EditExpense,
  },
  {
    Header: "Delete",
    Cell: DeleteExpense,
  },
];
