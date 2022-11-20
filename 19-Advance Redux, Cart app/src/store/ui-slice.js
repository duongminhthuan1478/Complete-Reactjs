import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui-slice",
  initialState: { showCart: false },
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
