import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../';
import { TasksType } from '@/types/stateTypes';

interface UserInitialState {
  tasks: TasksType[] | null;
}

const initialState: UserInitialState = { tasks: null };

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TasksType>) => {
      state.tasks?.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<TasksType['id']>) => {
      state.tasks = state.tasks?.filter((task) => task.id !== action.payload) ?? state.tasks;
    },
    editTask: (state, action: PayloadAction<TasksType>) => {
      state.tasks =
        state.tasks?.map((task) => (task.id === action.payload.id ? action.payload : task)) ??
        state.tasks;
    },
  },
});

const { actions, reducer } = tasksSlice;

export const { addTask } = actions;
export default reducer;

export const tasksSelector = (state: RootState) => state.tasksData;
