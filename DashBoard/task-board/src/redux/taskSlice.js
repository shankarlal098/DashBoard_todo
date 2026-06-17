import { createSlice } from "@reduxjs/toolkit";

const savedTasks = JSON.parse(
  localStorage.getItem("tasks")
) || [];

const initialState = {
  tasks: savedTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    addTask: (state , action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },
    updateTask: (state, action) => {
        const task = state.tasks.find(
          (t) => t.id === action.payload.id
        );
        if (task) {
          task.title = action.payload.title;
          task.description = action.payload.description;
          task.priority = action.payload.priority;
          task.dueDate = action.payload.dueDate;
        }
    },
    moveTask: (state, action) => {
      const { id, newStatus } = action.payload;

      const task = state.tasks.find(
        (task) => task.id === id
      );

      if (task) {
        task.status = newStatus;
      }
    },  
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;

      const task = state.tasks.find(
        (task) => task.id === taskId
      );

      if (task) {
        task.subtasks.push(subtask);
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  moveTask,
  setFilter,
  addSubtask,
} = taskSlice.actions;

export default taskSlice.reducer;