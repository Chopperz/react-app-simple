import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    resetCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, resetCount, incrementByAmount } =
  counterSlice.actions;

export const incrementAsync = (params: number) => {
  setTimeout(() => {
    incrementByAmount(params);
  }, 1000);
};

export default counterSlice.reducer;
