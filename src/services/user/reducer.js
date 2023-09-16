import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null };

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

export default userSlice.reducer;
