import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart-slice",
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const data = action.payload;
      const existItem = state.items.find((item) => item.id === data.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existItem) {
        state.items.push({
          id: data.id,
          price: data.price,
          quantity: 1,
          totalPrice: data.price,
          title: data.title,
        });
      } else {
        existItem.quantity++;
        existItem.totalPrice += data.price;
      }
    },
    removeItemCart(state, action) {
      const id = action.payload;
      const existItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existItem.quantity === 1) {
        state.items = state.items.filter((obj) => obj.id !== id);
        return;
      }
      existItem.quantity--;
      existItem.totalPrice -= existItem.price;
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
