import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignIn: (state, action) => {
      state.user = action.payload;
    },
    userSignOut: (state, action) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userSignIn,userSignOut } = userSlice.actions;

export default userSlice.reducer;
