import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Todo-Slice";
import uiSlice from "./ui-slice";

const Store = configureStore({
  reducer: { todo: TodoSlice.reducer, ui: uiSlice.reducer },
});

export default Store;
