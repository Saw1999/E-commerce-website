import React from 'react';
import './descriptionBox.css';

export const DescriptionBox = () => {
  return (
    <div className='descBox'>
        <div className="descBoxNav">
            <div className="descBoxNavBox click">Description</div>
            <div className="descBoxNavBox">Reviews (150)</div>
        </div>
        <div className='descBoxDesc'>
            <p>An e-commerce website is an online platform that facilitates buying and selling of products or services
                over the internet. It is serving as a virtual marketplace where businesses can showcase their products,
                interact with customers, and conduct transactions without the need for a physical presence. E-commerce 
                websites have gained immense popularity due to their convenience and accessiblity.
            </p>
            <p>E-commerce webistes typically display products and services along with detailed descriptions, images, prices, and any available variations (eg., sizes, colors).
                Each product usually comes with its own page containing relevant information.
            </p>
        </div>
    </div>
  )
}
