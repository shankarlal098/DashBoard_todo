import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "tasks",
    JSON.stringify(
      store.getState().tasks.tasks
    )
  );
});