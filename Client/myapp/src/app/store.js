import { configureStore } from "@reduxjs/toolkit";
import { userAuthApi } from "./auth/userAuthApi";
import {categoryApi} from "./category/categoryApi"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,categoryApi.middleware),
});

setupListeners(store.dispatch);
export default store;
