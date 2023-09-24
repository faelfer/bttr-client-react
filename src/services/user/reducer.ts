import { createSlice } from "@reduxjs/toolkit";

import { RootState } from '../createStore';

export interface UserState {
  token: string | null; 
}

const initialState: UserState = { token: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      const sketch = state;
      sketch.token = token;
    },
  },
});

export const { setCredentials } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
