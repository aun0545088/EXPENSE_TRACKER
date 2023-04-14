import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../app/categoryExpense/categoryExpenseApi";

export default function EditCategory({ cell }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category_name: "",
  });
  const cat_id = cell.row.original._id;
  // console.log(cat_id)
  const { data: { data: singleCategory } = {} } = useGetCategoryByIdQuery(
    cat_id,
    {
      skip: !cat_id,
    }
  );
  // console.log(singleCategory)
  const [updateCategory] = useUpdateCategoryMutation();

  const { refetch } = useGetCategoriesQuery();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(singleCategory._id, formData);
    updateCategory({ categoryId: singleCategory._id, data: formData })
      .unwrap()
      .then(() => {
        refetch();
        handleClose();
      });
  };

  useEffect(() => {
    // console.log(singleCategory);
    setFormData((prevState) => ({
      ...prevState,
      ...singleCategory,
    }));
  }, [singleCategory]);

  return (
    <>
      <Button onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit category</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="categoryName"
              variant="outlined"
              name="category_name"
              value={formData.category_name}
              fullWidth
              required
              onChange={handleChange}
            />
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
