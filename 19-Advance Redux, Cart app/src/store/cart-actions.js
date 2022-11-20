import { cartAction } from "./cart-slice";
import { uiAction } from "./ui-slice";

export const fetchCartData = () => {
  // redux toolkit automatically built in dispatch for us without argument passed.
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-7aa09-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartAction.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetch data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  // redux toolkit automatically built in dispatch for us without argument passed.
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const dataSave = { ...cart };
      delete dataSave.changed;
      const response = await fetch(
        "https://react-http-7aa09-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(dataSave),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Send cart data failed!",
        })
      );
    }
  };
};
