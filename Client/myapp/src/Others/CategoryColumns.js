import DeleteCategory from "../Components/Category/DeleteCategory";
import EditCategory from "../Components/Category/EditCategory";

export const COLUMNS = [
  {
    Header: "CategoryName",
    accessor: "category_name",
  },

  {
    Header: "Edit",
    Cell: EditCategory,
  },
  {
    Header: "Delete",
    Cell: DeleteCategory,
  },
];
