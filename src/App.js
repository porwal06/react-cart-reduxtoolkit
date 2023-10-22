import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector, useDispatch } from 'react-redux';
import { uiAction } from './store/ui-slice';
import Notification from './components/UI/Notification';

import { Fragment } from 'react';

let initialLoad = true;

function App() {
  const showCart = useSelector(state => state.ui.isVisible);
  const cartData = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() =>
    {
      const cartRequest = async() => {
        dispatch(uiAction.showNotification({
          status: "error",
          title: "Pending",
          message: "Sending request...."
        }));

        const response = await fetch('https://redux-cart-6f83e-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cartData)
        });
        if(!response.ok) {
          throw new Error("Could not send request");
        }
        dispatch(uiAction.showNotification({
          status: "success",
          title: "SUCCESS",
          message: "Sent request successfully."
        }));
      }
    if(initialLoad) { // Stop sending request first time when page load
      initialLoad = false;
      return;
    }
      cartRequest().catch(error => {
        dispatch(uiAction.showNotification({
          status: "error",
          title: "ERROR",
          message: "Sorry, we can't send request",
        }));
      });
  }, [cartData]);

  return (
    <Fragment>
      {notification && 
      <Notification title={notification.title} message={notification.message} status={notification.status}></Notification>
      }
      <Layout>
      {showCart && <Cart />}
      <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
