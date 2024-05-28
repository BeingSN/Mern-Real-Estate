import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  password: null,
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
      state.password = action.payload.data.password;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    onLogout: (state, action) => {
      state.currentUser = null;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action, password) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.password = password;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSucess: (state) => {
      state.currentUser = null;
      state.loading = null;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  onLogout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
