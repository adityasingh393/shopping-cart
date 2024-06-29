import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../Utils/api';
import { Product } from '../Interfaces/types';
import { useCart } from '../Utils/cartContext';
import "../App.css";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { state, dispatch } = useCart();
  
    useEffect(() => {
      const loadProducts = async () => {
        const products = await fetchProducts();
        setProducts(products);
      };dispatch
      loadProducts();
    }, []);
  
    const isInCart = (productId: number) => {
      return state.cart.some(item => item.id === productId);
    };
  
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} width={100} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {isInCart(product.id) ? (
              <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: product.id })}>
                Remove from Cart
              </button>
            ) : (
              <button onClick={() => dispatch({ type: 'ADD_TO_CART', product })}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductList;
  
