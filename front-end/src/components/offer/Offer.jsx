import React from 'react';
import './offer.css';
import exclusiveImg from '../assets/exclusive_image.png';

export const Offer = () => {
  return (
    <div className='offer'>
        <div className="offerLeft">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <button className='offerLeftBtn'>Check Now</button>
        </div>
        <div className="offerRight">
            <img className='exclusiveImg' src={exclusiveImg} alt='' />
        </div>
    </div>
  )
}
