import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../';
import { UserProfile } from '@/types/stateTypes';

interface UserInitialState {
  user: UserProfile | null;
}

const initialState: UserInitialState = { user: null };

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser } = actions;
export default reducer;

export const userSelector = (state: RootState) => state.userData;
