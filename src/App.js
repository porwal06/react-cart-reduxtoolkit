import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector, useDispatch } from 'react-redux';
import { sendCartRequest, fetchCartData } from './store/cart-action';
import Notification from './components/UI/Notification';

import { Fragment } from 'react';

let initialLoad = true;

function App() {
  const showCart = useSelector(state => state.ui.isVisible);
  const cartData = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {    
    dispatch(fetchCartData());
  }, []);

  useEffect(() =>
    {
    if(initialLoad) { // Stop sending request first time when page load
      initialLoad = false;
      return;
    }
    if(cartData.changeCart)
    dispatch(sendCartRequest(cartData));

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
