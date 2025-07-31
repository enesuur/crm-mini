import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string | null;
  email: string | null;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  username: null,
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string; email: string }>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.username = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
