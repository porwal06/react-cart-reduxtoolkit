import { cartActions } from "./cart-slice";
import { uiAction } from "./ui-slice";

/**
 * This is example of Redux-Thunk, which is simple javascript function receive redux dispatch as param.
 * 
 * @param {dispatch} cartData 
 * @returns 
 */

export const sendCartRequest = (cartData) => {
 return async(dispatch) => { //Custom action creator in redux accept dispatch
    dispatch(uiAction.showNotification({
      status: "error",
      title: "Pending",
      message: "Sending request...."
    }));
    const cartRequest = async() => {
        const response = await fetch('https://redux-cart-6f83e-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cartData)
        });
        if(!response.ok) {
        throw new Error("Could not send request");
        }        
    }
    try{
        await cartRequest();
        dispatch(uiAction.showNotification({
            status: "success",
            title: "SUCCESS",
            message: "Sent request successfully."
            }));
    }
    catch(error) {
        dispatch(uiAction.showNotification({
            status: "error",
            title: "ERROR",
            message: "Sorry, we can't send request",
          }));
    }    
    }
  }

  export const fetchCartData = () => {
    return async(dispatch) => {
        const cartData = async() => {
            const response = await fetch('https://redux-cart-6f83e-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok) {
            throw new Error("Could not send request");
            }
            return await response.json();
        }
        try {
          const cartResponse =  await cartData();
          dispatch(cartActions.replaceCart({
            items: cartResponse.items || [],
            totalQuantity: cartResponse.totalQuantity || 0
          }));
        }
        catch(error) {
            dispatch(uiAction.showNotification({
                status: "error",
                title: "ERROR",
                message: "Sorry, we couldn't fetch cart data",
              }));
        }
    }

  }