import { configureStore } from "@reduxjs/toolkit";
import { userAuthApi } from "./auth/userAuthApi";
import {categoryExpenseApi} from "./categoryExpense/categoryExpenseApi"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [categoryExpenseApi.reducerPath]:categoryExpenseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,categoryExpenseApi.middleware),
});

setupListeners(store.dispatch);
export default store;
