import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PacmanLoader } from "react-spinners";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../app/categoryExpense/categoryExpenseApi";

const DeleteCategory = ({ cell }) => {
  const categoryId = cell.row.original._id;
  const [deleteCategory] = useDeleteCategoryMutation();
  const { refetch } = useGetCategoriesQuery();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory({categoryId});
      setTimeout(() => {
        refetch();
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        color="error"
        sx={{ position: "relative" }}
      >
        {loading ? (
          <div>
            <PacmanLoader size={12} color={"#36d7b7"} loading={loading} />
          </div>
        ) : (
          <DeleteIcon />
        )}
      </Button>
    </div>
  );
};

export default DeleteCategory;