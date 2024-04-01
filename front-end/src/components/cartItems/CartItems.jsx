import React, { useContext } from 'react';
import './cartItems.css';
import { ShopContext } from '../../context/ShopContext';
// import removeCartIcon from '../assets/cart_cross_icon.png';
import { RemoveShoppingCart } from '@mui/icons-material';

export const CartItems = () => {

  const {allProduct, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className='cartItems'>
        <div className="cartItemsMain">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {allProduct.map(item => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item._id} >
                <div className="cartItemsFormat cartItemsMain">
                  <img src={item.image} alt="" className="cartItemsImg" />
                  <p>{item.name}</p>
                  <p>${item.new_price}</p>
                  <button className='cartItemsQuantity'>{cartItems[item.id]}</button>
                  <p>${item.new_price*cartItems[item.id]}</p>
                  <RemoveShoppingCart className='cartItemsRemoveIcon' onClick={() => {removeFromCart(item.id)}}/>
                </div>
                <hr />
              </div>
            )}
          else return null;
        })}
        <div className='cartItemsBottom'>
          <div className='cartItemsTotal'>
            <h1>Cart Total</h1>
            <div>
              <div className="cartItemsTotalItems">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartItemsTotalItems">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartItemsTotalItems">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          
          <div className='cartItemsPromocode'>
            <p>If you have a promo code, enter it here.</p>
            <div className="cartItemsPromoBox">
              <input type='text' placeholder='Promo Code' />
              <button type='submit'>Submit</button>
            </div>
          </div>
        </div>
    </div>
  )
}
