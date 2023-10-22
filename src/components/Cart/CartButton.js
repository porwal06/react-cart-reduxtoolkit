import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiAction } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(uiAction.toggle());
  }
  const totalProduct = useSelector(state => state.cart.totalQuantity);
  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalProduct}</span>
    </button>
  );
};

export default CartButton;
