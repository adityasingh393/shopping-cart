import React from 'react';
import { useCart } from '../Utils/cartContext';

const CartList: React.FC = () => {
  const { state, dispatch } = useCart();
  const totalPrice = state.cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      
      {state.cart.map(item => (
      
        <div key={item.id}>
          <img src={item.image} alt={item.title} width={100} />
          <h2>{item.title}</h2>
          <p>${item.price}</p>
          <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>Remove Item</button>
        </div>
      ))}
      <h2>Total: ${totalPrice}</h2>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  );
};

export default CartList;
