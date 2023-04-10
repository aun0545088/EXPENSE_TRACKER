import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/category',
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token') }`)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: builder => ({
    getCategories: builder.query({
      query: userId => `/getCategories?userId=${userId}`,
    }),
    createCategory: builder.mutation({
      query: category => ({
        url: '/createCategory',
        method: 'POST',
        body: category,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/updateCategory/${id}`,
        method: 'PATCH',
        body: { name },
      }),
    }),
    deleteCategory: builder.mutation({
      query: id => ({
        url: `/deleteCategory/${id}`,
        method: 'DELETE',
      }),
    }),
    addExpense: builder.mutation({
      query: ({ categoryId, expense }) => ({
        url: `/addExpense/${categoryId}/expenses`,
        method: 'POST',
        body: expense,
      }),
    }),
    
  }),
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddExpenseMutation,
  
} = categoryApi
