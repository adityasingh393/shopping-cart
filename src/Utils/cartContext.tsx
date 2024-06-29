import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../Interfaces/types';
import { getCartItems, setCartItems } from './localForage';

interface CartState {
  cart: CartItem[];
}
interface Props{
    children:React.ReactNode;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; id: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; cart: CartItem[] };

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (!state.cart.find(item => item.id === action.product.id)) {
        return { ...state, cart: [...state.cart, { ...action.product, quantity: 1 }] };
      }
      return state;

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.id) };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_CART':
      return { ...state, cart: action.cart };

    default:
      return state;
  }
};

export const CartProvider: React.FC<Props>= ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  useEffect(() => {
    const loadCart = async () => {
      const cartItems = await getCartItems();
      dispatch({ type: 'SET_CART', cart: cartItems });
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      await setCartItems(state.cart);
    };
    saveCart();
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
