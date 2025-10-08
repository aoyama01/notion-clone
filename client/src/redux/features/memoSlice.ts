import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Memo {
  _id: string;
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
  [key: string]: any;
}

interface MemoState {
  value: Memo[];
}

const initialState: MemoState = {
  value: [],
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<Memo[]>) => {
      state.value = action.payload; // action.payloadはメモ
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
