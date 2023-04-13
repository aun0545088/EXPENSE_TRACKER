import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalData } from "../../Utils/LocalStorage";
const Id = getLocalData("userId");

export const categoryExpenseApi = createApi({
  reducerPath: "categoryExpenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers) => {
      const token = getLocalData("token");
      console.log("token", token);
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (userId) => `category?userId=${Id}`,
    }),
    getCategoryById: builder.query({
      query: (categoryId) => `/category/${categoryId}`,
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: "/category/create",
        method: "POST",
        body: body,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: `/category/edit/${categoryId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `/category/delete/${categoryId}`,
        method: "DELETE",
      }),
    }),
    createExpense: builder.mutation({
      query: (body) => {
        return {
          url: "/expense/create",
          method: "POST",
          body,
        };
      },
    }),
    getAllExpenses: builder.query({
      query: (userId) => `/expense?userId=${Id}`,
    }),
    getExpenseById: builder.query({
      query: (expenseId) => `/expense/${expenseId}`,
    }),

    updateExpenseById: builder.mutation({
      query: ({ expenseId, expense }) => ({
        url: `/expense/edit/${expenseId}`,
        method: "PATCH",
        body: expense,
      }),
    }),
    deleteExpenseById: builder.mutation({
      query: ({ expenseId }) => ({
        url: `/expense/delete/${expenseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseByIdMutation,
  useDeleteExpenseByIdMutation,
} = categoryExpenseApi;
