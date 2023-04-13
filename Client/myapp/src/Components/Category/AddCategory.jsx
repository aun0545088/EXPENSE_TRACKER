import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../../app/categoryExpense/categoryExpenseApi";

const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [createCategory] = useCreateCategoryMutation();
  const { refetch } = useGetCategoriesQuery();
  // const userId = getLocalData("userId")
  //console.log(userId)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    await createCategory(data).unwrap();
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
          Add Category
        </Button>

        <Dialog open={open} onClose={handleClose} className="dialog">
          <DialogTitle className="dialogTitle">Add Category</DialogTitle>
          <DialogContent className="dialogContent">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                required
                label="CategoryName"
                variant="outlined"
                placeholder="Enter ID"
                className="textfield"
                {...register("category_name")}
              />

              <div className="submitButton">
                <Button
                  type="submit"
                  variant="contained"
                  className="button"
                  sx={{ marginTop: "10px", marginLeft: "150px" }}
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

export default AddCategory;
