import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetAllExpensesQuery,
  useGetCategoriesQuery,
  useGetExpenseByIdQuery,
  useUpdateExpenseByIdMutation,
} from "../../app/categoryExpense/categoryExpenseApi";
import { MenuItem, Select } from "@mui/material";

export default function EditExpense({ cell }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    expense_name: "",
    amount: "",
    category: "",
  });
  const exp_id = cell.row.original._id;
  // console.log(exp_id)
  const { data: { data: singleExpense } = {} } = useGetExpenseByIdQuery(
    exp_id,
    {
      skip: !exp_id,
    }
  );
  // console.log(singleExpense)
  const [updateExpenseById] = useUpdateExpenseByIdMutation();
  const { refetch } = useGetAllExpensesQuery();
  const { data: { data: categories } = [] } = useGetCategoriesQuery();
  // console.log("catdata", categories);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpenseById({ expenseId: singleExpense._id, expense: formData })
      .unwrap()
      .then(() => {
        refetch();
        handleClose();
      });
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ...singleExpense,
    }));
  }, [singleExpense]);

  return (
    <>
      <Button onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ExpenseName"
              variant="outlined"
              name="expense_name"
              value={formData.expense_name}
              fullWidth
              required
              onChange={handleChange}
            />
            <br />
            <br />
            <TextField
              label="Amount"
              variant="outlined"
              name="amount"
              value={formData.amount}
              fullWidth
              required
              onChange={handleChange}
            />
            <br />
            <br />

            <Select
              label="Category"
              variant="outlined"
              name="category"
              value={formData.category}
              fullWidth
              required
              onChange={handleChange}
            >
              {categories?.map((category) => (
                <MenuItem key={category._id} value={category.category_name}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
