import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "todo",
  initialState: { todoList: [], completedList: [],newTodoMode: false },
  reducers: {
    addList: (state, action) => {
      state.todoList.push(action.payload);
    },
    removeList: (state, action) => {
      const id = action.payload;
      state.todoList = state.todoList.filter((item) => {
        return item.id !== id;
      });
    },
    completeList: (state, action) => {
      const id = action.payload.id;
      state.todoList = state.todoList.filter((item) => {
        return item.id !== id;
      });
      state.completedList.push(action.payload);
    },
    changeMode: (state) => {
      state.newTodoMode = !state.newTodoMode;
    }
  },
});

export const TodoAction = TodoSlice.actions;
export default TodoSlice;
