import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetCategoriesQuery,
} from "../../app/categoryExpense/categoryExpenseApi";

const AddExpense = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [createExpense] = useCreateExpenseMutation();
  const { refetch } = useGetAllExpensesQuery();
  const { data: { data: categories } = [] } = useGetCategoriesQuery();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    await createExpense(data).unwrap();
    refetch();
    handleClose();
    reset();
  };

  return (
    <>
      <div className="modal">
        <Button
          onClick={handleClickOpen}
          startIcon={<AddCircleIcon sx={{ color: "warning !important" }} />}
          className="addButton"
          variant="outlined"
          sx={{ marginTop: "10px", borderRadius: "20px", marginBottom: "10px" }}
        >
          Add Expense
        </Button>

        <Dialog open={open} onClose={handleClose} className="dialog">
          <DialogTitle className="dialogTitle">Add Expense</DialogTitle>
          <DialogContent className="dialogContent">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                required
                label="ExpenseName"
                variant="outlined"
                placeholder="Enter Expense"
                className="textfield"
                {...register("expense_name")}
              />
              <br />
              <br />
              <TextField
                fullWidth
                required
                label="Amount"
                type="number"
                variant="outlined"
                placeholder="Enter Amount"
                className="textfield"
                {...register("amount")}
              />
              <br />
              <br />

              <Select
                label="Category"
                variant="outlined"
                className="textfield"
                fullWidth
                {...register("category", { required: true })}
                required
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category.category_name}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>

              <div className="submitButton">
                <Button
                  type="submit"
                  variant="contained"
                  className="button"
                  sx={{ marginTop: "10px", marginLeft: "220px" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="cancelButton">
              <Cancel sx={{ color: "red" }} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AddExpense;
