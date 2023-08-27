import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "todo",
  initialState: { todoList: [], editList: [],newTodoMode: false, editMode: false },
  reducers: {
    addList: (state, action) => {
      state.todoList.push(action.payload);
    },
    editModeChange: (state) => {
      state.editMode = false;
    },
    editList: (state, action) => {
      state.editMode = true;
      state.editList = action.payload;
    },
    changeMode: (state) => {
      state.newTodoMode = !state.newTodoMode;
    }
  },
});

export const TodoAction = TodoSlice.actions;
export default TodoSlice;
