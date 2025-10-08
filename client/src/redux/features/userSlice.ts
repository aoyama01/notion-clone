import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username?: string;
  _id?: string;
  [key: string]: any;
}

interface UserState {
  value: User;
}

const initialState: UserState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload; // action.payloadはユーザ情報
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
