import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // concat also push item to array but return new Array instead old Array
    const existIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existCardItem = state.items[existIndex];

    let updateItems = [...state.items];
    if (existCardItem) {
      const updatedItem = {
        ...existCardItem,
        amount: existCardItem.amount + action.item.amount,
      };
      updateItems[existIndex] = updatedItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    const newtotalAount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: updateItems, totalAmount: newtotalAount };
  }

  if (action.type === "REMOVE") {
    let updateItems = [...state.items];
    const existIndex = state.items.findIndex((item) => item.id === action.id);
    const existCardItem = state.items[existIndex];
    const updatedTotalAmount = state.totalAmount - existCardItem.price;

    if (existCardItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updateItems = [...state.items];
      updateItems[existIndex] = {
        ...existCardItem,
        amount: existCardItem.amount - 1,
      };
    }
    return { items: updateItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
