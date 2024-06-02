import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserProfile } from '@/types/stateTypes';

import { RootState } from '../';

interface UserInitialState {
  user: UserProfile | null;
}

const user = JSON.parse(localStorage.getItem('user') ?? 'null');
const initialState: UserInitialState = { user: user };

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser } = actions;
export default reducer;

export const userSelector = (state: RootState) => state.userData;
