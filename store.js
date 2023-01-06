import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
export const store = configureStore({
  reducer: {
    todoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
