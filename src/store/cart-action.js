import { uiAction } from "./ui-slice";

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