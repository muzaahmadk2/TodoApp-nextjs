import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Todo-Slice";

const Store = configureStore({
    reducer: {todo: TodoSlice.reducer}
});

export default Store;