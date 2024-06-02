import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TasksType } from '@/types/stateTypes';

import { RootState } from '../';

interface TasksInitialState {
  tasks: TasksType[] | null;
}

const randomTitles = [
  'New news said that gold diggers digged some gold',
  'Our PM said that we need to work on some legacy code',
  "Replace backend dev's with github copilot",
];

const tasks =
  JSON.parse(localStorage.getItem('tasks') ?? 'null') ??
  Array.from([0, 1, 2], (item) => ({
    id: item,
    title: randomTitles[item],
    description: item === 1 ? undefined : randomTitles.join(''),
    email: 'google@gmail.com',
    status: item === 1,
  }));

const initialState: TasksInitialState = { tasks: tasks };

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<TasksType, 'id' | 'status'>>,
    ) => {
      state.tasks?.push({
        ...action.payload,
        id: state.tasks[state.tasks.length - 1].id + 1,
        status: false,
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<TasksType['id']>) => {
      state.tasks =
        state.tasks?.filter((task) => task.id !== action.payload) ??
        state.tasks;
      localStorage.setItem(
        'tasks',
        (state.tasks?.length ?? 0) > 0 ? JSON.stringify(state.tasks) : 'null',
      );
    },
    editTask: (state, action: PayloadAction<TasksType>) => {
      state.tasks =
        state.tasks?.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ) ?? state.tasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

const { actions, reducer } = tasksSlice;

export const { addTask, deleteTask, editTask } = actions;
export default reducer;

export const tasksSelector = (state: RootState) => state.tasksData;
