import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

console.log("initialState", initialState);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    onLogout: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, onLogout } =
  userSlice.actions;

export default userSlice.reducer;
