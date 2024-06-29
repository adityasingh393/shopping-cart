import localforage from 'localforage';
import { CartItem } from '../Interfaces/types';

localforage.config({
  name: 'Shopping-Cart',
  storeName: 'cart',
});

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const items = await localforage.getItem<CartItem[]>('cartItems');
    return items || [];
  } catch (error) {
    console.error('Not getting dataa from localForahe:', error);
    return [];
  }
};

export const setCartItems = async (items: CartItem[]) => {
  try {
    await localforage.setItem('cartItems', items);
  } catch (error) {
    console.error('Error setting cart items in localforage:', error);
  }
};
