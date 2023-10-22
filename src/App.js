import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector } from 'react-redux';

let initialLoad = true;

function App() {
  const showCart = useSelector(state => state.ui.isVisible);
  const cartData = useSelector(state => state.cart);
  useEffect(() =>
    {
      const cartRequest = async() => {
        const response = await fetch('https://redux-cart-6f83e-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cartData)
        });
        if(!response.ok) {
          throw new Error("Could not send request");
        }
      }
    if(initialLoad) { // Stop sending request first time when page load
      initialLoad = false;
      return;
    }
      cartRequest().catch(error => {
        console.log(error);
      });
  }, [cartData]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
