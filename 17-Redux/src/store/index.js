import { createSlice, configureStore } from "@reduxjs/toolkit";

const initState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counterState",
  initialState: initState,
  reducers: {
    increment(state) {
      //Can mutate state here because, @reduxjs/toolkit will copy existing state and return new obj for us
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;

export default store;
