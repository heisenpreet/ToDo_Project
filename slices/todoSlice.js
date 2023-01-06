import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    pushInitial(state, action) {
      state.push(...action.payload);
    },
    deleteTodo(state, action) {
      state.splice(action.payload, 1);
    },
    addTodo(state, action) {
      state.unshift({
        userId: 1,
        id: Math.random(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action) {
      state[action.payload].completed = !state[action.payload].completed;
    },
    editTodo(state, action) {
      state[action.payload.index].title = action.payload.title;
    },
  },
});
export const { addTodo, toggleTodo, pushInitial, deleteTodo, editTodo } =
  toDoSlice.actions;
export default toDoSlice.reducer;
