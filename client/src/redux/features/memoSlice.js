import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action) => {
      state.value = action.payload; // action.payloadはユーザ情報
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
