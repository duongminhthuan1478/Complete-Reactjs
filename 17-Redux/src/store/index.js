import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import counterReducer from "./counter-slice";

//Only store for many state
const store = configureStore({
  reducer: { stateCounter: counterReducer, stateAuth: authReducer },
});

export default store;
